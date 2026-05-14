import type { CarnetDeBord } from "@/features/logbooks/types";
import { useLogbooks } from "@/features/logbooks/hooks/useLogbooks";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import { openPrintFiche } from "@/shared/components/FicheImpression/FicheImpression";
import CarnetDeBordForm from "./LogbookForm";

type Props = { row: { original: CarnetDeBord } };

const CarnetDeBordActionsMenu = ({ row }: Props) => {
  const { remove } = useLogbooks();
  const c = row.original;
  return (
    <ActionsLigne
      onDelete={() => remove(c.id_carnet)}
      editLabel="Modifier le carnet de bord"
      onPrint={() =>
        openPrintFiche({
          title: `Carnet de bord ${c.id_carnet.slice(0, 8)}`,
          subtitle: c.matricule,
          sections: [
            [
              { label: "Matricule", value: c.matricule },
            ],
            [
              { label: "Date début", value: c.dateDeDebut },
              { label: "Date fin", value: c.dateDeFin },
            ],
            [
              { label: "Km départ", value: String(c.km_depart) },
              { label: "Km arrivée", value: String(c.km_arrive) },
            ],
          ],
        })
      }
    >
      <CarnetDeBordForm carnet={c} />
    </ActionsLigne>
  );
};

export default CarnetDeBordActionsMenu;
