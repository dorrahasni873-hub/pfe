import { useEffect } from "react";
import { PanneDataTable } from "@/features/breakdowns/components/BreakdownDataTable";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useBreakdowns } from "@/features/breakdowns/hooks/useBreakdowns";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { SqueletteTableau } from "@/shared/components/SqueletteTableau/SqueletteTableau";

const PannePage = () => {
  const { data, loading, error, refetch } = useBreakdowns();

  useEffect(() => {
    const intervalId = setInterval(refetch, 3000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des pannes"
        description="Suivi des incidents et pannes des véhicules"
        icon={IconAlertTriangle}
      />
      {loading ? <SqueletteTableau columns={6} rows={5} /> : <PanneDataTable data={data} />}
    </div>
  );
};

export default PannePage;
