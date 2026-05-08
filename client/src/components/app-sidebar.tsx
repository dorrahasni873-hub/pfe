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
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

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
  const { user } = useAuth();
  const [query, setQuery] = React.useState("");

  console.log("User", user);

  if (!user) {
    return null;
  }

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
              <Link to="/" className="flex items-center gap-3">
                {/* Logo */}
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-15 w-15 rounded-full object-cover"
                />

                {/* Text block */}
                <div className="flex flex-col leading-tight">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-semibold">STS Béja</span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-11">
        <NavMain items={filteredNavMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
        <div className="p-2">
          <div className="flex items-center gap-2 border rounded-md px-2">
            <IconSearch size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full bg-transparent outline-none text-sm p-1"
            />
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
