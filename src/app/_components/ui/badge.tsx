import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/app/_lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-1.5 py-0.5 text-[12.9px] font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent text-foreground/60 bg-muted [a&]:hover:bg-secondary/90",
        primary:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-primary/20 text-primary [a&]:hover:bg-primary/90",
        success:
          "border-transparent bg-lime-200 text-lime-700 [a&]:hover:bg-lime-300 focus-visible:ring-lime-200 dark:focus-visible:ring-lime-400 dark:bg-lime-600",
        warning:
          "border-transparent bg-amber-200 text-amber-700 [a&]:hover:bg-amber-300 focus-visible:ring-amber-200 dark:focus-visible:ring-amber-400 dark:bg-amber-600",
        destructive:
          "border-transparent bg-rose-200 text-rose-700 [a&]:hover:bg-rose-300 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground/60 [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
