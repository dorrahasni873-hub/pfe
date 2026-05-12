import type { User } from "@/shared/types/types";
import { useUtilisateur } from "@/features/users/hooks/useUsers";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import UserForm from "./UserForm";

type Props = { row: { original: User } };

const UserActionsMenu = ({ row }: Props) => {
  const { deleteUser } = useUtilisateur();
  return (
    <ActionsLigne onDelete={() => deleteUser(row.original.id_utilisateur)} editLabel="Modifier l'utilisateur">
      <UserForm user={row.original} />
    </ActionsLigne>
  );
};

export default UserActionsMenu;
