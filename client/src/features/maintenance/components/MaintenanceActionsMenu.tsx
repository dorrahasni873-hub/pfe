import type { Maintenance } from "@/features/maintenance/types";
import { useMaintenance } from "@/features/maintenance/hooks/useMaintenance";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import MaintenanceForm from "./MaintenanceForm";

type Props = { row: { original: Maintenance } };

const MaintenanceActionsMenu = ({ row }: Props) => {
  const { remove } = useMaintenance();
  return (
    <ActionsLigne onDelete={() => remove(row.original.id_maintenance)} editLabel="Modifier la maintenance">
      <MaintenanceForm maintenance={row.original} />
    </ActionsLigne>
  );
};

export default MaintenanceActionsMenu;
