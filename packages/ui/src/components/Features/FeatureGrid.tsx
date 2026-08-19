import { forwardRef } from "react";
import type { FeatureGridProps } from "./types";
import { FeatureColumns } from "./variants/Columns";
import { FeatureBento } from "./variants/Bento";
import { FeatureEditorialRows } from "./variants/EditorialRows";

export const FeatureGrid = forwardRef<HTMLDivElement, FeatureGridProps>(
  ({ option = "columns", columns = 3, ...props }, ref) => {
    if (option === "editorialRows") return <FeatureEditorialRows ref={ref} {...props} />;
    if (option === "bento") return <FeatureBento ref={ref} {...props} />;
    return <FeatureColumns ref={ref} columns={columns} {...props} />;
  },
);
FeatureGrid.displayName = "FeatureGrid";