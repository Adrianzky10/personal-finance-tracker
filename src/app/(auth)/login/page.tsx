import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div>
        <p className="text-sm font-semibold text-brand">
          Selamat datang kembali
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Masuk ke akun Anda
        </h1>

        <p className="mt-3 text-sm leading-6 text-text-secondary">
          Masukkan email dan password untuk melanjutkan.
        </p>
      </div>

      <LoginForm />

      <p className="mt-8 text-center text-sm text-text-secondary">
        Belum memiliki akun?{" "}
        <Link
          href="/register"
          className="font-semibold text-brand transition hover:text-brand-hover"
        >
          Daftar sekarang
        </Link>
      </p>
    </>
  );
}
