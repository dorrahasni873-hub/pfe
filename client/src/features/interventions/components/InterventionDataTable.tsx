import * as React from "react";
import { useEffect, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";
import { TableauDonnees } from "@/shared/components/TableauDonnees/TableauDonnees";
import { DialogueCreer } from "@/shared/components/DialogueCreer/DialogueCreer";
import EntretienActionsMenu from "./InterventionActionsMenu";
import EntretienForm from "./InterventionForm";
import type { Entretien } from "@/features/interventions/types";
import { IconTools } from "@tabler/icons-react";
import { useInterventions } from "@/features/interventions/hooks/useInterventions";

const typeColors: Record<string, string> = { préventive: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", corrective: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" };
const etatColors: Record<string, string> = { en_attente: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300", en_cours: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", terminé: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" };

export function EntretienDataTable({ data }: { data: Entretien[] }) {
  const { remove: deleteEntretien } = useInterventions();
  const columns: ColumnDef<Entretien>[] = [
    { id: "select", header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)} />, cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} /> },
    { accessorKey: "dateEntretien", header: "Date", cell: ({ row }) => <Badge variant="outline">{row.original.dateEntretien}</Badge> },
    { accessorKey: "typeIntervention", header: "Type", cell: ({ row }) => <Badge className={typeColors[row.original.typeIntervention] || ""}>{row.original.typeIntervention}</Badge> },
    { accessorKey: "descriptionIntervention", header: "Description", cell: ({ row }) => <span className="max-w-[250px] truncate block">{row.original.descriptionIntervention}</span> },
    { accessorKey: "etat", header: "État", cell: ({ row }) => <Badge className={etatColors[row.original.etat] || ""}>{row.original.etat}</Badge> },
    { accessorKey: "matricule", header: "Véhicule" },
    { accessorKey: "maintenanceId", header: "Maintenance" },
    { accessorKey: "panneId", header: "Panne" },
    { id: "actions", cell: ({ row }) => <EntretienActionsMenu row={row} /> },
  ];

  return (
    <TableauDonnees
      data={data}
      columns={columns}
      getRowId={(row) => row.id_entretien}
      title="Entretiens"
      icon={IconTools}
      emptyMessage="Aucun entretien enregistré"
      createButton={<DialogueCreer label="Planifier un entretien"><EntretienForm /></DialogueCreer>}
      onDeleteSelected={async (ids) => { for (const id of ids) await deleteEntretien(id); }}
      filters={[
        { columnId: "typeIntervention", label: "Type", placeholder: "Tous les types", options: [
          { label: "Préventive", value: "préventive" }, { label: "Corrective", value: "corrective" },
        ]},
        { columnId: "etat", label: "État", placeholder: "Tous les états", options: [
          { label: "En attente", value: "en_attente" }, { label: "En cours", value: "en_cours" }, { label: "Terminé", value: "terminé" },
        ]},
      ]}
    />
  );
}
