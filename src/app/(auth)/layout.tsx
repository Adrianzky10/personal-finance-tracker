import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeftIcon, Wallet } from "lucide-react";

type AuthLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-3xl border border-border bg-card shadow-lg lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT SECTION (Tetap) */}
        <section className="relative hidden overflow-hidden bg-linear-to-br from-blue-500 to-indigo-600 p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary-foreground/10" />
          <div className="absolute -bottom-24 -left-16 size-80 rounded-full bg-primary-foreground/20" />

          <Link
            href="/"
            className="relative flex items-center gap-2 w-fit text-xl font-bold tracking-tight"
          >
            <Wallet />
            FinTracker
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
            © {new Date().getFullYear()} FinTracker
          </p>
        </section>

        {/* RIGHT SECTION */}
        <section className="flex min-h-full flex-col bg-card p-6 sm:p-10 lg:p-12">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex w-fit items-center gap-2 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Wallet className="h-5 w-5" />
              </div>

              <span className="text-lg font-bold tracking-tight text-foreground">
                FinTracker
              </span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80 lg:justify-end lg:w-full"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
