import { describe, expect, test } from "vitest";
import {
  toInt,
  headOr,
  getEndingNum,
  getApplicationData,
  composeTheme,
} from "./core";
import { APPLICATION_KEY } from "./constants";
import type { LootPackage } from "../types";
import { type Theme } from "@owlbear-rodeo/sdk";

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

  describe("getApplicationData", () => {
    test("should return the application data from the given object", () => {
      // @ts-expect-error - missing properties for test
      const data: LootPackage[] = [{ id: "1", title: "Loot1" }];
      const obj = { [APPLICATION_KEY]: data };
      expect(getApplicationData(obj)).toEqual(data);
    });

    test("should return an empty array if the application data is not found", () => {
      const obj = {};
      expect(getApplicationData(obj)).toEqual([]);
    });
  });

  describe("composeTheme", () => {
    test("should compose a theme with the given palette", () => {
      // @ts-expect-error - missing properties for test
      const palette: Theme = { mode: "DARK" };
      const themeOptions = composeTheme(palette);
      expect(themeOptions.palette?.mode).toBe("dark");
    });

    test("should set the mode to light if the palette mode is not DARK", () => {
      // @ts-expect-error - missing properties for test
      const palette: Theme = { mode: "LIGHT" };
      const themeOptions = composeTheme(palette);
      expect(themeOptions.palette?.mode).toBe("light");
    });
  });
});
