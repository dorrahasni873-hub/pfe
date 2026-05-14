import { MaintenanceDataTable } from "@/features/maintenance/components/MaintenanceDataTable";
import { IconTools } from "@tabler/icons-react";
import { useMaintenance } from "@/features/maintenance/hooks/useMaintenance";
import EntetePage from "@/shared/components/EntetePage/EntetePage";

const MaintenancePage = () => {
  const { data, loading, refetch } = useMaintenance();

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des maintenances"
        description="Gestion des opérations de maintenance"
        icon={IconTools}
      />
      <MaintenanceDataTable data={data} loading={loading} onRefresh={refetch} />
    </div>
  );
};

export default MaintenancePage;
