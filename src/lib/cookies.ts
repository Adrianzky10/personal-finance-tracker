import { NextResponse } from "next/server";

const COOKIE_NAME = "token";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24,
};

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: token,
    ...COOKIE_OPTIONS,
  });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });
}
