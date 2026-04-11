import * as React from "react";
import {
  IconDashboard,
  IconInnerShadowTop,
  IconListDetails,
  IconSearch,
  IconSettings,
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
    },
    {
      title: "Utilisateurs",
      url: "/utilisateurs",
      icon: IconListDetails,
    },
    {
      title: "Chauffeurs",
      url: "/chauffeurs",
      icon: IconListDetails,
    },
    {
      title: "Véhicules",
      url: "/vehicules",
      icon: IconListDetails,
    },
    {
      title: "Affectations",
      url: "/affectations",
      icon: IconListDetails,
    },
    {
      title: "Maintenance",
      url: "/maintenance",
      icon: IconListDetails,
    },
  ],
  navSecondary: [
    {
      title: "Paramètres",
      url: "#",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const [query, setQuery] = React.useState("");

  const filteredNavMain = data.navMain.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );

  if (!user) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/" className="flex items-center gap-2">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">STS Béja.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
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
