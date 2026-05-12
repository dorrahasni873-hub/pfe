import type { Maintenance } from "@/shared/types/types";
import { useMaintenance } from "@/features/maintenance/hooks/useMaintenance";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import MaintenanceForm from "./MaintenanceForm";

type Props = { row: { original: Maintenance } };

const MaintenanceActionsMenu = ({ row }: Props) => {
  const { deleteMaintenance } = useMaintenance();
  return (
    <ActionsLigne onDelete={() => deleteMaintenance(row.original.id_maintenance)} editLabel="Modifier la maintenance">
      <MaintenanceForm maintenance={row.original} />
    </ActionsLigne>
  );
};

export default MaintenanceActionsMenu;
