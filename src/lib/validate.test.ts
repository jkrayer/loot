import { describe, it, expect } from "vitest";
import { validate } from "./validate";
import type { LootPackage } from "../types";

describe("validate", () => {
  it("should sanitize and validate a valid LootPackage", () => {
    const loot: LootPackage = {
      id: "1",
      title: "Valid Title",
      lootPackage: "Valid Package",
    };

    const [sanitizedLoot, isValid] = validate(loot);

    expect(sanitizedLoot).toEqual(loot);
    expect(isValid).toBe(true);
  });

  it("should sanitize and invalidate an invalid LootPackage", () => {
    const loot: LootPackage = {
      id: "1",
      title: "",
      lootPackage: "Valid Package",
    };

    const [sanitizedLoot, isValid] = validate(loot);

    expect(sanitizedLoot).toEqual({
      id: "1",
      title: "",
      lootPackage: "Valid Package",
    });
    expect(isValid).toBe(false);
  });

  it("should remove HTML tags from title and lootPackage", () => {
    const loot: LootPackage = {
      id: "1",
      title: "<b>Title</b>",
      lootPackage: "<i>Package</i>",
    };

    const [sanitizedLoot, isValid] = validate(loot);

    expect(sanitizedLoot).toEqual({
      id: "1",
      title: "Title",
      lootPackage: "Package",
    });
    expect(isValid).toBe(true);
  });

  it("should trim whitespace from title and lootPackage", () => {
    const loot: LootPackage = {
      id: "1",
      title: "  Title  ",
      lootPackage: "  Package  ",
    };

    const [sanitizedLoot, isValid] = validate(loot);

    expect(sanitizedLoot).toEqual({
      id: "1",
      title: "Title",
      lootPackage: "Package",
    });
    expect(isValid).toBe(true);
  });
});
