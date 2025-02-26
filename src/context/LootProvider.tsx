import { useState, type PropsWithChildren } from "react";
import { LOOT_CONTEXT } from "./loot-context";
import type { LootPackage } from "../types";

export default function LootProvider({ children }: PropsWithChildren<never>) {
  const [selectedPackage, setSelectedPackage] = useState<LootPackage | null>(
    null,
  );

  return (
    <LOOT_CONTEXT.Provider value={{ selectedPackage, setSelectedPackage }}>
      {children}
    </LOOT_CONTEXT.Provider>
  );
}
