import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useAuthentification } from "@/features/auth/hooks/useAuth";
import {
  IconDashboard,
  IconUsers,
  IconSteeringWheel,
  IconTruck,
  IconArrowsExchange,
  IconTools,
  IconBook,
  IconAlertTriangle,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { BasculeMode } from "./BasculeMode";

const navItems = [
  { title: "Tableau de bord", url: ROUTES.DASHBOARD, icon: IconDashboard, roles: ["admin", "chauffeur", "user"] },
  { title: "Utilisateurs", url: ROUTES.UTILISATEURS, icon: IconUsers, roles: ["admin", "user"] },
  { title: "Chauffeurs", url: ROUTES.CHAUFFEURS, icon: IconSteeringWheel, roles: ["admin", "user", "chauffeur"] },
  { title: "Véhicules", url: ROUTES.VEHICULES, icon: IconTruck, roles: ["admin", "user", "chauffeur"] },
  { title: "Affectations", url: ROUTES.AFFECTATIONS, icon: IconArrowsExchange, roles: ["admin", "user"] },
  { title: "Maintenance", url: ROUTES.MAINTENANCES, icon: IconTools, roles: ["admin", "user"] },
  { title: "Carnets", url: ROUTES.CARNETS, icon: IconBook, roles: ["admin", "user", "chauffeur"] },
  { title: "Entretiens", url: ROUTES.ENTRETIENS, icon: IconTools, roles: ["admin", "user", "chauffeur"] },
  { title: "Pannes", url: ROUTES.PANNES, icon: IconAlertTriangle, roles: ["admin", "user", "chauffeur"] },
];

type MenuStyle = "floating" | "fixed" | "fullWidth";

export function MenuHorizontal({ style }: { style: MenuStyle }) {
  const { user } = useAuthentification();
  const { pathname } = useLocation();

  if (!user) return null;

  const role = user.role || "user";
  const filtered = navItems.filter((item) => item.roles.includes(role));
  const name = `${user.nom ?? ""} ${user.prenom ?? ""}`.trim();
  const initials = `${user.prenom?.charAt(0) ?? ""}${user.nom?.charAt(0) ?? ""}`;

  const containerClass =
    style === "floating"
      ? "max-w-5xl mx-auto mt-4 rounded-xl border shadow-lg"
      : style === "fixed"
        ? "fixed top-0 left-0 right-0 z-50 border-b shadow-sm"
        : "w-full border-b shadow-sm";

  const innerClass =
    style === "fullWidth"
      ? "max-w-7xl mx-auto"
      : "";

  return (
    <nav className={`bg-background/95 backdrop-blur-sm ${containerClass}`}>
      <div className={`flex items-center gap-1 px-4 h-14 ${innerClass}`}>
        <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2 mr-4 shrink-0">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 rounded-lg" />
          <span className="font-bold text-base hidden sm:inline">STS Béja</span>
        </Link>

        <div className="flex items-center gap-1 flex-1 overflow-x-auto">
          {filtered.map((item) => {
            const isActive = pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url));
            return (
              <Link
                key={item.title}
                to={item.url}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <item.icon className="size-4" />
                <span className="hidden md:inline">{item.title}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-2">
          <Link to={ROUTES.PARAMETRES}>
            <Button variant="ghost" size="icon" className="size-8">
              <IconSettings className="size-4" />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 rounded-full">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="" alt={name} />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {initials || "?"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col">
                  <span className="font-medium">{name || "Utilisateur"}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link to={ROUTES.PROFILE} className="cursor-pointer">Profil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={ROUTES.PARAMETRES} className="cursor-pointer">Paramètres</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <div className="px-2 py-1">
                <BasculeMode />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
