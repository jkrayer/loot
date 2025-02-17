import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import OBR from "@owlbear-rodeo/sdk";
import App from "./App.tsx";

OBR.onReady(async () => {
  let role = await OBR.player.getRole();
  let theme = await OBR.theme.getTheme();

  const meta = await OBR.scene.getMetadata();

  console.log(12, meta);

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App initialRole={role} initialTheme={theme.mode} />
    </StrictMode>,
  );
});
