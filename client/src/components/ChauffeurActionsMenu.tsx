import { Button } from "./ui/button";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Pencil, Trash } from "lucide-react";
import ChauffeurForm from "./ChauffeurForm";
import type { Chauffeur } from "@/@types/types";

interface ChauffeurActionsMenuProps {
  row: {
    original: Chauffeur;
  };
}

const ChauffeurActionsMenu = ({ row }: ChauffeurActionsMenuProps) => {
  const { deleteUser } = useUser();

  const onDelete = async (id: string) => {
    const res = await deleteUser(id);
    if (res) toast("utilisateur supprimé avec succès");
  };

  return (
    <div className="flex gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier un Utilisateur</DialogTitle>
          </DialogHeader>
          <ChauffeurForm chauffeur={row.original} />
        </DialogContent>
      </Dialog>

      <Button
        variant="destructive"
        size={"icon"}
        onClick={() => onDelete(row.original.id || "")}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default ChauffeurActionsMenu;
