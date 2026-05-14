import type { Chauffeur } from "@/features/drivers/types";
import { useDrivers } from "@/features/drivers/hooks/useDrivers";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import { openPrintFiche } from "@/shared/components/FicheImpression/FicheImpression";
import ChauffeurForm from "./DriverForm";

type Props = { row: { original: Chauffeur } };

const ChauffeurActionsMenu = ({ row }: Props) => {
  const { remove } = useDrivers();
  const c = row.original;
  return (
    <ActionsLigne
      onDelete={() => remove(c.id_chauffeur)}
      editLabel="Modifier le chauffeur"
      adminOnly
      onPrint={() =>
        openPrintFiche({
          title: `${c.prenom} ${c.nom}`,
          subtitle: "Chauffeur",
          sections: [
            [
              { label: "Nom", value: c.nom },
              { label: "Prénom", value: c.prenom },
            ],
            [
              { label: "CIN", value: c.cin },
              { label: "Tél", value: c.tel },
            ],
            [
              { label: "Email", value: c.email },
              { label: "Permis", value: c.numeroPermis },
            ],
          ],
        })
      }
    >
      <ChauffeurForm chauffeur={c} />
    </ActionsLigne>
  );
};

export default ChauffeurActionsMenu;
