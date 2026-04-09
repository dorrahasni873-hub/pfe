import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./providers/theme-provider";
import { AppRoutes } from "./routers/AppRoutes ";
import { AuthProvider } from "./providers/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
