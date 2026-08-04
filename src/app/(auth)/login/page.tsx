import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div className="space-y-3">
        <p className="text-sm font-semibold text-primary">Welcome back</p>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Sign in to your account
        </h1>

        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          Enter your email and password to continue to your FinTracker
          dashboard.
        </p>
      </div>

      <div className="mt-8">
        <LoginForm />
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Create an account
        </Link>
      </p>
    </>
  );
}
