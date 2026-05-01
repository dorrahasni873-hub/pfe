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

import type { Panne } from "@/@types/types";
import { usePanne } from "@/hooks/usePanne";
import PanneForm from "./panneForm";

interface PanneActionsMenuProps {
  row: {
    original: Panne;
  };
}

const PanneActionsMenu = ({ row }: PanneActionsMenuProps) => {
  const { deletePanne } = usePanne();

  const onDelete = async (id: string) => {
    const res = await deletePanne(id);
    if (res) toast("Panne supprimée avec succès");
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
            <DialogTitle>Modifier une panne</DialogTitle>
          </DialogHeader>

          <PanneForm panne={row.original} />
        </DialogContent>
      </Dialog>

      <Button
        variant="destructive"
        size="icon"
        onClick={() => onDelete(row.original.id_panne)}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default PanneActionsMenu;
