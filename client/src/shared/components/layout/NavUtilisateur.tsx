import {
  IconDotsVertical,
  IconUserCircle,
  IconLogout,
  IconTrash,
  IconSettings,
  IconSun,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import { ROUTES } from "@/routes";
import { BasculeMode } from "./BasculeMode";
import { useAuthentification } from "@/features/auth/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export function NavUtilisateur({
  user,
}: {
  user: {
    nom: string;
    prenom: string;
    email: string;
  };
}) {
  const { logout } = useAuthentification();
  const { isMobile } = useSidebar();

  const name = `${user.nom ?? ""} ${user.prenom ?? ""}`.trim();
  const email = user.email ?? "";
  const initials = `${user.prenom?.charAt(0) ?? ""}${user.nom?.charAt(0) ?? ""}`;

  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground transition-all duration-200"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="" alt={name} />
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                  {initials || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{name || "Utilisateur"}</span>
                <span className="truncate text-xs text-muted-foreground">{email}</span>
              </div>
              <IconDotsVertical className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl border shadow-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-2 py-2">
                <Avatar className="h-10 w-10 rounded-lg">
                  <AvatarImage src="" alt={name} />
                  <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-sm font-semibold">
                    {initials || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name || "Utilisateur"}</span>
                  <span className="truncate text-xs text-muted-foreground">{email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="cursor-pointer gap-3">
                <Link to={ROUTES.PROFILE} className="flex items-center gap-3">
                  <IconUserCircle className="h-4 w-4" />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer gap-3">
                <Link to={ROUTES.PARAMETRES} className="flex items-center gap-3">
                  <IconSettings className="h-4 w-4" />
                  <span>Paramètres</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer gap-3">
                <span className="flex items-center gap-3">
                  <IconSun className="h-4 w-4" />
                  <BasculeMode />
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={onLogout}
              className="cursor-pointer gap-3 text-destructive focus:text-destructive"
            >
              <IconLogout className="h-4 w-4" />
              <span>Se déconnecter</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer gap-3 text-muted-foreground focus:text-destructive">
              <IconTrash className="h-4 w-4" />
              <span>Supprimer le compte</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
