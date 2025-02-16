import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import OBR from "@owlbear-rodeo/sdk";
import Loot from "./Loot";
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

  // 122

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Typography variant="h6" component="h1" sx={{ m: [2, 1] }}>
        Loot
      </Typography>
      {role === "GM" ? (
        <Loot />
      ) : (
        <Card>
          <CardHeader title="Loot" />
          <CardContent>GM Access Required</CardContent>
        </Card>
      )}
    </ThemeProvider>
  );
}
