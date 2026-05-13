import { useEffect } from "react";
import { IconTruck } from "@tabler/icons-react";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import { VehiculeDataTable } from "@/features/vehicles/components/VehicleDataTable";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { SqueletteTableau } from "@/shared/components/SqueletteTableau/SqueletteTableau";

const VehiculesPage = () => {
  const { data, loading, error, refetch } = useVehicles();

  useEffect(() => {
    const intervalId = setInterval(refetch, 3000);
    return () => clearInterval(intervalId);
  }, [refetch]);

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
