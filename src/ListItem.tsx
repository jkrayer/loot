import { IconButton, ListItem as LI } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PlayArrow } from "@mui/icons-material";
import { deleteLoot, sendLoot } from "./lib";
import { type LootPackage } from "./types";

export default function ListItem({ loot }: { loot: LootPackage }) {
  return (
    <LI
      key={loot.id}
      secondaryAction={
        <>
          <IconButton
            aria-label="delete"
            edge="end"
            onClick={() => deleteLoot(loot)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="send"
            edge="end"
            onClick={() => sendLoot(loot.lootPackage)}
          >
            <PlayArrow />
          </IconButton>
        </>
      }
    >
      {loot.title}
    </LI>
  );
}
