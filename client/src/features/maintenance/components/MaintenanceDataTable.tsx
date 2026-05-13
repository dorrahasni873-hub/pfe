import * as React from "react";
import { useEffect, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";
import { TableauDonnees } from "@/shared/components/TableauDonnees/TableauDonnees";
import { DialogueCreer } from "@/shared/components/DialogueCreer/DialogueCreer";
import MaintenanceActionsMenu from "./MaintenanceActionsMenu";
import MaintenanceForm from "./MaintenanceForm";
import type { Maintenance } from "@/features/maintenance/types";
import type { User } from "@/features/users/types";
import { userService } from "@/features/users/api/userService";
import { IconTools } from "@tabler/icons-react";
import { useMaintenance } from "@/features/maintenance/hooks/useMaintenance";

function useUserMap() {
  const [map, setMap] = useState<Record<string, string>>({});
  useEffect(() => {
    userService.getAll().then((data) => {
      const m: Record<string, string> = {};
      (data || []).filter((u: User) => u.role === "maintenance").forEach((u: User) => { m[u.id_utilisateur] = `${u.nom} ${u.prenom}`; });
      setMap(m);
    });
  }, []);
  return map;
}

export function MaintenanceDataTable({ data }: { data: Maintenance[] }) {
  const userMap = useUserMap();
  const { remove } = useMaintenance();

  const columns: ColumnDef<Maintenance>[] = [
    { id: "select", header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)} />, cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} /> },
    { accessorKey: "description", header: "Description", cell: ({ row }) => <span className="max-w-[200px] truncate block">{row.original.description}</span> },
    { accessorKey: "dateMaintenance", header: "Date", cell: ({ row }) => <Badge variant="outline">{row.original.dateMaintenance}</Badge> },
    { accessorKey: "cout", header: "Coût", cell: ({ row }) => <span className="font-medium">{row.original.cout} TND</span> },
    { accessorKey: "kilometrage", header: "Km" },
    { accessorKey: "prochainEntretien", header: "Prochain entretien", cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.prochainEntretien}</span> },
    { id: "mainteneur", header: "Mainteneur", cell: ({ row }) => userMap[row.original.id_utilisateur] || row.original.id_utilisateur },
    { accessorKey: "matricule", header: "Véhicule" },
    { id: "actions", cell: ({ row }) => <MaintenanceActionsMenu row={row} /> },
  ];

  return (
    <TableauDonnees
      data={data}
      columns={columns}
      getRowId={(row) => row.id_maintenance}
      title="Maintenances"
      icon={IconTools}
      emptyMessage="Aucune maintenance enregistrée"
      createButton={<DialogueCreer label="Créer Maintenance"><MaintenanceForm /></DialogueCreer>}
      onDeleteSelected={async (ids) => { for (const id of ids) await remove(id); }}
    />
  );
}
