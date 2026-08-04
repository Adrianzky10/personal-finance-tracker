import Link from "next/link";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-20 text-center lg:pt-28">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
          <Sparkles className="h-4 w-4" />
          Personal Finance Tracker
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Take control of your <span className="text-primary">finances</span>{" "}
          with confidence.
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Track your income, monitor expenses, create budgets, and achieve your
          financial goals through a clean, intuitive dashboard designed for
          everyday use.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/register">
              Get Started
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
    </section>
  );
}
