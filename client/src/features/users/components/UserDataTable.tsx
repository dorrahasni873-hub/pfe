import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";
import { TableauDonnees } from "@/shared/components/TableauDonnees/TableauDonnees";
import { DialogueCreer } from "@/shared/components/DialogueCreer/DialogueCreer";
import UserActionsMenu from "./UserActionsMenu";
import UserForm from "./UserForm";
import type { User } from "@/shared/types/types";
import { IconUsers } from "@tabler/icons-react";
import { useUtilisateur } from "@/features/users/hooks/useUsers";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)} />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} />,
  },
  { accessorKey: "nom", header: "Nom", cell: ({ row }) => <span className="font-medium">{row.original.nom}</span> },
  { accessorKey: "prenom", header: "Prénom" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Rôle", cell: ({ row }) => {
    const colors: Record<string, string> = { admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300", maintenance: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" };
    return <Badge className={colors[row.original.role] || ""}>{row.original.role}</Badge>;
  }},
  { accessorKey: "tel", header: "Téléphone" },
  { id: "actions", cell: ({ row }) => <UserActionsMenu row={row} /> },
];

export function UserDataTable({ data }: { data: User[] }) {
  const { deleteUser } = useUtilisateur();
  return (
    <TableauDonnees
      data={data}
      columns={columns}
      getRowId={(row) => row.id_utilisateur}
      title="Utilisateurs"
      icon={IconUsers}
      emptyMessage="Aucun utilisateur enregistré"
      createButton={<DialogueCreer label="Créer utilisateur"><UserForm /></DialogueCreer>}
      onDeleteSelected={async (ids) => { for (const id of ids) await deleteUser(id); }}
      filters={[
        { columnId: "role", label: "Rôle", placeholder: "Tous les rôles", options: [
          { label: "Admin", value: "admin" },
          { label: "Maintenance", value: "maintenance" },
        ]},
      ]}
    />
  );
}
