import * as React from "react";
import { useEffect, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";
import { TableauDonnees } from "@/shared/components/TableauDonnees/TableauDonnees";
import { DialogueCreer } from "@/shared/components/DialogueCreer/DialogueCreer";
import CarnetDeBordActionsMenu from "./LogbookActionsMenu";
import CarnetDeBordForm from "./LogbookForm";
import type { CarnetDeBord } from "@/features/logbooks/types";
import type { Chauffeur } from "@/features/drivers/types";
import { useDrivers } from "@/features/drivers/hooks/useDrivers";
import { IconBook } from "@tabler/icons-react";
import { useLogbooks } from "@/features/logbooks/hooks/useLogbooks";

function useChauffeurMap() {
  const [map, setMap] = useState<Record<string, string>>({});
  const { getAll: getChauffeurs } = useDrivers();
  useEffect(() => {
    getChauffeurs().then((data) => {
      const m: Record<string, string> = {};
      (data || []).forEach((c: Chauffeur) => { m[c.id_chauffeur] = `${c.nom} ${c.prenom}`; });
      setMap(m);
    });
  }, []);
  return map;
}

export function CarnetDeBordDataTable({ data, loading, onRefresh }: { data: CarnetDeBord[]; loading?: boolean; onRefresh?: () => Promise<void> }) {
  const chauffeurMap = useChauffeurMap();
  const { remove: deleteCarnet } = useLogbooks();

  const columns: ColumnDef<CarnetDeBord>[] = [
    { id: "select", header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)} />, cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} /> },
    { accessorKey: "dateDeDebut", header: "Début", cell: ({ row }) => <Badge variant="outline">{row.original.dateDeDebut}</Badge> },
    { accessorKey: "dateDeFin", header: "Fin", cell: ({ row }) => <Badge variant="outline">{row.original.dateDeFin}</Badge> },
    { accessorKey: "km_depart", header: "Km départ", cell: ({ row }) => <span className="font-medium tabular-nums">{row.original.km_depart?.toLocaleString()}</span> },
    { accessorKey: "km_arrive", header: "Km arrivée", cell: ({ row }) => <span className="font-medium tabular-nums">{row.original.km_arrive?.toLocaleString()}</span> },
    { id: "chauffeur", header: "Chauffeur", cell: ({ row }) => chauffeurMap[row.original.id_chauffeur] || row.original.id_chauffeur },
    { accessorKey: "matricule", header: "Véhicule" },
    { id: "actions", cell: ({ row }) => <CarnetDeBordActionsMenu row={row} /> },
  ];

  return (
    <TableauDonnees
      data={data}
      columns={columns}
      getRowId={(row) => row.id_carnet}
      title="Carnets de bord"
      icon={IconBook}
      loading={loading}
      onRefresh={onRefresh}
      emptyMessage="Aucun carnet de bord enregistré"
      createButton={<DialogueCreer label="Créer Carnet de bord"><CarnetDeBordForm /></DialogueCreer>}
      onDeleteSelected={async (ids) => { for (const id of ids) await deleteCarnet(id); }}
    />
  );
}
