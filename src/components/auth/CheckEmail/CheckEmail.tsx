"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, SendHorizontal, XCircle } from "lucide-react";
import Link from "next/link";
import { useResendActivationEmail } from "./useResendActivationEmail";
import { Spinner } from "@/components/ui/spinner";

interface CheckEmailProps {
  email: string;
  mode: string;
  error?: string;
}

const CheckEmail = ({ email, mode, error }: CheckEmailProps) => {
  const {
    handleResendActivationEmail,
    isPendingResendActivationEmail,
    cooldown,
  } = useResendActivationEmail(email);

  if (error) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-red-50">
          <XCircle className="size-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Something went wrong
        </h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{error}</p>
        <Link
          href="/login"
          className="mt-4 flex items-center justify-center text-sm font-medium text-brand hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-blue-50">
        <Mail className="size-8 text-brand" />
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {mode === "registered" && "Check your email"}
        {mode === "expired" && "Resend activation email"}
      </h1>

      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        {mode === "registered" &&
          "We have sent an account activation link to the email address below."}
        {mode === "expired" &&
          "Your activation link has expired. Please request a new activation link."}
      </p>

      <div className="mt-6 w-full rounded-xl border border-border bg-muted px-4 py-3">
        <p className="break-all text-sm font-medium text-foreground">{email}</p>
      </div>

      <p className="mt-6 text-sm leading-6 text-muted-foreground">
        {mode === "registered" &&
          "Please open your inbox and click the activation link to verify your account."}
        {mode === "expired" &&
          "If you don't receive the email, please check your spam folder or click the button below to resend it."}
      </p>

      {mode === "registered" && (
        <Button
          className="mt-8 w-full cursor-pointer"
          disabled={
            isPendingResendActivationEmail ||
            !email ||
            email === "undefined" ||
            cooldown > 0
          }
          onClick={handleResendActivationEmail}
        >
          {isPendingResendActivationEmail ? (
            <Spinner />
          ) : (
            <>
              <SendHorizontal className="size-4" />
              {cooldown > 0
                ? `Wait ${cooldown}s to resend`
                : "Resend activation"}
            </>
          )}
        </Button>
      )}

      {mode === "expired" && (
        <Button
          className="mt-8 w-full cursor-pointer"
          disabled={
            isPendingResendActivationEmail ||
            !email ||
            email === "undefined" ||
            cooldown > 0
          }
          onClick={handleResendActivationEmail}
        >
          {isPendingResendActivationEmail ? (
            <Spinner />
          ) : (
            <>
              <SendHorizontal className="size-4" />
              {cooldown > 0
                ? `Wait ${cooldown}s to resend`
                : "Send new activation email"}
            </>
          )}
        </Button>
      )}

      <Link
        href="/login"
        className="mt-4 flex items-center justify-center text-sm font-medium text-brand hover:underline"
      >
        <ArrowLeft className="size-4" />
        Back to login
      </Link>
    </div>
  );
};

export default CheckEmail;
