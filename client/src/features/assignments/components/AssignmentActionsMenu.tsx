import type { Affectation } from "@/features/assignments/types";
import { useAssignments } from "@/features/assignments/hooks/useAssignments";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import { openPrintFiche } from "@/shared/components/FicheImpression/FicheImpression";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import AffectationForm from "./AssignmentForm";

type Props = { row: { original: Affectation } };

const AffectationActionsMenu = ({ row }: Props) => {
  const { remove } = useAssignments();
  const a = row.original;
  return (
    <ActionsLigne
      onDelete={() => remove(a.id_affectation)}
      editLabel="Modifier l'affectation"
      onPrint={() =>
        openPrintFiche({
          title: `Affectation ${a.id_affectation.slice(0, 8)}`,
          subtitle: a.matricule,
          sections: [
            [
              { label: "Matricule", value: a.matricule },
              { label: "Type", value: a.typeAffectation },
            ],
            [
              { label: "Date d'affectation", value: format(a.dateAffectation, "dd/MM/yyyy", { locale: fr }) },
              { label: "Date début", value: format(a.dateDebut, "dd/MM/yyyy", { locale: fr }) },
            ],
            [
              { label: "État", value: a.etat },
              { label: "Chauffeur", value: a.id_chauffeur.slice(0, 8) },
            ],
          ],
        })
      }
    >
      <AffectationForm affectation={a} />
    </ActionsLigne>
  );
};

export default AffectationActionsMenu;
