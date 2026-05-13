import type { Chauffeur } from "@/features/drivers/types";
import { useDrivers } from "@/features/drivers/hooks/useDrivers";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import ChauffeurForm from "./DriverForm";

type Props = { row: { original: Chauffeur } };

const ChauffeurActionsMenu = ({ row }: Props) => {
  const { remove } = useDrivers();
  return (
    <ActionsLigne
      onDelete={() => remove(row.original.id_chauffeur)}
      editLabel="Modifier le chauffeur"
      adminOnly
    >
      <ChauffeurForm chauffeur={row.original} />
    </ActionsLigne>
  );
};

export default ChauffeurActionsMenu;
