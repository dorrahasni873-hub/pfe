import {
  IconDotsVertical,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function NavUser({
  user,
}: {
  user: {
    nom: string;
    prenom: string;
    email: string;
  };
}) {
  const { logout } = useAuth();
  const { isMobile } = useSidebar();

  const name = `${user.nom ?? ""} ${user.prenom ?? ""}`.trim();
  const email = user.email ?? "";
  const avatar = "";

  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="rounded-lg">
                  {name?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="rounded-lg">
                    {name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={"Toggle Dark/Light Mode"}>
                <span className="cursor-pointer w-full text-left">
                  <ModeToggle />
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                className="flex flex-col gap-3 w-full cursor-pointer"
                variant="outline"
                onClick={onLogout}
              >
                <span className="text-sm">se déconnecter</span>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                className="flex flex-col gap-3 w-full cursor-pointer"
                variant="destructive"
              >
                <span className="text-sm">Supprimer le compte</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
