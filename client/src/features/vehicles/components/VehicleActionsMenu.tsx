import type { Vehicule } from "@/features/vehicles/types";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import VehiculeForm from "./VehicleForm";

type Props = { row: { original: Vehicule } };

const VehiculeActionsMenu = ({ row }: Props) => {
  const { remove } = useVehicles();
  return (
    <ActionsLigne onDelete={() => remove(row.original.matricule)} editLabel="Modifier le véhicule" adminOnly>
      <VehiculeForm vehicule={row.original} />
    </ActionsLigne>
  );
};

export default VehiculeActionsMenu;
