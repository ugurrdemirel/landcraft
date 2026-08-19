import { cn } from "../../utils/cn";
import type { LogoItem } from "./types";

const LogoText = ({ name }: { name: string }) => (
  <span className="text-lg font-semibold tracking-tight text-foreground/45 transition-colors duration-200 group-hover:text-foreground">
    {name}
  </span>
);

export const LogoMark = ({ logo }: { logo: LogoItem }) =>
  logo.src ? (
    <img
      src={logo.src}
      alt={logo.name}
      loading="lazy"
      className={cn(
        "max-h-7 w-auto opacity-50 grayscale transition-all duration-200 group-hover:opacity-90 group-hover:grayscale-0",
        "h-7",
      )}
    />
  ) : (
    <LogoText name={logo.name} />
  );

export function LogoCloudTitle({ title, className }: { title?: string; className?: string }) {
  if (!title) return null;
  return (
    <p className={cn("mb-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground", className)}>
      {title}
    </p>
  );
}