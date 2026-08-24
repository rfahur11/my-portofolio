import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const AUTH_EMAIL = process.env.ADMIN_EMAIL;
    const AUTH_PASSWORD = process.env.ADMIN_PASSWORD;

    if (AUTH_EMAIL && AUTH_PASSWORD) {
      if (email === AUTH_EMAIL && password === AUTH_PASSWORD) {
        const response = NextResponse.json({ success: true, mode: "env" });
        response.cookies.set("admin-token", "env-session-active-token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24,
          path: "/",
        });
        return response;
      }
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    if (!isSupabaseConfigured) {
      // Mock Local Auth Check
      if (email === "admin@example.com" && password === "admin") {
        const response = NextResponse.json({ success: true, mode: "mock" });
        // Set mock token in cookies
        response.cookies.set("admin-token", "mock-session-active-token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24, // 1 day
          path: "/",
        });
        return response;
      }
      return NextResponse.json({ error: "Invalid local credentials" }, { status: 400 });
    }

    // Supabase Authenticate
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const response = NextResponse.json({ success: true, user: data.user });
    
    // Save session access token in cookies for middleware protection
    response.cookies.set("sb-access-token", data.session?.access_token || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: data.session?.expires_in || 3600,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
