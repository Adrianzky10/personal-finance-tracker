import Link from "next/link";
import { ArrowLeft, CircleX, SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

type FailedProps = {
  message?: string;
  email?: string;
};

export default function Failed({ message, email }: FailedProps) {
  const isAlreadyVerified = message === "Email already verified";

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 rounded-full bg-red-100 p-4">
        <CircleX className="size-10 text-red-600" />
      </div>

      <h1 className="text-3xl font-bold text-slate-900">Verification failed</h1>

      <p className="mt-4 text-sm leading-6 text-slate-500">{message}</p>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {isAlreadyVerified
          ? "Your account has already been activated. You can sign in now."
          : "Please request a new activation email and try again."}
      </p>

      <div className="mt-8 flex w-full flex-col gap-3">
        {isAlreadyVerified ? (
          <Button asChild className="w-full">
            <Link href="/login">Go to Login</Link>
          </Button>
        ) : (
          <>
            <Button asChild className="w-full">
              <Link href={`/check-email?email=${email}&mode=expired`}>
                <SendHorizontal className="size-4" />
                Request New Activation
              </Link>
            </Button>

            <Link
              href="/login"
              className="mt-4 flex items-center justify-center text-sm font-medium text-brand hover:underline"
            >
              <ArrowLeft className="size-4" />
              Back to login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
