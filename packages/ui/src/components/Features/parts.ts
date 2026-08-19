export const gridCols: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/** Asymmetric bento layout for up to 6 features. */
export const bentoSpans: string[] = [
  "sm:col-span-2 lg:row-span-2",
  "",
  "",
  "lg:col-span-2",
  "",
  "lg:col-span-2",
];