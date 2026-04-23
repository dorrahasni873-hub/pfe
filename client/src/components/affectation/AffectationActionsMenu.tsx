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

import type { Affectation } from "@/@types/types";
import AffectationForm from "./AffectationForm";
import { useAffectation } from "@/hooks/useAffectations";
interface AffectationActionsMenuProps {
  row: {
    original: Affectation;
  };
}

const AffectationActionsMenu = ({ row }: AffectationActionsMenuProps) => {
  const { deleteAffectation } = useAffectation();

  const onDelete = async (id: string) => {
    const res = await deleteAffectation(id);
    if (res) toast("Affectation supprimée avec succès");
  };

  return (
    <div className="flex gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier une affectation</DialogTitle>
          </DialogHeader>

          <AffectationForm affectation={row.original} />
        </DialogContent>
      </Dialog>

      <Button
        variant="outline"
        size="icon"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(row.original.id_affectation || "");
        }}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default AffectationActionsMenu;
