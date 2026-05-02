import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Pencil, Trash } from "lucide-react";
import type { Chauffeur } from "@/@types/types";
import { useChauffeur } from "@/hooks/useChauffeur";
import ChauffeurForm from "./ChauffeurForm";
import { useAuth } from "@/hooks/useAuth";

interface ChauffeurActionsMenuProps {
  row: {
    original: Chauffeur;
  };
}

const ChauffeurActionsMenu = ({ row }: ChauffeurActionsMenuProps) => {
  const { deleteChauffeur } = useChauffeur();
  const { user } = useAuth();
  const onDelete = async (id: string) => {
    const res = await deleteChauffeur(id);
    if (res) toast("utilisateur supprimé avec succès");
  };
  if (user?.role !== "admin") return null;
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
        onClick={() => onDelete(row.original.id_chauffeur || "")}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default ChauffeurActionsMenu;
