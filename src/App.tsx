import { useEffect, useState } from "react";
import {
  CardHeader,
  CssBaseline,
  Divider,
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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "initial",
        },
      },
    },
  },
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

  // PLAYERS
  useEffect(() => {
    OBR.action.setHeight(initialRole === "GM" ? 700 : 86);

    return OBR.player.onChange((player) => {
      OBR.action.setHeight(role === "GM" ? 700 : 86);
      setRole(player.role);
    });
  }, []);

  // OBR.theme.onChange((theme) => setTheme(theme.mode));

  // HANDLE SHOWING THE LOOT
  useEffect(() => OBR.broadcast.onMessage(APPLICATION_KEY, showMessage), []);

  // <div class="MuiCardHeader-root css-faujvq">
  //   <div class="MuiCardHeader-content css-11qjisw">
  //     <span class="MuiTypography-root MuiTypography-h5 MuiCardHeader-title css-rb1tah">
  //       Initiative
  //     </span>
  //   </div>
  //   <div class="MuiCardHeader-action css-1bh09gn">
  //     <button
  //       class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-1egpgfe"
  //       tabindex="0"
  //       type="button"
  //       aria-label="next"
  //     >
  //       <svg
  //         class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
  //         focusable="false"
  //         aria-hidden="true"
  //         viewBox="0 0 24 24"
  //         data-testid="SkipNextRoundedIcon"
  //       >
  //         <path d="m7.58 16.89 5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82zM16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"></path>
  //       </svg>
  //     </button>
  //   </div>
  // </div>;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* <Typography variant="h5" component="h1" sx={{ m: [2, 1] }}>
        Loot
      </Typography> */}
      <>
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
      </>
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
