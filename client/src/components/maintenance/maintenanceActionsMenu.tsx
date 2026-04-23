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
import type { Maintenance } from "@/@types/types";
import { useMaintenance } from "@/hooks/useMaintenance";
import MaintenanceForm from "./maintenanceForm";

interface MaintenanceActionsMenuProps {
  row: {
    original: Maintenance;
  };
}

const MaintenanceActionsMenu = ({ row }: MaintenanceActionsMenuProps) => {
  const { deleteMaintenance } = useMaintenance();

  const onDelete = async (id: string) => {
    const res = await deleteMaintenance(id);
    if (res) toast("Maintenance supprimée avec succès");
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
            <DialogTitle>Modifier une maintenance</DialogTitle>
          </DialogHeader>

          <MaintenanceForm maintenance={row.original} />
        </DialogContent>
      </Dialog>

      <Button
        variant="destructive"
        size="icon"
        onClick={() => onDelete(row.original.id_maintenance || "")}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default MaintenanceActionsMenu;
