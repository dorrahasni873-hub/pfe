import type { CarnetDeBord } from "@/shared/types/types";
import { useCarnetDeBord } from "@/features/logbooks/hooks/useLogbooks";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import CarnetDeBordForm from "./LogbookForm";

type Props = { row: { original: CarnetDeBord } };

const CarnetDeBordActionsMenu = ({ row }: Props) => {
  const { deleteCarnet } = useCarnetDeBord();
  return (
    <ActionsLigne onDelete={() => deleteCarnet(row.original.id_carnet)} editLabel="Modifier le carnet de bord">
      <CarnetDeBordForm carnet={row.original} />
    </ActionsLigne>
  );
};

export default CarnetDeBordActionsMenu;
