import { verifyEmail } from "@/services/auth.service";
import Failed from "./Failed";
import Success from "./Success";
import { decodeToken } from "@/lib/jwt";

type VerifyEmailProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailProps) {
  const { token } = await searchParams;
  let email: string = "";

  const jwtPayload = decodeToken<{ email: string }>(token || "");

  if (!token) {
    return <Failed message="Token is required to verify your email" />;
  }

  if (!jwtPayload) {
    return <Failed message="Token is invalid or expired" />;
  }

  if (jwtPayload?.email) {
    email = jwtPayload.email;
  }

  let errorMessage: string | null = null;

  try {
    await verifyEmail({ token });
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Email verification failed";
  }

  if (errorMessage) {
    return <Failed message={errorMessage} email={email} />;
  }

  return <Success />;
}
