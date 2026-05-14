import { IconArrowsExchange } from "@tabler/icons-react";
import { useAssignments } from "@/features/assignments/hooks/useAssignments";
import { AffectationDataTable } from "@/features/assignments/components/AssignmentDataTable";
import EntetePage from "@/shared/components/EntetePage/EntetePage";

const AffectationsPage = () => {
  const { data, loading, refetch } = useAssignments();

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des affectations"
        description="Gestion des conducteurs et de leurs affectations aux véhicules"
        icon={IconArrowsExchange}
      />
      <AffectationDataTable data={data} loading={loading} onRefresh={refetch} />
    </div>
  );
};

export default AffectationsPage;
