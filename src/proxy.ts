import { NextRequest, NextResponse } from "next/server";
import { getToken } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const token = await getToken();
  const { pathname } = request.nextUrl;

  const unauthenticatedRoutes = [
    "/login",
    "/register",
    "/verify-email",
    "/check-email",
    "/forgot-password",
    "/reset-password",
  ];
  const isMatchUnauthenticated = unauthenticatedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isMatchUnauthenticated) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const authenticatedRoutes = ["/dashboard", "/transactions", "/categories"];
  const isMatchAuthenticated = authenticatedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isMatchAuthenticated) {
    if (!token) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/transactions/:path*",
    "/categories/:path*",
    "/verify-email/:path*",
    "/check-email/:path*",
    "/forgot-password/:path*",
    "/reset-password/:path*",
    "/login",
    "/register",
  ],
};
