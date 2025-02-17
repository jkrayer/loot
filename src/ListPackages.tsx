import { useEffect, useState } from "react";
import OBR from "@owlbear-rodeo/sdk";
import { List } from "@mui/material";
import { getApplicationData, readLoot } from "./lib";
import { type LootPackage } from "./types";
import ListItem from "./ListItem";

export default function ListPackages() {
  const [packages, setPackages] = useState<LootPackage[]>([]);

  // EFFECTS
  useEffect(() => {
    OBR.onReady(async () => {
      const loot = await readLoot();
      setPackages(loot);
    });

    return OBR.scene.onMetadataChange((metadata) => {
      setPackages(getApplicationData(metadata));
    });
  }, []);

  return (
    <List>
      {packages.map((loot) => (
        <ListItem key={loot.id} loot={loot} />
      ))}
    </List>
  );
}
