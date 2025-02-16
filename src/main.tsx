import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import OBR from "@owlbear-rodeo/sdk";
import App from "./App.tsx";

OBR.onReady(async () => {
  let role = await OBR.player.getRole();
  let theme = await OBR.theme.getTheme();

  console.log(10, theme);

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App initialRole={role} initialTheme={theme.mode} />
    </StrictMode>,
  );
});

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import "../index.css";
// import { PluginThemeProvider } from "../PluginThemeProvider.tsx";
// import { CssBaseline } from "@mui/material";
//

// OBR.onReady(async () => {
//
//   let isDark = (await OBR.theme.getTheme()).mode === "DARK";
//   setHeight();

//   const root = ReactDOM.createRoot(document.getElementById("root")!);
//   render();

//   OBR.theme.onChange((theme) => {
//     isDark = theme.mode === "DARK";
//     if (role !== "GM") render();
//   });

//   function setHeight() {
//     OBR.action.setHeight(role === "GM" ? 700 : 100);
//   }

//   function render() {
//     root.render(
//       <React.StrictMode>
//         <PluginThemeProvider>
//           <CssBaseline />
//           {role === "GM" ? (
//             <App />
//           ) : (
//             <div className={isDark ? "dark" : ""}>
//               <div className="flex h-screen flex-col gap-3 overflow-y-auto p-3">
//                 <h1 className="pl-1 text-lg font-bold text-black/[0.87] dark:text-white">
//                   Phases Automated
//                 </h1>
//                 <p className="pl-1 text-sm">GM Access Required</p>
//               </div>
//             </div>
//           )}
//         </PluginThemeProvider>
//       </React.StrictMode>,
//     );
//   }
// });
