import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";

export type CardVariant = "outlined" | "elevated" | "inset";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Softens the whole card with hover lift + border tint. */
  interactive?: boolean;
}

const variants: Record<CardVariant, string> = {
  outlined: "border border-border bg-surface",
  elevated: "border border-border bg-surface shadow-soft",
  inset: "bg-surface-strong",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "outlined", interactive = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl transition-[border-color,box-shadow,transform] duration-200",
        variants[variant],
        interactive &&
          "cursor-pointer hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-raised",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, icon, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-2 p-6 pb-0", className)} {...props}>
      {icon ? <div className="mb-1.5">{icon}</div> : null}
      {children}
    </div>
  ),
);
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-display text-lg font-semibold tracking-tight text-foreground", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm leading-6 text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-5", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-3 border-t border-border/70 p-6 pt-5", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";