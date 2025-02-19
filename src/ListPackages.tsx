import { List } from "@mui/material";
import { type LootPackage } from "./types";
import ListItem from "./ListItem";

export default function ListPackages({
  packages,
}: {
  packages: LootPackage[];
}) {
  console.log(10, packages);
  return (
    <List>
      {packages.map((loot) => (
        <ListItem key={loot.id} loot={loot} />
      ))}
    </List>
  );
}
