import { useEffect, useState } from "react";
import {
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import OBR from "@owlbear-rodeo/sdk";
import { APPLICATION_KEY, showMessage } from "./lib";
import ListPackages from "./ListPackages";
import LootPackageForm from "./LootPackageForm";
import type { Role, ThemeMode } from "./types";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bb99ff",
      light: "rgb(200, 173, 255)",
      dark: "rgb(130, 107, 178)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    secondary: {
      main: "#ee99ff",
      light: "rgb(241, 173, 255)",
      dark: "rgb(166, 107, 178)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    background: {
      paper: "#222639",
      default: "#1e2231",
    },
    text: {
      disabled: "rgba(255, 255, 255, 0.5)",
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
  },
});

export default function App({
  initialRole,
  initialTheme,
}: {
  initialRole: Role;
  initialTheme: ThemeMode;
}) {
  const [role, setRole] = useState<Role>(initialRole);
  // const [theme, setTheme] = useState<ThemeMode>(initialTheme);

  useEffect(() => {
    OBR.player.onChange((player) => {
      console.log(59, player);

      OBR.action.setHeight(role === "GM" ? 700 : 122);
      setRole(player.role);
    });
    // OBR.theme.onChange((theme) => setTheme(theme.mode));
  }, []);

  // HANDLE SHOWING THE LOOT
  useEffect(() => OBR.broadcast.onMessage(APPLICATION_KEY, showMessage), []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Typography variant="h6" component="h1" sx={{ m: [2, 1] }}>
        Loot
      </Typography>
      {role === "GM" ? (
        <>
          <LootPackageForm />
          <ListPackages />
        </>
      ) : (
        <Typography component="p" sx={{ m: [2, 1] }} variant="body2">
          GM Access Required
        </Typography>
      )}
    </ThemeProvider>
  );
}
