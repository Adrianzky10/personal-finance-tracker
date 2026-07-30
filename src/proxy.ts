import { NextRequest, NextResponse } from "next/server";
import { getToken } from "./lib/auth";

const protectedRoutes = ["/dashboard", "/transactions", "/categories"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoutes = protectedRoutes.some((route) => {
    return pathname.startsWith(route);
  });

  if (!isProtectedRoutes) {
    return NextResponse.next();
  }

  const token = getToken();

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/transactions/:path*", "/categories/:path*"],
};
