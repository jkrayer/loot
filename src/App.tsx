import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import OBR from "@owlbear-rodeo/sdk";
import type { Role, ThemeMode } from "./types";

// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg"; - public

// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';

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
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);
  console.log(16, theme);
  useEffect(() => {
    OBR.player.onChange((player) => setRole(player.role));
    OBR.theme.onChange((theme) => setTheme(theme.mode));
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {role === "GM" ? (
        <Card>
          <CardHeader title="Loot" />
        </Card>
      ) : (
        <div className={theme === "DARK" ? "dark" : ""}>
          <div className="flex h-screen flex-col gap-3 overflow-y-auto p-3">
            <h1 className="pl-1 text-lg font-bold text-black/[0.87] dark:text-white">
              Loot
            </h1>
            <p className="pl-1 text-sm">GM Access Required</p>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}

{
  /* <div className="css-s92abg">
<CardHeader>
  <Typography component="h3">
    <span>Loot</span>
  </Typography>
  <p>GM Access Required</p>
</CardHeader>
</div> */
}

{
  /* <div className={theme === "DARK" ? "dark" : ""}>
<div className="flex h-screen flex-col gap-3 overflow-y-auto p-3">
  <h1 className="pl-1 text-lg font-bold text-black/[0.87] dark:text-white">
    Loot
  </h1>
  <p className="pl-1 text-sm">GM Access Required</p>
</div>
</div> */
}
