import { useEffect, useState } from "react";
import { CardHeader, Divider, Typography } from "@mui/material";
import OBR from "@owlbear-rodeo/sdk";
import LootProvider from "../context/LootProvider";
import { showMessage, APPLICATION_KEY } from "../lib";
import Loot from "./Loot";
import type { Role } from "../types";

export default function App({ initialRole }: { initialRole: Role }) {
  const [role, setRole] = useState<Role>(initialRole);

  // PLAYERS
  useEffect(() => {
    OBR.action.setHeight(initialRole === "GM" ? 700 : 86);

    return OBR.player.onChange((player) => {
      OBR.action.setHeight(role === "GM" ? 700 : 86);
      setRole(player.role);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // HANDLE SHOWING THE LOOT
  useEffect(() => OBR.broadcast.onMessage(APPLICATION_KEY, showMessage), []);

  return (
    <LootProvider>
      <CardHeader
        title="Loot"
        sx={{
          "& .MuiTypography-h5": {
            fontSize: "1.125rem",
            fontWeight: 700,
            lineHeight: "32px",
          },
        }}
      />
      <Divider />
      {role === "GM" ? (
        <>
          <Loot />
        </>
      ) : (
        <Typography component="p" sx={{ m: [2, 1] }} variant="body2">
          GM Access Required
        </Typography>
      )}
    </LootProvider>
  );
}
