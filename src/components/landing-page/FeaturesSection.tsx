import { ChartColumn, Tags, TrendingDown, TrendingUp } from "lucide-react";

import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: TrendingUp,
    title: "Track Income",
    description:
      "Record every source of income and keep your finances organized in one place.",
    iconClassName: "bg-success/10 text-success",
  },
  {
    icon: TrendingDown,
    title: "Track Expenses",
    description:
      "Log daily expenses effortlessly and understand where your money goes.",
    iconClassName: "bg-destructive/10 text-destructive",
  },
  {
    icon: Tags,
    title: "Manage Categories",
    description:
      "Create custom categories to organize every transaction more efficiently.",
    iconClassName: "bg-secondary text-primary",
  },
  {
    icon: ChartColumn,
    title: "Financial Overview",
    description:
      "View your balance, income, and expenses through a clean and simple dashboard.",
    iconClassName: "bg-secondary text-primary",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Features
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-foreground">
            Everything you need to manage your personal finances.
          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Keep track of your income, expenses, categories, and overall
            financial balance in one clean and intuitive dashboard.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
