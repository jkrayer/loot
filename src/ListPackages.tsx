import { useEffect, useState } from "react";
import OBR from "@owlbear-rodeo/sdk";
import { getApplicationData } from "./lib";
import { type LootPackage } from "./types";

export default function ListPackages() {
  const [packages, setPackages] = useState<LootPackage[]>([]);

  /**
   * Use an `onMetadataChange` event with a React `useEffect`.
   * `onMetadataChange` returns an unsubscribe event to make this easy.
   */
  // EFFECTS
  useEffect(
    () =>
      OBR.scene.onMetadataChange((metadata) => {
        console.log(20, metadata);
        setPackages(getApplicationData(metadata));
      }),
    [],
  );

  console.log(25, packages);

  // LIST
  // Each Row Shows Title
  // Accordion or Hover to show whole package
  // Two controls, Delete and Play

  return (
    <ul>
      {packages.map((loot) => (
        <li key={loot.id}>{loot.title}</li>
      ))}
    </ul>
  );
}
