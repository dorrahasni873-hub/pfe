import type { Entretien } from "@/shared/types/types";
import { useEntretien } from "@/features/interventions/hooks/useInterventions";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import EntretienForm from "./InterventionForm";

type Props = { row: { original: Entretien } };

const EntretienActionsMenu = ({ row }: Props) => {
  const { deleteEntretien } = useEntretien();
  return (
    <ActionsLigne onDelete={() => deleteEntretien(row.original.id_entretien)} editLabel="Modifier l'entretien">
      <EntretienForm entretien={row.original} />
    </ActionsLigne>
  );
};

export default EntretienActionsMenu;
