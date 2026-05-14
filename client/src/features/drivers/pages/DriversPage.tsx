import { ChauffeurDataTable } from "@/features/drivers/components/DriverDataTable";
import { IconSteeringWheel } from "@tabler/icons-react";
import { useDrivers } from "@/features/drivers/hooks/useDrivers";
import EntetePage from "@/shared/components/EntetePage/EntetePage";

const ChauffeursPage = () => {
  const { data, loading, refetch } = useDrivers();

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des chauffeurs"
        description="Gestion des chauffeurs et de leurs performances"
        icon={IconSteeringWheel}
      />
      <ChauffeurDataTable data={data} loading={loading} onRefresh={refetch} />
    </div>
  );
};

export default ChauffeursPage;
