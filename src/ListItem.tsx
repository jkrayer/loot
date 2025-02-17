import { IconButton, ListItem as LI } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PlayArrow } from "@mui/icons-material";
import { deleteLoot } from "./lib";
import { type LootPackage } from "./types";

export default function ListItem({ loot }: { loot: LootPackage }) {
  const handlDelete = () => deleteLoot(loot);

  return (
    <LI
      key={loot.id}
      secondaryAction={
        <>
          <IconButton aria-label="delete" edge="end" onClick={handlDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton edge="end" aria-label="send">
            <PlayArrow />
          </IconButton>
        </>
      }
    >
      {loot.title}
    </LI>
  );
}
