import { all, compose, isNotEmpty, replace, trim } from "ramda";
import type { LootPackage } from "../types";

// SANITIZE AND VALIDATE
const sanitizeString = compose<[string], string, string>(
  replace(/<[^>]*>/g, ""),
  trim,
);

// See modify
const sanitize = ({ id, title, lootPackage }: LootPackage): LootPackage => ({
  id,
  title: sanitizeString(title),
  lootPackage: sanitizeString(lootPackage),
});

const isValid = (loot: LootPackage): [LootPackage, boolean] => {
  return [loot, all(isNotEmpty, Object.values(loot))];
};

export const validate = compose<
  [LootPackage],
  LootPackage,
  [LootPackage, boolean]
>(isValid, sanitize);
