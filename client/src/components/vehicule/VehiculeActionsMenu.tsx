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
import { useAuth } from "@/hooks/useAuth";

interface VehiculeActionsMenuProps {
  row: {
    original: Vehicule;
  };
}

const VehiculeActionsMenu = ({ row }: VehiculeActionsMenuProps) => {
  const { user } = useAuth();

  const { deleteVehicule } = useVehicule();

  const onDelete = async (id: string) => {
    const res = await deleteVehicule(id);
    if (res) toast("véhicule supprimé avec succès");
  };
  console.log("User:", user);

  if (user?.role !== "admin") return null;

  return (
    <div className="flex gap-3">
      <Dialog>
        <DialogTrigger asChild>
          {user.role === "admin" && (
            <Button variant="outline" size="icon">
              <Pencil />
            </Button>
          )}
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
