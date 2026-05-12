import type { Vehicule } from "@/shared/types/types";
import { useVehicule } from "@/features/vehicles/hooks/useVehicles";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import VehiculeForm from "./VehicleForm";

type Props = { row: { original: Vehicule } };

const VehiculeActionsMenu = ({ row }: Props) => {
  const { deleteVehicule } = useVehicule();
  return (
    <ActionsLigne onDelete={() => deleteVehicule(row.original.matricule)} editLabel="Modifier le véhicule" adminOnly>
      <VehiculeForm vehicule={row.original} />
    </ActionsLigne>
  );
};

export default VehiculeActionsMenu;
