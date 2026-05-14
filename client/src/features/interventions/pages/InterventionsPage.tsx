import { EntretienDataTable } from "@/features/interventions/components/InterventionDataTable";
import { IconTools } from "@tabler/icons-react";
import { useInterventions } from "@/features/interventions/hooks/useInterventions";
import EntetePage from "@/shared/components/EntetePage/EntetePage";

const EntretienPage = () => {
  const { data, loading, refetch } = useInterventions();

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des entretiens"
        description="Suivi des interventions et réparations"
        icon={IconTools}
      />
      <EntretienDataTable data={data} loading={loading} onRefresh={refetch} />
    </div>
  );
};

export default EntretienPage;
