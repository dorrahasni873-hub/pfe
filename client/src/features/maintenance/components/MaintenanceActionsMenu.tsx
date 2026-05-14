import type { Maintenance } from "@/features/maintenance/types";
import { useMaintenance } from "@/features/maintenance/hooks/useMaintenance";
import { ActionsLigne } from "@/shared/components/ActionsLigne/ActionsLigne";
import { openPrintFiche } from "@/shared/components/FicheImpression/FicheImpression";
import MaintenanceForm from "./MaintenanceForm";

type Props = { row: { original: Maintenance } };

const MaintenanceActionsMenu = ({ row }: Props) => {
  const { remove } = useMaintenance();
  const m = row.original;
  return (
    <ActionsLigne
      onDelete={() => remove(m.id_maintenance)}
      editLabel="Modifier la maintenance"
      onPrint={() =>
        openPrintFiche({
          title: `Maintenance ${m.id_maintenance.slice(0, 8)}`,
          subtitle: m.matricule,
          sections: [
            [
              { label: "Matricule", value: m.matricule },
              { label: "Description", value: m.description },
            ],
            [
              { label: "Date", value: m.dateMaintenance },
              { label: "Kilométrage", value: String(m.kilometrage) },
            ],
            [
              { label: "Coût", value: m.cout },
              { label: "Prochain entretien", value: m.prochainEntretien },
            ],
          ],
        })
      }
    >
      <MaintenanceForm maintenance={m} />
    </ActionsLigne>
  );
};

export default MaintenanceActionsMenu;
