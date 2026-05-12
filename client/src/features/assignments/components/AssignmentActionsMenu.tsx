import type { Affectation } from "@/shared/types/types";
import { useAffectation } from "@/features/assignments/hooks/useAssignments";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import AffectationForm from "./AssignmentForm";

type Props = { row: { original: Affectation } };

const AffectationActionsMenu = ({ row }: Props) => {
  const { deleteAffectation } = useAffectation();
  return (
    <ActionsLigne onDelete={() => deleteAffectation(row.original.id_affectation)} editLabel="Modifier l'affectation">
      <AffectationForm affectation={row.original} />
    </ActionsLigne>
  );
};

export default AffectationActionsMenu;
