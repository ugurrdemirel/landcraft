"use client";
import { forwardRef, useEffect, useId, useRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../utils/cn";
import { X } from "../icons";

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean;
  onClose: () => void;
  /** Dialog heading (required for a11y; auto-linked via `aria-labelledby`). */
  title?: ReactNode;
  description?: ReactNode;
  /** Rendered below the content, e.g. actions. */
  footer?: ReactNode;
  /** Content width. Defaults to `md`. */
  size?: "sm" | "md" | "lg";
}

const sizes: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

/**
 * Accessible dialog built on the HTML Popover API.
 *
 * `popover="auto"` renders in the top layer and gives light-dismiss (outside
 * click + `Escape`), automatic focus movement and restoration for free, so no
 * portal, focus trap or key handlers are needed. State stays controlled via
 * `open` / `onClose`.
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ className, open, onClose, title, description, footer, size = "md", children, ...props }, ref) => {
    const titleId = useId();
    const descriptionId = useId();
    const internalRef = useRef<HTMLDivElement | null>(null);
    const onCloseRef = useRef(onClose);

    useEffect(() => {
      onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
      const el = internalRef.current;
      if (!el) return;
      if (!el.hasAttribute("popover")) el.setAttribute("popover", "auto");
    }, []);

    useEffect(() => {
      const el = internalRef.current;
      if (!el) return;
      if (open) {
        if (!el.matches(":popover-open")) el.showPopover();
        document.body.style.overflow = "hidden";
      } else {
        if (el.matches(":popover-open")) el.hidePopover();
        document.body.style.overflow = "";
      }
    }, [open]);

    useEffect(() => {
      const el = internalRef.current;
      if (!el) return;
      const onToggle = (event: Event) => {
        if ((event as ToggleEvent).newState === "closed") onCloseRef.current?.();
      };
      el.addEventListener("toggle", onToggle);
      return () => el.removeEventListener("toggle", onToggle);
    }, []);

    useEffect(
      () => () => {
        document.body.style.overflow = "";
      },
      [],
    );

    return (
      <div
        ref={(node) => {
          internalRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "modal-anim modal-backdrop fixed inset-0 z-[100] m-auto h-fit max-h-[calc(100vh-2rem)] w-fit max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-border bg-surface p-6 text-foreground shadow-overlay",
          sizes[size],
          className,
        )}
        {...props}
      >
        {title ? (
          <h2
            id={titleId}
            className="pr-8 font-display text-lg font-semibold tracking-tight text-foreground"
          >
            {title}
          </h2>
        ) : null}
        {description ? (
          <p id={descriptionId} className="mt-1.5 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-surface-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>
        <div className={title || description ? "mt-4" : "pt-8"}>{children}</div>
        {footer ? (
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">{footer}</div>
        ) : null}
      </div>
    );
  },
);
Modal.displayName = "Modal";