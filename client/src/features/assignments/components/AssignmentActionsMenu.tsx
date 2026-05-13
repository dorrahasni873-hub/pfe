import type { Affectation } from "@/features/assignments/types";
import { useAssignments } from "@/features/assignments/hooks/useAssignments";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import AffectationForm from "./AssignmentForm";

type Props = { row: { original: Affectation } };

const AffectationActionsMenu = ({ row }: Props) => {
  const { remove } = useAssignments();
  return (
    <ActionsLigne onDelete={() => remove(row.original.id_affectation)} editLabel="Modifier l'affectation">
      <AffectationForm affectation={row.original} />
    </ActionsLigne>
  );
};

export default AffectationActionsMenu;
