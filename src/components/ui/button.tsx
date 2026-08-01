import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-transparent text-sm font-semibold whitespace-nowrap transition-all outline-none focus-visible:ring-4 focus-visible:ring-ring/20 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",

        outline: "border-border bg-background text-foreground hover:bg-muted",

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",

        ghost: "text-foreground hover:bg-muted",

        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",

        success:
          "bg-success text-success-foreground shadow-sm hover:bg-success/90",

        warning:
          "bg-warning text-warning-foreground shadow-sm hover:bg-warning/90",

        link: "h-auto px-0 text-primary underline-offset-4 hover:underline",
      },

      size: {
        sm: "h-9 px-3 text-xs",
        default: "h-10 px-4",
        lg: "h-11 px-6 text-base",
        icon: "size-10",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
