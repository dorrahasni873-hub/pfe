import type { User } from "@/features/users/types";
import { useUsers } from "@/features/users/hooks/useUsers";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import UserForm from "./UserForm";

type Props = { row: { original: User } };

const UserActionsMenu = ({ row }: Props) => {
  const { remove } = useUsers();
  return (
    <ActionsLigne onDelete={() => remove(row.original.id_utilisateur)} editLabel="Modifier l'utilisateur">
      <UserForm user={row.original} />
    </ActionsLigne>
  );
};

export default UserActionsMenu;
