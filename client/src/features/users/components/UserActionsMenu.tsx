import type { User } from "@/features/users/types";
import { useUsers } from "@/features/users/hooks/useUsers";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import { openPrintFiche } from "@/shared/components/FicheImpression/FicheImpression";
import UserForm from "./UserForm";

type Props = { row: { original: User } };

const UserActionsMenu = ({ row }: Props) => {
  const { remove } = useUsers();
  const u = row.original;
  return (
    <ActionsLigne
      onDelete={() => remove(u.id_utilisateur)}
      editLabel="Modifier l'utilisateur"
      onPrint={() =>
        openPrintFiche({
          title: `${u.prenom} ${u.nom}`,
          subtitle: "Utilisateur",
          sections: [
            [
              { label: "Nom", value: u.nom },
              { label: "Prénom", value: u.prenom },
            ],
            [
              { label: "Email", value: u.email },
              { label: "Tél", value: u.tel },
            ],
            [
              { label: "Rôle", value: u.role },
            ],
          ],
        })
      }
    >
      <UserForm user={u} />
    </ActionsLigne>
  );
};

export default UserActionsMenu;
