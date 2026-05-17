import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";
import { TableauDonnees } from "@/shared/components/TableauDonnees/TableauDonnees";
import { DialogueCreer } from "@/shared/components/DialogueCreer/DialogueCreer";
import VehiculeActionsMenu from "./VehicleActionsMenu";
import VehiculeForm from "./VehicleForm";
import type { Vehicule } from "@/features/vehicles/types";
import { format } from "date-fns";

export const columns: ColumnDef<Vehicule>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)} />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} />,
  },
  { accessorKey: "matricule", header: "Matricule", cell: ({ row }) => <span className="font-medium">{row.original.matricule}</span> },
  { accessorKey: "marque", header: "Marque" },
  { accessorKey: "dateCirculation", header: "Mise en circulation", cell: ({ row }) => <span className="text-sm text-muted-foreground">{format(row.original.dateCirculation, "dd/MM/yyyy")}</span> },
  { accessorKey: "dateVisite", header: "Visite technique", cell: ({ row }) => <span className="text-sm text-muted-foreground">{format(row.original.dateVisite, "dd/MM/yyyy")}</span> },
  { accessorKey: "dateTaxe", header: "Taxe", cell: ({ row }) => <span className="text-sm text-muted-foreground">{format(row.original.dateTaxe, "dd/MM/yyyy")}</span> },
  { accessorKey: "etat", header: "État", cell: ({ row }) => {
    const colors: Record<string, string> = { disponible: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300", en_service: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", en_panne: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" };
    return <Badge className={colors[row.original.etat] || ""}>{row.original.etat}</Badge>;
  }},
  { id: "actions", cell: ({ row }) => <VehiculeActionsMenu row={row} /> },
];

import { IconTruck } from "@tabler/icons-react";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";

export function VehiculeDataTable({ data, loading, onRefresh }: { data: Vehicule[]; loading?: boolean; onRefresh?: () => Promise<void> }) {
  const { remove } = useVehicles();
  return (
    <TableauDonnees
      data={data}
      columns={columns}
      getRowId={(row) => row.matricule}
      title="Véhicules"
      icon={IconTruck}
      loading={loading}
      onRefresh={onRefresh}
      emptyMessage="Aucun véhicule enregistré"
      createButton={<DialogueCreer label="Créer Véhicule" adminOnly><VehiculeForm /></DialogueCreer>}
      onDeleteSelected={async (ids) => { for (const id of ids) await remove(id); }}
      filters={[
        { columnId: "etat", label: "État", placeholder: "Tous les états", options: [
          { label: "Disponible", value: "disponible" },
          { label: "En service", value: "en_service" },
          { label: "En panne", value: "en_panne" },
        ]},
      ]}
    />
  );
}
