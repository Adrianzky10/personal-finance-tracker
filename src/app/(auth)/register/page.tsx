import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <>
      <div className="space-y-3">
        <p className="text-sm font-semibold text-primary">
          Welcome to FinTracker
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Create your account
        </h1>

        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          Start tracking your income and expenses in one simple place.
        </p>
      </div>

      <div className="mt-8">
        <RegisterForm />
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary transition-colors hover:text-primary/80"
        >
          Sign In
        </Link>
      </p>
    </>
  );
};

export default RegisterPage;
