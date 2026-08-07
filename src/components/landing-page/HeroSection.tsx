"use client";
import Link from "next/link";
import { ArrowRight, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import useCurrentUser from "@/hooks/auth/useCurrentUser";

export default function HeroSection() {
  const { data: user } = useCurrentUser();
  const isAuthenticated = !!user;

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-20 text-center lg:pt-28">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
          <Wallet className="h-4 w-4" />
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

        {/* CTA - Improved Button Layout and Logic */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          {isAuthenticated ? (
            // After Login: Show a prominent primary button to the Dashboard
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            // Before Login: Show Primary Call-to-Action and Secondary Demo
            <>
              <Button size="lg" asChild>
                <Link href="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
