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
  IconSearch,
} from "@tabler/icons-react";
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
} from "@/shared/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useAuthentification } from "@/features/auth/hooks/useAuth";

const data = {
  navMain: [
    {
      title: "Tableau de bord",
      url: "/",
      icon: IconDashboard,
      roles: ["admin", "chauffeur", "user"],
    },
    {
      title: "Utilisateurs",
      url: "/utilisateurs",
      icon: IconUsers,
      roles: ["admin", "user"],
    },
    {
      title: "Chauffeurs",
      url: "/chauffeurs",
      icon: IconSteeringWheel,
      roles: ["admin", "user", "chauffeur"],
    },
    {
      title: "Véhicules",
      url: "/vehicules",
      icon: IconTruck,
      roles: ["admin", "user", "chauffeur"],
    },
    {
      title: "Affectations",
      url: "/affectations",
      icon: IconArrowsExchange,
      roles: ["admin", "user"],
    },
    {
      title: "Maintenance",
      url: "/maintenances",
      icon: IconTools,
      roles: ["admin", "user"],
    },
    {
      title: "Carnets de Bord",
      url: "/carnets",
      icon: IconBook,
      roles: ["admin", "user", "chauffeur"],
    },
    {
      title: "Entretiens",
      url: "/entretiens",
      icon: IconTools,
      roles: ["admin", "user", "chauffeur"],
    },
    {
      title: "Pannes",
      url: "/pannes",
      icon: IconAlertTriangle,
      roles: ["admin", "user", "chauffeur"],
    },
  ],
  navSecondary: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthentification();
  const [query, setQuery] = React.useState("");

  if (!user) return null;

  const filteredNavMain = data.navMain
    .filter((item) => user.role && item.roles.includes(user.role))
    .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-xl bg-linear-to-br from-primary/40 to-primary/5 blur-sm group-hover:blur-md transition-all duration-300" />
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="relative h-14 w-14 rounded-xl object-cover ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="text-lg font-bold tracking-tight">
                    STS Béja
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="pt-6">
        <NavPrincipale items={filteredNavMain} />
        <NavSecondaire items={data.navSecondary} className="mt-auto" />
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 transition-all duration-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
            <IconSearch size={16} className="shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter>
        <NavUtilisateur user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
