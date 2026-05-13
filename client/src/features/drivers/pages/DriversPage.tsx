import { useEffect } from "react";
import { ChauffeurDataTable } from "@/features/drivers/components/DriverDataTable";
import { IconSteeringWheel } from "@tabler/icons-react";
import { useDrivers } from "@/features/drivers/hooks/useDrivers";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { SqueletteTableau } from "@/shared/components/SqueletteTableau/SqueletteTableau";

const ChauffeursPage = () => {
  const { data, loading, error, refetch } = useDrivers();

  useEffect(() => {
    const intervalId = setInterval(refetch, 3000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des chauffeurs"
        description="Gestion des chauffeurs et de leurs performances"
        icon={IconSteeringWheel}
      />
      {loading ? <SqueletteTableau columns={7} rows={5} /> : <ChauffeurDataTable data={data} />}
    </div>
  );
};

export default ChauffeursPage;
