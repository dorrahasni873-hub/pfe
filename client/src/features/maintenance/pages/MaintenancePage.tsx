import { useEffect } from "react";
import { MaintenanceDataTable } from "@/features/maintenance/components/MaintenanceDataTable";
import { IconTools } from "@tabler/icons-react";
import { useMaintenance } from "@/features/maintenance/hooks/useMaintenance";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { SqueletteTableau } from "@/shared/components/SqueletteTableau/SqueletteTableau";

const MaintenancePage = () => {
  const { data, loading, error, refetch } = useMaintenance();

  useEffect(() => {
    const intervalId = setInterval(refetch, 3000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des maintenances"
        description="Gestion des opérations de maintenance"
        icon={IconTools}
      />
      {loading ? <SqueletteTableau columns={6} rows={5} /> : <MaintenanceDataTable data={data} />}
    </div>
  );
};

export default MaintenancePage;
