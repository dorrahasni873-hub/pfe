import type { CarnetDeBord } from "@/features/logbooks/types";
import { useLogbooks } from "@/features/logbooks/hooks/useLogbooks";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import CarnetDeBordForm from "./LogbookForm";

type Props = { row: { original: CarnetDeBord } };

const CarnetDeBordActionsMenu = ({ row }: Props) => {
  const { remove } = useLogbooks();
  return (
    <ActionsLigne onDelete={() => remove(row.original.id_carnet)} editLabel="Modifier le carnet de bord">
      <CarnetDeBordForm carnet={row.original} />
    </ActionsLigne>
  );
};

export default CarnetDeBordActionsMenu;
