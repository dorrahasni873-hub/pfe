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

import type { CarnetDeBord } from "@/@types/types";
import { useCarnetDeBord } from "@/hooks/useCarnetDeBord";
import CarnetDeBordForm from "./carnetDeBordForm";

interface Props {
  row: {
    original: CarnetDeBord;
  };
}

const CarnetDeBordActionsMenu = ({ row }: Props) => {
  const { deleteCarnet } = useCarnetDeBord();

  const onDelete = async (id: string) => {
    const res = await deleteCarnet(id);
    if (res) toast("Carnet supprimé avec succès");
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
            <DialogTitle>Modifier Carnet</DialogTitle>
          </DialogHeader>

          <CarnetDeBordForm carnet={row.original} />
        </DialogContent>
      </Dialog>

      <Button
        variant="destructive"
        size="icon"
        onClick={() => {
          console.log("done");
          onDelete(row.original.id_carnet);
        }}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default CarnetDeBordActionsMenu;
