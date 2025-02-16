import { type LootPackage } from "./types";

export default function ListPackages({
  packages,
}: {
  packages: LootPackage[];
}) {
  return (
    <ul>
      {packages.map((loot) => (
        <li key={loot.id}>{loot.title}</li>
      ))}
    </ul>
  );
}
