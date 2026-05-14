import type { Panne } from "@/features/breakdowns/types";
import { useBreakdowns } from "@/features/breakdowns/hooks/useBreakdowns";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import { openPrintFiche } from "@/shared/components/FicheImpression/FicheImpression";
import PanneForm from "./BreakdownForm";

type Props = { row: { original: Panne } };

const PanneActionsMenu = ({ row }: Props) => {
  const { remove: deletePanne } = useBreakdowns();
  const p = row.original;
  return (
    <ActionsLigne
      onDelete={() => deletePanne(p.id_panne)}
      editLabel="Modifier la panne"
      onPrint={() =>
        openPrintFiche({
          title: `Panne ${p.id_panne.slice(0, 8)}`,
          subtitle: p.matricule,
          sections: [
            [
              { label: "Matricule", value: p.matricule },
              { label: "Type", value: p.typePanne },
            ],
            [
              { label: "Date déclaration", value: p.dateDeclaration },
              { label: "Status", value: p.status },
            ],
          ],
        })
      }
    >
      <PanneForm panne={p} />
    </ActionsLigne>
  );
};

export default PanneActionsMenu;
