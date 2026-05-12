import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";

export function BasculeMode() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <span onClick={toggleTheme} className="flex items-center gap-3 w-full cursor-pointer">
      {theme === "dark" ? (
        <Moon className="h-4 w-4 transition-all duration-300 hover:scale-110" />
      ) : (
        <Sun className="h-4 w-4 transition-all duration-300 hover:scale-110" />
      )}
      <span>{theme === "dark" ? "Mode sombre" : "Mode clair"}</span>
    </span>
  );
}
