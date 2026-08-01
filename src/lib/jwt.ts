import jwt, {
  JsonWebTokenError,
  JwtPayload,
  SignOptions,
  TokenExpiredError,
} from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "./env";
import { AppError } from "@/exceptions/AppError";

export function generateToken(
  payload: string | object | Buffer,
  expiresIn: SignOptions["expiresIn"] = JWT_EXPIRES_IN as SignOptions["expiresIn"],
): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken<T = JwtPayload>(token: string): T {
  try {
    return jwt.verify(token, JWT_SECRET) as T;
  } catch (error) {
    if (
      error instanceof TokenExpiredError ||
      error instanceof JsonWebTokenError
    ) {
      throw new AppError("Invalid or expired token", 401);
    }

    throw error;
  }
}

export function decodeToken<T = JwtPayload>(token: string): T | null {
  try {
    return jwt.decode(token) as T;
  } catch {
    return null;
  }
}
