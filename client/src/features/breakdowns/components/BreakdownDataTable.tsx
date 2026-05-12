import * as React from "react";
import { useEffect, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";
import { TableauDonnees } from "@/shared/components/TableauDonnees/TableauDonnees";
import { DialogueCreer } from "@/shared/components/DialogueCreer/DialogueCreer";
import PanneActionsMenu from "./BreakdownActionsMenu";
import PanneForm from "./BreakdownForm";
import type { Panne, Chauffeur, Vehicule } from "@/shared/types/types";
import { useChauffeur } from "@/features/drivers/hooks/useDrivers";
import { useVehicule } from "@/features/vehicles/hooks/useVehicles";
import { IconAlertTriangle } from "@tabler/icons-react";
import { usePanne } from "@/features/breakdowns/hooks/useBreakdowns";

const typeColors: Record<string, string> = { MECANIQUE: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300", ELECTRIQUE: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", HYDRAULIQUE: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300", CARROSSERIE: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300", PNEU: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300", FREIN: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300", MOTEUR: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" };
const statusColors: Record<string, string> = { en_attente: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300", en_cours: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", resolue: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" };

export function PanneDataTable({ data }: { data: Panne[] }) {
  const [chauffeurMap, setChauffeurMap] = useState<Record<string, string>>({});
  const [vehiculeMap, setVehiculeMap] = useState<Record<string, string>>({});
  const { getChauffeurs } = useChauffeur();
  const { getVehicules } = useVehicule();
  const { deletePanne } = usePanne();

  useEffect(() => {
    getChauffeurs().then((d) => { const m: Record<string, string> = {}; (d || []).forEach((c: Chauffeur) => { m[c.id_chauffeur] = `${c.nom} ${c.prenom}`; }); setChauffeurMap(m); });
    getVehicules().then((d) => { const m: Record<string, string> = {}; (d || []).forEach((v: Vehicule) => { m[v.matricule] = `${v.marqueVoiture} (${v.matricule})`; }); setVehiculeMap(m); });
  }, []);

  const columns: ColumnDef<Panne>[] = [
    { id: "select", header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)} />, cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} /> },
    { accessorKey: "typePanne", header: "Type", cell: ({ row }) => <Badge className={typeColors[row.original.typePanne] || ""}>{row.original.typePanne}</Badge> },
    { accessorKey: "dateDeclaration", header: "Date déclaration", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.dateDeclaration}</span> },
    { accessorKey: "matricule", header: "Véhicule", cell: ({ row }) => vehiculeMap[row.original.matricule] || row.original.matricule },
    { id: "chauffeur", header: "Chauffeur", cell: ({ row }) => chauffeurMap[row.original.chauffeurId] || row.original.chauffeurId },
    { accessorKey: "status", header: "Statut", cell: ({ row }) => <Badge className={statusColors[row.original.status] || ""}>{row.original.status.replace("_", " ")}</Badge> },
    { id: "actions", cell: ({ row }) => <PanneActionsMenu row={row} /> },
  ];

  return (
    <TableauDonnees
      data={data}
      columns={columns}
      getRowId={(row) => row.id_panne}
      title="Pannes"
      icon={IconAlertTriangle}
      emptyMessage="Aucune panne enregistrée"
      createButton={<DialogueCreer label="Déclarer une panne"><PanneForm /></DialogueCreer>}
      onDeleteSelected={async (ids) => { for (const id of ids) await deletePanne(id); }}
      filters={[
        { columnId: "typePanne", label: "Type", placeholder: "Tous les types", options: [
          { label: "Mécanique", value: "MECANIQUE" }, { label: "Électrique", value: "ELECTRIQUE" },
          { label: "Hydraulique", value: "HYDRAULIQUE" }, { label: "Carrosserie", value: "CARROSSERIE" },
          { label: "Pneu", value: "PNEU" }, { label: "Frein", value: "FREIN" }, { label: "Moteur", value: "MOTEUR" },
        ]},
        { columnId: "status", label: "Statut", placeholder: "Tous les statuts", options: [
          { label: "En attente", value: "en_attente" }, { label: "En cours", value: "en_cours" },
          { label: "Résolue", value: "resolue" }, { label: "Annulée", value: "annulee" },
        ]},
      ]}
    />
  );
}
