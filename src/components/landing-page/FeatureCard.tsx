import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconClassName?: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  iconClassName,
}: FeatureCardProps) {
  return (
    <div
      className="
        group
        rounded-xl
        border
        border-border
        bg-card
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/30
        hover:shadow-md
      "
    >
      <div
        className={`
          mb-5
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          ${iconClassName}
        `}
      >
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="text-lg font-semibold text-foreground">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {description}
      </p>

      <Link
        href="#"
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-primary
          transition-colors
          group-hover:gap-3
        "
      >
        Learn more
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
