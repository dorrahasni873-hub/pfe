import { PanneDataTable } from "@/features/breakdowns/components/BreakdownDataTable";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useBreakdowns } from "@/features/breakdowns/hooks/useBreakdowns";
import EntetePage from "@/shared/components/EntetePage/EntetePage";

const PannePage = () => {
  const { data, loading, refetch } = useBreakdowns();

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des pannes"
        description="Suivi des incidents et pannes des véhicules"
        icon={IconAlertTriangle}
      />
      <PanneDataTable data={data} loading={loading} onRefresh={refetch} />
    </div>
  );
};

export default PannePage;
