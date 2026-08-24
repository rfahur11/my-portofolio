import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Clear both possible auth cookies
  response.cookies.delete("admin-token");
  response.cookies.delete("sb-access-token");

  return response;
}
