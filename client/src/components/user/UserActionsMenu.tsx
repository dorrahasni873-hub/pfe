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

import type { User } from "@/@types/types";
import { useUser } from "@/hooks/useUser";

import UserForm from "./UserForm";
interface Props {
  row: {
    original: User;
  };
}

const UserActionsMenu = ({ row }: Props) => {
  const { deleteUser } = useUser();

  const onDelete = async (id: string) => {
    const res = await deleteUser(id);
    if (res) toast("Utilisateur supprimé avec succès");
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
            <DialogTitle>Modifier utilisateur</DialogTitle>
          </DialogHeader>

          <UserForm user={row.original} />
        </DialogContent>
      </Dialog>

      <Button
        variant="destructive"
        size="icon"
        onClick={() => onDelete(row.original.id_utilisateur)}
      >
        <Trash />
      </Button>
    </div>
  );
};

export default UserActionsMenu;
