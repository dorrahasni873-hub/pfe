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

import type { Entretien } from "@/@types/types";
import { useEntretien } from "@/hooks/useEntretien";
import EntretienForm from "./entretienForm";
interface EntretienActionsMenuProps {
  row: {
    original: Entretien;
  };
}

const EntretienActionsMenu = ({ row }: EntretienActionsMenuProps) => {
  const { deleteEntretien } = useEntretien();

  const onDelete = async (id: string) => {
    const res = await deleteEntretien(id);
    if (res) toast("Entretien supprimé avec succès");
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
            <DialogTitle>Modifier entretien</DialogTitle>
          </DialogHeader>

          <EntretienForm entretien={row.original} />
        </DialogContent>
      </Dialog>

      <Button
        variant="destructive"
        size="icon"
        onClick={() => onDelete(row.original.id_entretien)}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default EntretienActionsMenu;
