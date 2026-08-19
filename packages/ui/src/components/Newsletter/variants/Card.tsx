"use client";
import { cn } from "../../../utils/cn";
import { ArrowRight, Mail } from "../../../icons";
import { useNewsletterForm } from "../useNewsletterForm";
import { inputBase, NewsletterSuccess, NewsletterNote } from "../parts";
import type { NewsletterProps } from "../types";

interface CardProps extends Omit<NewsletterProps, "option"> {}

export function NewsletterCard({
  className,
  placeholder = "you@company.com",
  buttonLabel = "Join",
  successMessage = "You’re on the list!",
  note,
  onSubmit,
  ...props
}: CardProps) {
  const { email, done, error, handleSubmit, updateEmail } = useNewsletterForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)} {...props}>
      {done ? (
        <NewsletterSuccess message={successMessage} />
      ) : (
        <div className="rounded-xl border border-border bg-surface p-7">
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Mail className="h-4 w-4" />
            </span>
            <p className="font-display text-lg font-semibold tracking-tight text-foreground">
              Monthly digest
            </p>
          </div>
          <label htmlFor="newsletter-email" className="sr-only">
            Your email address
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => updateEmail(e.target.value)}
              placeholder={placeholder}
              className={cn(inputBase, "h-11")}
            />
            <button
              type="submit"
              className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-on-primary transition-colors duration-200 hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {buttonLabel}
              <ArrowRight className="h-4 w-4 opacity-60" />
            </button>
          </div>
          <NewsletterNote error={error} note={note} />
        </div>
      )}
    </form>
  );
}
NewsletterCard.displayName = "NewsletterCard";