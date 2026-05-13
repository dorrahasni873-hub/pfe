import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";
import { TableauDonnees } from "@/shared/components/TableauDonnees/TableauDonnees";
import { DialogueCreer } from "@/shared/components/DialogueCreer/DialogueCreer";
import ChauffeurActionsMenu from "./DriverActionsMenu";
import ChauffeurForm from "./DriverForm";
import type { Chauffeur } from "@/features/drivers/types";
import { IconSteeringWheel } from "@tabler/icons-react";
import { useDrivers } from "@/features/drivers/hooks/useDrivers";

export const columns: ColumnDef<Chauffeur>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)} />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} />,
  },
  { accessorKey: "nom", header: "Nom", cell: ({ row }) => <span className="font-medium">{row.original.nom}</span> },
  { accessorKey: "prenom", header: "Prénom" },
  { accessorKey: "cin", header: "CIN", cell: ({ row }) => <Badge variant="outline">{row.original.cin}</Badge> },
  { accessorKey: "email", header: "Email", cell: ({ row }) => <Badge variant="outline" className="text-muted-foreground">{row.original.email}</Badge> },
  { accessorKey: "numeroPermis", header: "Permis", cell: ({ row }) => <Badge variant="outline">{row.original.numeroPermis}</Badge> },
  { accessorKey: "tel", header: "Téléphone", cell: ({ row }) => <Badge variant="outline">{row.original.tel}</Badge> },
  { id: "actions", cell: ({ row }) => <ChauffeurActionsMenu row={row} /> },
];

export function ChauffeurDataTable({ data }: { data: Chauffeur[] }) {
  const { remove } = useDrivers();
  return (
    <TableauDonnees
      data={data}
      columns={columns}
      getRowId={(row) => row.id_chauffeur}
      title="Chauffeurs"
      icon={IconSteeringWheel}
      emptyMessage="Aucun chauffeur enregistré"
      createButton={<DialogueCreer label="Créer Chauffeur" adminOnly><ChauffeurForm /></DialogueCreer>}
      onDeleteSelected={async (ids) => { for (const id of ids) await remove(id); }}
    />
  );
}
