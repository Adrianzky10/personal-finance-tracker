import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-8 py-16 text-center shadow-sm lg:px-20">
          {/* Background Accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-primary" />

          <div className="absolute left-1/2 top-0 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
            Personal Finance Made Simple
          </div>

          {/* Heading */}
          <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-foreground">
            Ready to take control of your finances?
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Start tracking your income and expenses today. Organize your
            transactions, monitor your balance, and build better financial
            habits—all in one simple dashboard.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/register">
                Start Tracking
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="/demo">
                <PlayCircle className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
