import { useEffect } from "react";
import { EntretienDataTable } from "@/features/interventions/components/InterventionDataTable";
import { IconTools } from "@tabler/icons-react";
import { useInterventions } from "@/features/interventions/hooks/useInterventions";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { SqueletteTableau } from "@/shared/components/SqueletteTableau/SqueletteTableau";

const EntretienPage = () => {
  const { data, loading, error, refetch } = useInterventions();

  useEffect(() => {
    const intervalId = setInterval(refetch, 3000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des entretiens"
        description="Suivi des interventions et réparations"
        icon={IconTools}
      />
      {loading ? <SqueletteTableau columns={6} rows={5} /> : <EntretienDataTable data={data} />}
    </div>
  );
};

export default EntretienPage;
