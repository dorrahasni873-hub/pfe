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
import type { Vehicule } from "@/@types/types";
import VehiculeForm from "./VehiculeForm";
import { useVehicule } from "@/hooks/useVehicule";

interface VehiculeActionsMenuProps {
  row: {
    original: Vehicule;
  };
}

const VehiculeActionsMenu = ({ row }: VehiculeActionsMenuProps) => {
  const { deleteVehicule } = useVehicule();

  const onDelete = async (id: string) => {
    const res = await deleteVehicule(id);
    if (res) toast("véhicule supprimé avec succès");
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
            <DialogTitle>Modifier un Véhicule</DialogTitle>
          </DialogHeader>
          <VehiculeForm vehicule={row.original} />
        </DialogContent>
      </Dialog>

      <Button
        variant="destructive"
        size={"icon"}
        onClick={() => onDelete(row.original.matricule || "")}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default VehiculeActionsMenu;
