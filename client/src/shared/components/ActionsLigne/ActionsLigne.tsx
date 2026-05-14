import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Pencil, Trash, AlertTriangle, Printer } from "lucide-react";
import { useAuthentification } from "@/features/auth/hooks/useAuth";

type Props = {
  onDelete: () => Promise<boolean | undefined>;
  editLabel?: string;
  children: React.ReactNode;
  adminOnly?: boolean;
  onPrint?: () => void;
};

export function ActionsLigne({ onDelete, editLabel = "Modifier", children, adminOnly = false, onPrint }: Props) {
  const { user } = useAuthentification();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (adminOnly && user?.role !== "admin") return null;

  const handleDelete = async () => {
    setDeleting(true);
    const res = await onDelete();
    setDeleting(false);
    setDeleteDialogOpen(false);
    if (res) toast.success("Élément supprimé avec succès");
  };

  return (
    <div className="flex items-center gap-2" onPointerDown={(e) => e.stopPropagation()}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground">
            <Pencil className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editLabel}</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>

      {onPrint && (
        <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-foreground" onClick={onPrint}>
          <Printer className="size-4" />
        </Button>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="size-8 text-muted-foreground hover:text-destructive"
        onClick={() => setDeleteDialogOpen(true)}
      >
        <Trash className="size-4" />
      </Button>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-destructive" />
              Confirmer la suppression
            </DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={deleting}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Suppression..." : "Supprimer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
