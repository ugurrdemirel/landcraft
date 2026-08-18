import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { Container } from "./Container";

export type EyebrowStyle = "caps" | "soft" | "plain";

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: ReactNode;
  eyebrowStyle?: EyebrowStyle;
  title?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}

const eyebrowBase = "inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase";

const eyebrowStyles: Record<EyebrowStyle, string> = {
  caps: cn(eyebrowBase, "text-foreground/50"),
  soft: cn(
    eyebrowBase,
    "rounded-full px-3 py-1 text-primary tracking-widest bg-primary-soft uppercase",
  ),
  plain: cn(eyebrowBase, "text-primary"),
};

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    { className, eyebrow, eyebrowStyle = "caps", title, description, align = "center", children, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "mb-14 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
      {...props}
    >
      {eyebrow ? <p className={eyebrowStyles[eyebrowStyle]}>{eyebrow}</p> : null}
      {title ? (
        <h2 className="mt-5 font-display text-balance text-[1.9rem] font-semibold leading-[1.08] tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      ) : null}
      {description ? (
        <p className="mt-4 text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  ),
);
SectionHeader.displayName = "SectionHeader";

export interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  size?: "sm" | "md" | "lg";
  eyebrow?: ReactNode;
  eyebrowStyle?: EyebrowStyle;
  title?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  containerClassName?: string;
}

const paddings: Record<NonNullable<SectionProps["size"]>, string> = {
  sm: "py-14",
  md: "py-20 sm:py-24",
  lg: "py-24 sm:py-32",
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      containerClassName,
      size = "md",
      eyebrow,
      eyebrowStyle,
      title,
      description,
      align = "center",
      children,
      id,
      ...props
    },
    ref,
  ) => (
    <section ref={ref} id={id} className={cn("w-full", paddings[size], className)} {...props}>
      <Container className={containerClassName}>
        {eyebrow || title || description ? (
          <SectionHeader
            eyebrow={eyebrow}
            eyebrowStyle={eyebrowStyle}
            title={title}
            description={description}
            align={align}
          />
        ) : null}
        {children}
      </Container>
    </section>
  ),
);
Section.displayName = "Section";