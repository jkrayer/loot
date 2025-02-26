import { describe, expect, test } from "vitest";
import {
  getTitleNumber,
  highestEndingNumber,
  createEmptyLootPackage,
  toLootLines,
} from "./loot";
import type { LootPackage } from "../types";

describe("getTitleNumber", () => {
  test("should return the ending number from the title", () => {
    const lootPackage: LootPackage = {
      title: "Loot Package 123",
      id: "",
      lootPackage: "",
    };
    expect(getTitleNumber(lootPackage)).toBe(123);
  });

  test("should return -1 if the title does not end with a number", () => {
    const lootPackage: LootPackage = {
      title: "Loot Package",
      id: "",
      lootPackage: "",
    };
    expect(getTitleNumber(lootPackage)).toBe(-1);
  });
});

describe("highestEndingNumber", () => {
  test("should return the highest ending number from a list of loot packages", () => {
    const lootPackages: LootPackage[] = [
      {
        title: "Loot Package 123",
        id: "",
        lootPackage: "",
      },
      {
        title: "Loot Package 456",
        id: "",
        lootPackage: "",
      },
      {
        title: "Loot Package 789",
        id: "",
        lootPackage: "",
      },
    ];
    expect(highestEndingNumber(lootPackages)).toBe(789);
  });

  test("should return 0 if the list is empty", () => {
    const lootPackages: LootPackage[] = [];
    expect(highestEndingNumber(lootPackages)).toBe(0);
  });

  test("should handle loot packages with titles that do not end with numbers", () => {
    const lootPackages: LootPackage[] = [
      {
        title: "Loot Package 123",
        id: "",
        lootPackage: "",
      },
      {
        title: "Loot Package",
        id: "",
        lootPackage: "",
      },
      {
        title: "Loot Package 456",
        id: "",
        lootPackage: "",
      },
    ];
    expect(highestEndingNumber(lootPackages)).toBe(456);
  });

  describe("createEmptyLootPackage", () => {
    test("should create an empty loot package with the correct size", () => {
      const size = 5;
      const lootPackage = createEmptyLootPackage(size);
      expect(lootPackage).toEqual({
        id: "",
        lootPackage: "",
        title: "Package 6",
      });
    });

    test("should create an empty loot package with size 0", () => {
      const size = 0;
      const lootPackage = createEmptyLootPackage(size);
      expect(lootPackage).toEqual({
        id: "",
        lootPackage: "",
        title: "Package 1",
      });
    });
  });
});

describe("toLootLines", () => {
  test("should return an array of trimmed strings split by comma or newline", () => {
    const lootPackage = {
      lootPackage: " item1, item2 \n item3 ,item4\nitem5 ",
    };
    // @ts-expect-error
    const result = toLootLines(lootPackage);
    expect(result).toEqual(["item1", "item2", "item3", "item4", "item5"]);
  });

  test("should return an empty array if lootPackage is null", () => {
    const lootPackage = null;
    const result = toLootLines(lootPackage);
    expect(result).toEqual([""]);
  });

  test("should return an empty array if lootPackage is an empty string", () => {
    const lootPackage = {
      lootPackage: "",
    };
    // @ts-expect-error
    const result = toLootLines(lootPackage);
    expect(result).toEqual([""]);
  });
});
