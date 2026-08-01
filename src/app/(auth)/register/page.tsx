import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <>
      <div>
        <p className="text-sm font-semibold text-brand">Welcome to FinTrack</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Register Account
        </h1>

        <p className="mt-3 text-sm leading-6 text-text-secondary">
          Make an account to get started.
        </p>
      </div>

      <RegisterForm />

      <p className="mt-8 text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-brand transition hover:text-brand-hover"
        >
          Login
        </Link>
      </p>
    </>
  );
};

export default RegisterPage;
