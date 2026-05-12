import { useEffect, useState } from "react";
import type { Vehicule } from "@/shared/types/types";
import { IconTruck } from "@tabler/icons-react";
import { useVehicule } from "@/features/vehicles/hooks/useVehicles";
import { VehiculeDataTable } from "@/features/vehicles/components/VehicleDataTable";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { SqueletteTableau } from "@/shared/components/SqueletteTableau/SqueletteTableau";

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
    intervalId = setInterval(fetchUsers, 3000);

    return () => clearInterval(intervalId);
  }, [getVehicules]);

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des véhicules"
        description="Gestion de votre flotte et performance de vos véhicules"
        icon={IconTruck}
      />
      {loading ? <SqueletteTableau columns={6} rows={5} /> : <VehiculeDataTable data={data} />}
    </div>
  );
};

export default VehiculesPage;
