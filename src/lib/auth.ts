import { cookies } from "next/headers";
import { connectDB } from "./mongodb";
import { verifyToken } from "./jwt";
import User from "@/models/User";
import { AppError } from "@/exceptions/AppError";
import { COOKIE_NAME } from "./cookies";
import { JwtUserPayload } from "@/types/jwt";

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function getCurrentUser() {
  const token = await getToken();

  if (!token) {
    return null;
  }

  await connectDB();

  try {
    const payload = verifyToken<JwtUserPayload>(token);

    const user = await User.findById(payload.sub);

    if (!user) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    throw new AppError("Unauthorized", 401);
  }

  return user;
}
