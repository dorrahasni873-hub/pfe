import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Pencil, Trash } from "lucide-react";
import { useAuthentification } from "@/features/auth/hooks/useAuth";

type Props = {
  onDelete: () => Promise<boolean | undefined>;
  editLabel?: string;
  children: React.ReactNode;
  adminOnly?: boolean;
};

export function ActionsLigne({ onDelete, editLabel = "Modifier", children, adminOnly = false }: Props) {
  const { user } = useAuthentification();

  if (adminOnly && user?.role !== "admin") return null;

  const handleDelete = async () => {
    const res = await onDelete();
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

      <Button
        variant="ghost"
        size="icon"
        className="size-8 text-muted-foreground hover:text-destructive"
        onClick={handleDelete}
      >
        <Trash className="size-4" />
      </Button>
    </div>
  );
}
