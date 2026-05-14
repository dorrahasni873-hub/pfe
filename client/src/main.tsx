import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { RoutesApp } from "./app/router/RoutesApp";
import { AuthentificationProvider } from "./app/providers/AuthentificationProvider";
import { SettingsProvider } from "./app/providers/SettingsProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SettingsProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthentificationProvider>
          <RoutesApp />
        </AuthentificationProvider>
      </ThemeProvider>
    </SettingsProvider>
  </StrictMode>,
);
