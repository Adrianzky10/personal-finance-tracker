"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordForm() {
  const { register, errors, onSubmit, isPendingForgotPassword, isSuccess } =
    useForgotPassword();

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            {isSuccess
              ? "Check your email for a reset link."
              : "Enter your email address to receive a password reset link."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-6">
              {!isSuccess && (
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    autoComplete="email"
                    {...register("email")}
                    disabled={isPendingForgotPassword}
                  />
                  {errors.email && (
                    <span className="text-sm text-destructive">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              )}

              {errors.root && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {errors.root.message}
                </div>
              )}

              {!isSuccess ? (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isPendingForgotPassword}
                >
                  {isPendingForgotPassword ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">Return to Login</Link>
                </Button>
              )}

              {!isSuccess && (
                <div className="text-center text-sm">
                  Remember your password?{" "}
                  <Link
                    href="/login"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Login here
                  </Link>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
