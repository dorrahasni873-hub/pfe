import * as React from "react";
import { useEffect, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";
import { TableauDonnees } from "@/shared/components/TableauDonnees/TableauDonnees";
import { DialogueCreer } from "@/shared/components/DialogueCreer/DialogueCreer";
import AffectationActionsMenu from "./AssignmentActionsMenu";
import AffectationForm from "./AssignmentForm";
import type { Affectation } from "@/features/assignments/types";
import type { Chauffeur } from "@/features/drivers/types";
import { driverService } from "@/features/drivers/api/driverService";
import { IconArrowsExchange } from "@tabler/icons-react";
import { useAssignments } from "@/features/assignments/hooks/useAssignments";
import { format } from "date-fns";

function useChauffeurMap() {
  const [map, setMap] = useState<Record<string, string>>({});
  useEffect(() => {
    driverService.getAll().then((data) => {
      const m: Record<string, string> = {};
      (data || []).forEach((c: Chauffeur) => { m[c.id_chauffeur] = `${c.nom} ${c.prenom}`; });
      setMap(m);
    });
  }, []);
  return map;
}

export function AffectationDataTable({ data, loading, onRefresh }: { data: Affectation[]; loading?: boolean; onRefresh?: () => Promise<void> }) {
  const chauffeurMap = useChauffeurMap();
  const { remove } = useAssignments();

  const columns: ColumnDef<Affectation>[] = [
    { id: "select", header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)} />, cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} /> },
    { accessorKey: "matricule", header: "Matricule", cell: ({ row }) => <span className="font-medium">{row.original.matricule}</span> },
    { id: "chauffeur", header: "Chauffeur", cell: ({ row }) => chauffeurMap[row.original.id_chauffeur] || row.original.id_chauffeur },
    { accessorKey: "dateAffectation", header: "Date affectation", cell: ({ row }) => <span className="text-sm text-muted-foreground">{format(row.original.dateAffectation, "dd/MM/yyyy")}</span> },
    { accessorKey: "dateDebut", header: "Date début", cell: ({ row }) => <span className="text-sm text-muted-foreground">{format(row.original.dateDebut, "dd/MM/yyyy")}</span> },
    { accessorKey: "etat", header: "État", cell: ({ row }) => {
      const colors: Record<string, string> = { active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300", terminee: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300" };
      return <Badge className={colors[row.original.etat] || ""}>{row.original.etat}</Badge>;
    }},
    { accessorKey: "typeAffectation", header: "Type", cell: ({ row }) => <Badge variant="outline">{row.original.typeAffectation}</Badge> },
    { id: "actions", cell: ({ row }) => <AffectationActionsMenu row={row} /> },
  ];

  return (
    <TableauDonnees
      data={data}
      columns={columns}
      getRowId={(row) => row.id_affectation}
      title="Affectations"
      icon={IconArrowsExchange}
      loading={loading}
      onRefresh={onRefresh}
      emptyMessage="Aucune affectation enregistrée"
      createButton={<DialogueCreer label="Créer Affectation"><AffectationForm /></DialogueCreer>}
      onDeleteSelected={async (ids) => { for (const id of ids) await remove(id); }}
      filters={[
        { columnId: "etat", label: "État", placeholder: "Tous les états", options: [
          { label: "Active", value: "active" }, { label: "Terminée", value: "terminee" },
        ]},
        { columnId: "typeAffectation", label: "Type", placeholder: "Tous les types", options: [
          { label: "Permanente", value: "permanente" }, { label: "Temporaire", value: "temporaire" },
          { label: "Remplacement", value: "remplacement" }, { label: "Occasionnelle", value: "occasionnelle" },
        ]},
      ]}
    />
  );
}
