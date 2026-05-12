import { type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

export function NavPrincipale({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-1">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url));

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={isActive}
                  className={`
                    group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium
                    transition-all duration-200
                    hover:bg-accent hover:text-accent-foreground
                    data-[active=true]:bg-accent data-[active=true]:text-accent-foreground
                  `}
                >
                  <Link to={item.url} className="flex w-full items-center gap-2">
                    {item.icon && (
                      <item.icon
                        className={`
                          h-4 w-4 shrink-0 transition-all duration-200
                          text-muted-foreground
                          group-hover:text-foreground group-hover:scale-110
                          data-[active=true]:text-foreground
                        `}
                      />
                    )}
                    <span className="truncate">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
