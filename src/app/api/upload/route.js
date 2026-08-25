import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const contentType = file.type || "image/jpeg";

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    // --- SUPABASE STORAGE UPLOAD ---
    if (isSupabaseConfigured) {
      try {
        // Upload to 'portfolio' bucket
        const { data, error } = await supabase.storage
          .from("portfolio")
          .upload(fileName, buffer, {
            contentType,
            cacheControl: "3600",
            upsert: true,
          });

        if (error) {
          console.warn("Supabase storage upload failed, trying DB fallback:", error.message);
          throw error;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("portfolio")
          .getPublicUrl(fileName);

        if (urlData?.publicUrl) {
          return NextResponse.json({ url: urlData.publicUrl, method: "supabase" });
        }
      } catch (storageError) {
        console.warn("Supabase storage failed, falling back to base64 encoding.");
      }
    }

    // --- LOCAL DEVELOPMENT & NETLIFY FALLBACK ---
    // If we are in local development, we can write to public/uploads
    const isLocal = process.env.NODE_ENV !== "production" || !process.env.NETLIFY;
    
    if (isLocal) {
      try {
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, buffer);
        
        return NextResponse.json({ 
          url: `/uploads/${fileName}`, 
          method: "local" 
        });
      } catch (localWriteError) {
        console.error("Local file write failed:", localWriteError.message);
      }
    }

    // If local write fails or we are in production without Supabase Storage working,
    // we return the image as a compressed Data URL (Base64) to save directly in the DB.
    const base64Data = buffer.toString("base64");
    const dataUrl = `data:${contentType};base64,${base64Data}`;
    
    return NextResponse.json({ 
      url: dataUrl, 
      method: "base64" 
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
