import { compose, match, pathOr, replace } from "ramda";
import { headOr } from "./core";

export const getPackageId = compose<
  [typeof window],
  string,
  RegExpMatchArray,
  string,
  string
>(
  replace("packageId=", ""),
  headOr(""),
  match(/packageId=\d*/),
  pathOr("", ["location", "search"]),
);
