import { createContext, useContext, useEffect, useState } from "react";

type FontSize = "small" | "medium" | "large";
type SidebarSide = "left" | "right";
type SidebarVariant = "sidebar" | "floating" | "inset";
type SidebarCollapsible = "offcanvas" | "icon" | "none";
type VehicleView = "table" | "gallery";
type ThemePreset = "default" | "deep-purple" | "solar-dusk";
type MenuStyle = "sidebar" | "floating" | "fixed" | "fullWidth";

type Settings = {
  fontSize: FontSize;
  sidebarSide: SidebarSide;
  sidebarVariant: SidebarVariant;
  sidebarCollapsible: SidebarCollapsible;
  sidebarDefaultOpen: boolean;
  vehicleView: VehicleView;
  themePreset: ThemePreset;
  menuStyle: MenuStyle;
};

type SettingsProviderState = {
  settings: Settings;
  setFontSize: (size: FontSize) => void;
  setSidebarSide: (side: SidebarSide) => void;
  setSidebarVariant: (variant: SidebarVariant) => void;
  setSidebarCollapsible: (collapsible: SidebarCollapsible) => void;
  setSidebarDefaultOpen: (open: boolean) => void;
  setVehicleView: (view: VehicleView) => void;
  setThemePreset: (preset: ThemePreset) => void;
  setMenuStyle: (style: MenuStyle) => void;
};

const STORAGE_KEY = "app-settings";

const defaults: Settings = {
  fontSize: "medium",
  sidebarSide: "left",
  sidebarVariant: "inset",
  sidebarCollapsible: "icon",
  sidebarDefaultOpen: true,
  vehicleView: "table",
  themePreset: "default",
  menuStyle: "sidebar",
};

function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaults, ...JSON.parse(stored) };
    }
  } catch {}
  return defaults;
}

function saveSettings(settings: Settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

const SettingsContext = createContext<SettingsProviderState | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    const loaded = loadSettings();
    if (!("menuStyle" in loaded)) {
      (loaded as Record<string, unknown>).menuStyle = "sidebar";
      saveSettings(loaded);
    }
    return loaded;
  });

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("text-sm", "text-base", "text-lg");
    if (settings.fontSize === "small") root.classList.add("text-sm");
    else if (settings.fontSize === "large") root.classList.add("text-lg");
    else root.classList.add("text-base");
  }, [settings.fontSize]);

  const setFontSize = (fontSize: FontSize) =>
    setSettings((prev) => ({ ...prev, fontSize }));

  const setSidebarSide = (sidebarSide: SidebarSide) =>
    setSettings((prev) => ({ ...prev, sidebarSide }));

  const setSidebarVariant = (sidebarVariant: SidebarVariant) =>
    setSettings((prev) => ({ ...prev, sidebarVariant }));

  const setSidebarCollapsible = (sidebarCollapsible: SidebarCollapsible) =>
    setSettings((prev) => ({ ...prev, sidebarCollapsible }));

  const setSidebarDefaultOpen = (sidebarDefaultOpen: boolean) =>
    setSettings((prev) => ({ ...prev, sidebarDefaultOpen }));

  const setVehicleView = (vehicleView: VehicleView) =>
    setSettings((prev) => ({ ...prev, vehicleView }));

  const setThemePreset = (themePreset: ThemePreset) =>
    setSettings((prev) => ({ ...prev, themePreset }));

  const setMenuStyle = (menuStyle: MenuStyle) =>
    setSettings((prev) => ({ ...prev, menuStyle }));

  return (
    <SettingsContext.Provider
      value={{ settings, setFontSize, setSidebarSide, setSidebarVariant, setSidebarCollapsible, setSidebarDefaultOpen, setVehicleView, setThemePreset, setMenuStyle }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings must be used within a SettingsProvider");
  return context;
}
