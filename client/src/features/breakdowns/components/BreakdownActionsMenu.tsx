import type { Panne } from "@/features/breakdowns/types";
import { useBreakdowns } from "@/features/breakdowns/hooks/useBreakdowns";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import PanneForm from "./BreakdownForm";

type Props = { row: { original: Panne } };

const PanneActionsMenu = ({ row }: Props) => {
  const { remove: deletePanne } = useBreakdowns();
  return (
    <ActionsLigne onDelete={() => deletePanne(row.original.id_panne)} editLabel="Modifier la panne">
      <PanneForm panne={row.original} />
    </ActionsLigne>
  );
};

export default PanneActionsMenu;
