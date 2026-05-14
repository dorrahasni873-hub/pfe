import { useState } from "react";
import {
  IconDotsVertical,
  IconUserCircle,
  IconLogout,
  IconTrash,
  IconSettings,
  IconAlertTriangle,
  IconEye,
  IconEyeOff,
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
import { authService } from "@/features/auth/api/authService";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const name = `${user.nom ?? ""} ${user.prenom ?? ""}`.trim();
  const email = user.email ?? "";
  const initials = `${user.prenom?.charAt(0) ?? ""}${user.nom?.charAt(0) ?? ""}`;

  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const onDeleteAccount = async () => {
    if (!deletePassword) {
      setDeleteError("Veuillez entrer votre mot de passe");
      return;
    }
    setDeleteError(null);
    setDeleting(true);
    try {
      await authService.deleteAccount(deletePassword);
      logout();
      navigate(ROUTES.LOGIN, { replace: true });
    } catch {
      setDeleteError("Mot de passe incorrect");
      setDeleting(false);
    }
  };

  const onDeleteDialogOpenChange = (open: boolean) => {
    if (!open) {
      setDeletePassword("");
      setDeleteError(null);
    }
    setDeleteDialogOpen(open);
  };

  return (
    <>
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
              <DropdownMenuItem className="cursor-pointer">
                <BasculeMode />
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

            <DropdownMenuItem
              onClick={() => setDeleteDialogOpen(true)}
              className="cursor-pointer gap-3 text-muted-foreground focus:text-destructive"
            >
              <IconTrash className="h-4 w-4" />
              <span>Supprimer le compte</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>

      <Dialog open={deleteDialogOpen} onOpenChange={onDeleteDialogOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <IconAlertTriangle className="size-5 text-destructive" />
              Supprimer le compte
            </DialogTitle>
            <DialogDescription>
              Cette action est irréversible. Confirmez avec votre mot de passe.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label htmlFor="delete-password">Mot de passe</Label>
            <div className="relative">
              <Input
                id="delete-password"
                type={showDeletePassword ? "text" : "password"}
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowDeletePassword(!showDeletePassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showDeletePassword ? <IconEyeOff className="size-4" /> : <IconEye className="size-4" />}
              </button>
            </div>
            {deleteError && (
              <p className="text-xs text-destructive">{deleteError}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onDeleteDialogOpenChange(false)} disabled={deleting}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={onDeleteAccount} disabled={deleting}>
              {deleting ? "Suppression..." : "Supprimer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
