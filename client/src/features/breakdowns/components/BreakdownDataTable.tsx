import * as React from "react";
import { useEffect, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";
import { TableauDonnees } from "@/shared/components/TableauDonnees/TableauDonnees";
import { DialogueCreer } from "@/shared/components/DialogueCreer/DialogueCreer";
import PanneActionsMenu from "./BreakdownActionsMenu";
import PanneForm from "./BreakdownForm";
import type { Panne } from "@/features/breakdowns/types";
import type { Chauffeur } from "@/features/drivers/types";
import type { Vehicule } from "@/features/vehicles/types";
import { useDrivers } from "@/features/drivers/hooks/useDrivers";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useBreakdowns } from "@/features/breakdowns/hooks/useBreakdowns";

const typeColors: Record<string, string> = { MECANIQUE: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300", ELECTRIQUE: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", HYDRAULIQUE: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300", CARROSSERIE: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300", PNEU: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300", FREIN: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300", MOTEUR: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" };

export function PanneDataTable({ data, loading, onRefresh }: { data: Panne[]; loading?: boolean; onRefresh?: () => Promise<void> }) {
  const [chauffeurMap, setChauffeurMap] = useState<Record<string, string>>({});
  const [vehiculeMap, setVehiculeMap] = useState<Record<string, string>>({});
  const { getAll: getChauffeurs } = useDrivers();
  const { getAll: getVehicules } = useVehicles();
  const { remove: deletePanne } = useBreakdowns();

  useEffect(() => {
    getChauffeurs().then((d) => { const m: Record<string, string> = {}; (d || []).forEach((c: Chauffeur) => { m[c.id_chauffeur] = `${c.nom} ${c.prenom}`; }); setChauffeurMap(m); });
    getVehicules().then((d) => { const m: Record<string, string> = {}; (d || []).forEach((v: Vehicule) => { m[v.matricule] = `${v.marque} (${v.matricule})`; }); setVehiculeMap(m); });
  }, []);

  const columns: ColumnDef<Panne>[] = [
    { id: "select", header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)} />, cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} /> },
    { accessorKey: "typePanne", header: "Type", cell: ({ row }) => <Badge className={typeColors[row.original.typePanne] || ""}>{row.original.typePanne}</Badge> },
    { accessorKey: "dateDeclaration", header: "Date déclaration", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.dateDeclaration}</span> },
    { accessorKey: "matricule", header: "Véhicule", cell: ({ row }) => vehiculeMap[row.original.matricule] || row.original.matricule },
    { id: "chauffeur", header: "Chauffeur", cell: ({ row }) => chauffeurMap[row.original.chauffeurId] || row.original.chauffeurId },
    { id: "actions", cell: ({ row }) => <PanneActionsMenu row={row} /> },
  ];

  return (
    <TableauDonnees
      data={data}
      columns={columns}
      getRowId={(row) => row.id_panne}
      title="Pannes"
      icon={IconAlertTriangle}
      loading={loading}
      onRefresh={onRefresh}
      emptyMessage="Aucune panne enregistrée"
      createButton={<DialogueCreer label="Déclarer une panne"><PanneForm /></DialogueCreer>}
      onDeleteSelected={async (ids) => { for (const id of ids) await deletePanne(id); }}
      filters={[
        { columnId: "typePanne", label: "Type", placeholder: "Tous les types", options: [
          { label: "Mécanique", value: "MECANIQUE" }, { label: "Électrique", value: "ELECTRIQUE" },
          { label: "Hydraulique", value: "HYDRAULIQUE" }, { label: "Carrosserie", value: "CARROSSERIE" },
          { label: "Pneu", value: "PNEU" }, { label: "Frein", value: "FREIN" }, { label: "Moteur", value: "MOTEUR" },
        ]},
      ]}
    />
  );
}
