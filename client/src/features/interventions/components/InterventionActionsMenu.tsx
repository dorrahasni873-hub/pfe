import type { Entretien } from "@/features/interventions/types";
import { useInterventions } from "@/features/interventions/hooks/useInterventions";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import { openPrintFiche } from "@/shared/components/FicheImpression/FicheImpression";
import EntretienForm from "./InterventionForm";

type Props = { row: { original: Entretien } };

const EntretienActionsMenu = ({ row }: Props) => {
  const { remove: deleteEntretien } = useInterventions();
  const e = row.original;
  return (
    <ActionsLigne
      onDelete={() => deleteEntretien(e.id_entretien)}
      editLabel="Modifier l'entretien"
      onPrint={() =>
        openPrintFiche({
          title: `Entretien ${e.id_entretien.slice(0, 8)}`,
          subtitle: e.matricule,
          sections: [
            [
              { label: "Matricule", value: e.matricule },
              { label: "Type", value: e.typeIntervention },
            ],
            [
              { label: "Date", value: e.dateEntretien },
              { label: "Description", value: e.descriptionIntervention },
            ],
            [
              { label: "État", value: e.etat },
            ],
          ],
        })
      }
    >
      <EntretienForm entretien={e} />
    </ActionsLigne>
  );
};

export default EntretienActionsMenu;
