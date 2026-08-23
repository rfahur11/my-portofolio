import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase";

export async function GET(request) {
  const adminToken = request.cookies.get("admin-token")?.value;
  const sbAccessToken = request.cookies.get("sb-access-token")?.value;

  const isAuthenticated = !!(adminToken || sbAccessToken);

  return NextResponse.json({
    isAuthenticated,
    supabaseMode: isSupabaseConfigured,
  });
}
