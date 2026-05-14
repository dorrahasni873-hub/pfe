import * as React from "react";
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
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { ROUTES } from "@/routes";
import { NavPrincipale } from "@/shared/components/layout/NavPrincipale";
import { NavSecondaire } from "@/shared/components/layout/NavSecondaire";
import { NavUtilisateur } from "@/shared/components/layout/NavUtilisateur";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useAuthentification } from "@/features/auth/hooks/useAuth";

const data = {
  navMain: [
    {
      title: "Tableau de bord",
      url: ROUTES.DASHBOARD,
      icon: IconDashboard,
      roles: ["admin", "chauffeur", "user"],
    },
    {
      title: "Utilisateurs",
      url: ROUTES.UTILISATEURS,
      icon: IconUsers,
      roles: ["admin", "user"],
    },
    {
      title: "Chauffeurs",
      url: ROUTES.CHAUFFEURS,
      icon: IconSteeringWheel,
      roles: ["admin", "user", "chauffeur"],
    },
    {
      title: "Véhicules",
      url: ROUTES.VEHICULES,
      icon: IconTruck,
      roles: ["admin", "user", "chauffeur"],
    },
    {
      title: "Affectations",
      url: ROUTES.AFFECTATIONS,
      icon: IconArrowsExchange,
      roles: ["admin", "user"],
    },
    {
      title: "Maintenance",
      url: ROUTES.MAINTENANCES,
      icon: IconTools,
      roles: ["admin", "user"],
    },
    {
      title: "Carnets de Bord",
      url: ROUTES.CARNETS,
      icon: IconBook,
      roles: ["admin", "user", "chauffeur"],
    },
    {
      title: "Entretiens",
      url: ROUTES.ENTRETIENS,
      icon: IconTools,
      roles: ["admin", "user", "chauffeur"],
    },
    {
      title: "Pannes",
      url: ROUTES.PANNES,
      icon: IconAlertTriangle,
      roles: ["admin", "user", "chauffeur"],
    },
  ],
  navSecondary: [
    {
      title: "Paramètres",
      url: ROUTES.PARAMETRES,
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthentification();
  const { state: sidebarState } = useSidebar();
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setQuery("");
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  if (!user) return null;

  const role = user.role || "user";
  const filteredNavMain = data.navMain
    .filter((item) => item.roles.includes(role))
    .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));

  const isCollapsed = sidebarState === "collapsed";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-sidebar-border/40 pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to={ROUTES.DASHBOARD} className="flex items-center gap-3 group">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-xl bg-linear-to-br from-primary/30 to-primary/5 blur-md group-hover:blur-lg transition-all duration-300" />
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="relative h-12 w-12 rounded-xl object-cover ring-2 ring-sidebar-ring group-hover:ring-primary/60 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="text-base font-bold tracking-tight text-sidebar-foreground">
                    STS Béja
                  </span>
                  <span className="text-[11px] font-medium text-sidebar-foreground/50 tracking-wide uppercase">
                    Gestion de Parc
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="pt-6">
        <NavPrincipale items={filteredNavMain} />
        {filteredNavMain.length === 0 && query && (
          <div className="px-3 py-6 text-center">
            <IconSearch className="mx-auto size-6 text-muted-foreground/40 mb-2" />
            <p className="text-xs text-muted-foreground">Aucun résultat pour "{query}"</p>
          </div>
        )}
        <NavSecondaire items={data.navSecondary} className="mt-auto" />
        {!isCollapsed && (
          <div className="px-3 py-2 group/search">
            <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 transition-all duration-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
              <IconSearch size={16} className="shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                  className="shrink-0 text-muted-foreground/50 hover:text-foreground transition-colors"
                >
                  <IconX size={14} />
                </button>
              )}
            </div>
            <kbd className="mt-1 ml-auto text-[10px] text-muted-foreground/40 text-right block group-focus-within/search:hidden">
              /
            </kbd>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavUtilisateur user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
