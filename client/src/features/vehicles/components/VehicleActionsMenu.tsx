import type { Vehicule } from "@/features/vehicles/types";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import { openPrintFiche } from "@/shared/components/FicheImpression/FicheImpression";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import VehiculeForm from "./VehicleForm";

type Props = { row: { original: Vehicule } };

const VehiculeActionsMenu = ({ row }: Props) => {
  const { remove } = useVehicles();
  const v = row.original;
  return (
    <ActionsLigne
      onDelete={() => remove(v.matricule)}
      editLabel="Modifier le véhicule"
      adminOnly
      onPrint={() =>
        openPrintFiche({
          title: `Véhicule ${v.matricule}`,
          subtitle: v.marque,
          sections: [
            [
              { label: "Matricule", value: v.matricule },
              { label: "Marque", value: v.marque },
            ],
            [
              { label: "Mise en circulation", value: format(v.dateCirculation, "dd/MM/yyyy", { locale: fr }) },
              { label: "Visite technique", value: format(v.dateVisite, "dd/MM/yyyy", { locale: fr }) },
            ],
            [
              { label: "Taxe", value: format(v.dateTaxe, "dd/MM/yyyy", { locale: fr }) },
              { label: "État", value: v.etat },
            ],
          ],
        })
      }
    >
      <VehiculeForm vehicule={v} />
    </ActionsLigne>
  );
};

export default VehiculeActionsMenu;
