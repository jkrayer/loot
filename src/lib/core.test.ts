import { describe, expect, test } from "vitest";
import { toInt, headOr, getEndingNum } from "./core";

describe("toInt", () => {
  test("should convert a string to an integer", () => {
    expect(toInt("123")).toBe(123);
  });

  test("should return NaN for non-numeric strings", () => {
    expect(toInt("abc")).toBeNaN();
  });
});

describe("headOr", () => {
  test("should return the first element of the list", () => {
    expect(headOr(0)([1, 2, 3])).toBe(1);
  });

  test("should return the default value if the list is empty", () => {
    expect(headOr(0)([])).toBe(0);
  });
});

describe("getEndingNum", () => {
  test("should return the number at the end of the string", () => {
    expect(getEndingNum("test123")).toBe(123);
  });

  test("should return -1 if no number is found at the end of the string", () => {
    expect(getEndingNum("test")).toBe(-1);
  });
});
