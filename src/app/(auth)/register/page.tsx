import RegisterForm from "@/components/auth/RegisterForm/RegisterForm";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <>
      <div>
        <p className="text-sm font-semibold text-brand">
          Selamat datang di FinTrack
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Registrasi Akun
        </h1>

        <p className="mt-3 text-sm leading-6 text-text-secondary">
          Buat akun sekarang untuk memulai.
        </p>
      </div>

      <RegisterForm />

      <p className="mt-8 text-center text-sm text-text-secondary">
        Sudah memiliki akun?{" "}
        <Link
          href="/login"
          className="font-semibold text-brand transition hover:text-brand-hover"
        >
          Masuk sekarang
        </Link>
      </p>
    </>
  );
};

export default RegisterPage;
