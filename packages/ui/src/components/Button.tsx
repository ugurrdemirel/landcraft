import { forwardRef, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { Slot } from "./Slot";

export type ButtonVariant = "primary" | "dark" | "outline" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  /** Paints the button with an arbitrary CSS color; text color is computed for contrast. */
  customColor?: string;
  fullWidth?: boolean;
  /**
   * When `true`, the button styling is applied to a single child element
   * instead of a `<button>`. Use it to render a framework router `<Link>`
   * (Next.js, Remix, React Router…). `iconLeft` / `iconRight` are ignored;
   * pass icons inside the child instead.
   */
  asChild?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  dark: "bg-secondary text-on-secondary hover:bg-secondary-hover",
  outline:
    "border border-border bg-transparent text-foreground hover:border-foreground/30 hover:bg-surface",
  ghost: "text-foreground hover:bg-surface",
  link: "px-0 h-auto text-primary hover:text-primary-hover",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[13px] gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-[15px] gap-2",
};

const base =
  "group inline-flex select-none items-center justify-center rounded-lg font-medium tracking-tight transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      iconLeft,
      iconRight,
      customColor,
      fullWidth,
      asChild,
      style,
      type = "button",
      children,
      ...props
    },
    ref,
  ) => {
    const customStyle: CSSProperties | undefined = customColor
      ? ({
          ...style,
          "--lc-bg": customColor,
          backgroundColor: "var(--lc-bg)",
          color: "contrast-color(var(--lc-bg))",
        } as CSSProperties)
      : style;

    const isLink = variant === "link";

    const classes = cn(
      base,
      sizes[size],
      customColor ? "hover:brightness-95" : variants[variant],
      isLink && "underline-offset-4 hover:underline",
      fullWidth && "w-full",
      className,
    );

    if (asChild) {
      return (
        <Slot ref={ref} style={customStyle} className={classes} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        style={customStyle}
        className={classes}
        {...props}
      >
        {iconLeft ? <span className={cn("shrink-0", !isLink && "opacity-70")}>{iconLeft}</span> : null}
        {children}
        {iconRight ? (
          <span
            className={cn(
              "shrink-0 transition-transform duration-200",
              !isLink && "opacity-70 group-hover:translate-x-0.5",
            )}
          >
            {iconRight}
          </span>
        ) : null}
      </button>
    );
  },
);
Button.displayName = "Button";