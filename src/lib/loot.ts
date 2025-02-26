import { compose, map, max, prop, propOr, reduce, split, trim } from "ramda";
import { getEndingNum } from "./core";
import type { LootPackage } from "../types";

export const getTitleNumber = compose<[LootPackage], string, number>(
  getEndingNum,
  prop("title"),
);

export const highestEndingNumber = reduce<LootPackage, number>(
  (acc, loot) => max(acc, getTitleNumber(loot)),
  0,
);

/**
 * Return Default Loot Package
 * @param size : ;
 * @returns
 */
export const createEmptyLootPackage = (size: number): LootPackage => ({
  id: "",
  lootPackage: "",
  title: `Package ${size + 1}`,
});

/**
 * Split the lootPackage string into an array of strings
 */
export const toLootLines = compose<
  [LootPackage | null],
  string,
  string[],
  string[]
>(map(trim), split(/,\s?|\n/), propOr("", "lootPackage"));
