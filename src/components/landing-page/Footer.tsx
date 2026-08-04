import Link from "next/link";
import { Wallet } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Wallet className="h-5 w-5" />
              </div>

              <span className="text-xl font-bold text-foreground">
                FinTracker
              </span>
            </div>

            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              A simple personal finance tracker that helps you record income,
              manage expenses, organize categories, and monitor your financial
              overview in one clean dashboard.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Product</h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Features
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="https://github.com"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  GitHub
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} FinTracker. All rights reserved.</p>

          <p>Built with Next.js, Tailwind CSS & shadcn/ui.</p>
        </div>
      </div>
    </footer>
  );
}
