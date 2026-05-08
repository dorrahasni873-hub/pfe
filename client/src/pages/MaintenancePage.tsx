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
      <div className="flex flex-col items-center justify-center mb-6 px-6 text-center">
        <h1 className="text-4xl font-light italic tracking-wide text-primary/80">
          Liste des maintenances
        </h1>

        <p className="mt-2 text-sm italic tracking-wider text-muted-foreground">
          Gestion élégante des maintenances et opérations de maintenance
        </p>

        <div className="mt-4 h-[1px] w-28 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <MaintenanceDataTable data={data} />
    </div>
  );
};

export default MaintenancePage;
