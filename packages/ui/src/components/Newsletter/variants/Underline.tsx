"use client";
import { cn } from "../../../utils/cn";
import { ArrowRight } from "../../../icons";
import { useNewsletterForm } from "../useNewsletterForm";
import { NewsletterSuccess, NewsletterNote } from "../parts";
import type { NewsletterProps } from "../types";

interface UnderlineProps extends Omit<NewsletterProps, "option"> {}

export function NewsletterUnderline({
  className,
  placeholder = "you@company.com",
  buttonLabel = "Join",
  successMessage = "You’re on the list!",
  note,
  onSubmit,
  ...props
}: UnderlineProps) {
  const { email, done, error, handleSubmit, updateEmail } = useNewsletterForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)} {...props}>
      {done ? (
        <NewsletterSuccess message={successMessage} />
      ) : (
        <div className="flex items-end gap-3 border-b border-foreground/20 pb-3 transition-colors duration-200 focus-within:border-foreground">
          <label htmlFor="newsletter-email" className="sr-only">
            Your email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => updateEmail(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-sm font-semibold text-foreground transition-colors duration-150 hover:text-primary"
          >
            {buttonLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      )}
      <NewsletterNote error={error} note={note} />
    </form>
  );
}
NewsletterUnderline.displayName = "NewsletterUnderline";