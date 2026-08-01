import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div>
        <p className="text-sm font-semibold text-brand">Welcome back</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Sign in to your account
        </h1>

        <p className="mt-3 text-sm leading-6 text-text-secondary">
          Enter your email and password to continue.
        </p>
      </div>

      <LoginForm />

      <p className="mt-8 text-center text-sm text-text-secondary">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-brand transition hover:text-brand-hover"
        >
          Register
        </Link>
      </p>
    </>
  );
}
