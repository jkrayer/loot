import { type ThemeOptions } from "@mui/material";
import { type Theme } from "@owlbear-rodeo/sdk";
import { compose, match, propOr } from "ramda";
import { APPLICATION_KEY } from "./constants";
import type { LootPackage } from "../types";

/**
 * Change a string into a number
 * @returns number or NaN
 */
export const toInt = (x: string): ReturnType<typeof parseInt> =>
  parseInt(x, 10);

/**
 * Returns the first element of the given list or string, or the default value
 * if it's undefined
 * @returns T
 */
export const headOr =
  <T>(defaultV: T) =>
  (list: T[]): T =>
    list[0] !== undefined ? list[0] : defaultV;

/**
 * Returns the number at the end of the string as a number or -1 if not such
 * number exists
 * @returns number
 */
export const getEndingNum = compose<[string], RegExpMatchArray, string, number>(
  toInt,
  headOr("-1"),
  match(/\d+$/),
);

/**
 * Create a unique id. Not tested since the result is random.
 * @returns string
 */
export const createId = (): string =>
  Date.now().toString() + Math.trunc(1000 * Math.random());

/** */
export const getApplicationData = propOr<LootPackage[]>([], APPLICATION_KEY);

export const composeTheme = (palette: Theme): ThemeOptions => ({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflow: "hidden",
          backgroundColor: "initial",
        },
      },
    },
  },
  palette: {
    ...palette,
    mode: palette.mode === "DARK" ? "dark" : "light",
  },
});
