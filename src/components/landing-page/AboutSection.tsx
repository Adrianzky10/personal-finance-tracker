import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  const benefits = [
    "Gain complete control over your cash flow",
    "Identify spending patterns and reduce waste",
    "Set and achieve your financial goals faster",
    "Secure, private, and easy to use anywhere",
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text Content */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              About Us
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Empowering you to make smarter financial decisions.
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              At Personal Finance Tracker, we believe that managing your money
              should not be complicated. Our mission is to provide a simple,
              elegant, and powerful tool that helps you understand your habits
              and build a better financial future.
            </p>

            <dl className="mt-8 space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <dt className="text-base text-foreground">{benefit}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Visual Content - Elegant Placeholder Block */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] overflow-hidden rounded-3xl bg-secondary/50 border shadow-sm flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-background to-secondary/20" />
            <div className="relative w-full h-full rounded-2xl border bg-background/50 backdrop-blur-sm shadow-xl p-6 flex flex-col gap-4">
              {/* Decorative elements representing a clean UI dashboard */}
              <div className="h-8 w-1/3 rounded-md bg-muted animate-pulse" />
              <div className="flex-1 rounded-xl bg-muted/50 animate-pulse" />
              <div className="flex gap-4">
                <div className="h-24 flex-1 rounded-xl bg-primary/10 border border-primary/20 animate-pulse" />
                <div className="h-24 flex-1 rounded-xl bg-destructive/10 border border-destructive/20 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
