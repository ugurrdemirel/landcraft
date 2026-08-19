import { Check } from "../../icons";

export const inputBase =
  "w-full rounded-lg border border-border bg-surface px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background";

export function NewsletterSuccess({ message }: { message: string }) {
  return (
    <p className="flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3.5 text-sm font-medium text-accent" role="status">
      <Check className="h-4 w-4" />
      {message}
    </p>
  );
}

export function NewsletterNote({ error, note }: { error: string | null; note?: string }) {
  if (error) {
    return <p className="mt-2 text-sm font-medium text-red-500" role="alert">{error}</p>;
  }
  if (note) {
    return <p className="mt-3 text-xs leading-5 text-muted-foreground">{note}</p>;
  }
  return null;
}