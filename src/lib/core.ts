import { compose, match } from "ramda";

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
