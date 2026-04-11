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
import UserForm from "./UserForm";
import { useUser } from "@/hooks/useUser";

interface UserActionsMenuProps {
  row: {
    original: User;
  };
}

const UserActionsMenu = ({ row }: UserActionsMenuProps) => {
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
          <UserForm user={row.original} />
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

export default UserActionsMenu;
