import { useState, type FormEvent, type HTMLAttributes } from "react";
import { cn } from "../utils/cn";
import { ArrowRight, Check, Mail } from "../icons";

export interface NewsletterProps extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  option?: "inline" | "card" | "underline";
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  note?: string;
  onSubmit?: (email: string) => void;
}

const inputBase =
  "w-full rounded-lg border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background";

export const Newsletter = ({
  className,
  option = "inline",
  placeholder = "you@company.com",
  buttonLabel = "Join",
  successMessage = "You’re on the list!",
  note,
  onSubmit,
  ...props
}: NewsletterProps) => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Please enter a valid email.");
      return;
    }
    setError(null);
    setDone(true);
    onSubmit?.(value);
  };

  const success = (
    <p className="flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3.5 text-sm font-medium text-accent" role="status">
      <Check className="h-4 w-4" />
      {successMessage}
    </p>
  );

  if (option === "card") {
    return (
      <form onSubmit={handleSubmit} className={cn("w-full", className)} {...props}>
        {done ? (
          success
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
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
            {error ? (
              <p className="mt-2 text-sm font-medium text-red-500" role="alert">{error}</p>
            ) : note ? (
              <p className="mt-3 text-xs leading-5 text-muted-foreground">{note}</p>
            ) : null}
          </div>
        )}
      </form>
    );
  }

  if (option === "underline") {
    return (
      <form onSubmit={handleSubmit} className={cn("w-full", className)} {...props}>
        {done ? (
          success
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
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
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
        {error ? (
          <p className="mt-2 text-sm font-medium text-red-500" role="alert">{error}</p>
        ) : note ? (
          <p className="mt-2 text-xs leading-5 text-muted-foreground">{note}</p>
        ) : null}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)} {...props}>
      {done ? (
        success
      ) : (
        <>
          <label htmlFor="newsletter-email" className="sr-only">
            Your email address
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
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
          {error ? (
            <p className="mt-2 text-sm font-medium text-red-500" role="alert">{error}</p>
          ) : note ? (
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{note}</p>
          ) : null}
        </>
      )}
    </form>
  );
};
Newsletter.displayName = "Newsletter";