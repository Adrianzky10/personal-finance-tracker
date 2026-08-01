import type { ReactNode } from "react";
import Link from "next/link";

type AuthLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-app-background px-4 py-6 sm:px-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-card bg-surface shadow-xl shadow-slate-900/10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative hidden overflow-hidden bg-brand p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-16 size-80 rounded-full bg-blue-400/20" />

          <Link
            href="/"
            className="relative w-fit text-xl font-bold tracking-tight"
          >
            FinTrack
          </Link>

          <div className="relative max-w-md">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
              Personal Finance Tracker
            </p>

            <h1 className="text-4xl font-bold leading-tight">
              Manage your finances with more peace of mind
            </h1>

            <p className="mt-5 text-base leading-7 text-blue-100">
              Track every transaction and understand your financial habits in
              one place.
            </p>
          </div>

          <p className="relative text-sm text-blue-100">
            © {new Date().getFullYear()} FinTrack
          </p>
        </section>

        <section className="flex min-h-full flex-col p-6 sm:p-10 lg:p-12">
          <Link
            href="/"
            className="w-fit text-lg font-bold tracking-tight text-brand lg:hidden"
          >
            FinTrack
          </Link>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
