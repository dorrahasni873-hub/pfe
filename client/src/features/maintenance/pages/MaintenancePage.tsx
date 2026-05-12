import { useEffect, useState } from "react";
import type { Maintenance } from "@/shared/types/types";
import { MaintenanceDataTable } from "@/features/maintenance/components/MaintenanceDataTable";
import { IconTools } from "@tabler/icons-react";
import { useMaintenance } from "@/features/maintenance/hooks/useMaintenance";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { SqueletteTableau } from "@/shared/components/SqueletteTableau/SqueletteTableau";

const MaintenancePage = () => {
  const { getMaintenances } = useMaintenance();
  const [data, setData] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    const fetchMaintenances = async () => {
      try {
        const data = await getMaintenances();
        setData(data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenances();
    intervalId = setInterval(fetchMaintenances, 3000);

    return () => clearInterval(intervalId);
  }, [getMaintenances]);

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
