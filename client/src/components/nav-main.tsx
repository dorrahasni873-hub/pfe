import { type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-1">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition hover:bg-muted data-[active=true]:bg-muted"
              >
                <Link to={item.url} className="flex w-full items-center gap-2">
                  {/* Icon */}
                  {item.icon && (
                    <item.icon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground transition" />
                  )}

                  {/* Label */}
                  <span className="truncate">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}