import type { Chauffeur } from "@/shared/types/types";
import { useChauffeur } from "@/features/drivers/hooks/useDrivers";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import ChauffeurForm from "./DriverForm";

type Props = { row: { original: Chauffeur } };

const ChauffeurActionsMenu = ({ row }: Props) => {
  const { deleteChauffeur } = useChauffeur();
  return (
    <ActionsLigne
      onDelete={() => deleteChauffeur(row.original.id_chauffeur)}
      editLabel="Modifier le chauffeur"
      adminOnly
    >
      <ChauffeurForm chauffeur={row.original} />
    </ActionsLigne>
  );
};

export default ChauffeurActionsMenu;
