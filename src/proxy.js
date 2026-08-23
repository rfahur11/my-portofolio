import { NextResponse } from "next/server";

export function proxy(request) {
  const path = request.nextUrl.pathname;
  
  // Check auth cookies
  const adminToken = request.cookies.get("admin-token")?.value;
  const sbAccessToken = request.cookies.get("sb-access-token")?.value;
  const isAuthenticated = !!(adminToken || sbAccessToken);

  // If trying to access admin dashboard but NOT logged in, redirect to login
  if (path.startsWith("/admin") && path !== "/admin/login" && !isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // If logged in but trying to access login page, redirect to dashboard
  if (path === "/admin/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
