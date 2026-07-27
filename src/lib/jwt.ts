import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "./env";

export function generateToken(
  payload: string | object | Buffer,
  expiresIn: SignOptions["expiresIn"] = JWT_EXPIRES_IN as SignOptions["expiresIn"],
): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken<T = JwtPayload>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}
