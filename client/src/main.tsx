import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { RoutesApp } from "./app/router/RoutesApp";
import { AuthentificationProvider } from "./app/providers/AuthentificationProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthentificationProvider>
        <RoutesApp />
      </AuthentificationProvider>
    </ThemeProvider>
  </StrictMode>,
);
