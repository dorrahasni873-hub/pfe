import { useEffect } from "react";
import { IconArrowsExchange } from "@tabler/icons-react";
import { useAssignments } from "@/features/assignments/hooks/useAssignments";
import { AffectationDataTable } from "@/features/assignments/components/AssignmentDataTable";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { SqueletteTableau } from "@/shared/components/SqueletteTableau/SqueletteTableau";

const AffectationsPage = () => {
  const { data, loading, error, refetch } = useAssignments();

  useEffect(() => {
    const intervalId = setInterval(refetch, 3000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des affectations"
        description="Gestion des conducteurs et de leurs affectations aux véhicules"
        icon={IconArrowsExchange}
      />
      {loading ? <SqueletteTableau columns={7} rows={5} /> : <AffectationDataTable data={data} />}
    </div>
  );
};

export default AffectationsPage;
