import { compose, pathOr, replace } from "ramda";

export const getPackageId = compose<[typeof window], string, string, string>(
  replace(/(&.*)$/, ""),
  replace(/^(\?packageId=)/, ""),
  pathOr("", ["location", "search"]),
);
