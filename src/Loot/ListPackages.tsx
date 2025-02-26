import { List } from "@mui/material";
import ListItem from "./ListItem";
import { type LootPackage } from "../types";

export default function ListPackages({
  packages,
}: {
  packages: LootPackage[];
}) {
  return (
    <List>
      {packages.map((loot) => (
        <ListItem key={loot.id} loot={loot} />
      ))}
    </List>
  );
}
