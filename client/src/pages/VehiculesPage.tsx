import { useEffect, useState } from "react";
import type { Vehicule } from "@/@types/types";
import { useVehicule } from "@/hooks/useVehicule";
import { VehiculeDataTable } from "@/components/vehicule/vehicule-data-table";

const VehiculesPage = () => {
  const { getVehicules } = useVehicule();
  const [data, setData] = useState<Vehicule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    const fetchUsers = async () => {
      try {
        const users = await getVehicules();

        setData(users ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    // eslint-disable-next-line prefer-const
    intervalId = setInterval(fetchUsers, 3000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 px-6">Liste des vehicules</h1>

      <VehiculeDataTable data={data} />
    </div>
  );
};

export default VehiculesPage;
