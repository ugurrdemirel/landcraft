import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { cn } from "../utils/cn";

export interface SlotProps extends Omit<HTMLAttributes<HTMLElement>, "ref"> {
  children?: ReactNode;
}

type AnyProps = Record<string, any>;

function mergeProps(slotProps: AnyProps, childProps: AnyProps): AnyProps {
  const overrideProps: AnyProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);

    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: any[]) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = cn(slotPropValue, childPropValue);
    }
  }

  return { ...slotProps, ...overrideProps };
}

function useComposedRefs(...refs: Array<Ref<unknown> | undefined>) {
  return (node: unknown) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        (ref as { current: unknown }).current = node;
      }
    }
  };
}

/**
 * Merges its props onto a single child element instead of rendering its own
 * DOM node. Used with the `asChild` prop so consumers can render a framework
 * router `<Link>` (Next.js, Remix, React Router…) with a component's styling.
 */
export const Slot = forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;

  if (!isValidElement(children)) {
    return null;
  }

  const child = Children.only(children) as ReactElement & { ref?: Ref<unknown> };
  const composedRef = useComposedRefs(forwardedRef, child.ref);

  return cloneElement(child, {
    ...mergeProps(slotProps as AnyProps, child.props as AnyProps),
    ref: composedRef,
  });
});
Slot.displayName = "Slot";
