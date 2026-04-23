import { useEffect, useState } from "react";
import type { Maintenance } from "@/@types/types";
import { MaintenanceDataTable } from "@/components/maintenance/maintenance-data-table";
import { useMaintenance } from "@/hooks/useMaintenance";

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
    // eslint-disable-next-line prefer-const
    intervalId = setInterval(fetchMaintenances, 3000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 px-6">Liste des Maintenances</h1>

      <MaintenanceDataTable data={data} />
    </div>
  );
};

export default MaintenancePage;
