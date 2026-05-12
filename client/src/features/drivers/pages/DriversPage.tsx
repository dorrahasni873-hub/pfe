import { useEffect, useState } from "react";
import type { Chauffeur } from "@/shared/types/types";
import { ChauffeurDataTable } from "@/features/drivers/components/DriverDataTable";
import { IconSteeringWheel } from "@tabler/icons-react";
import { useChauffeur } from "@/features/drivers/hooks/useDrivers";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { SqueletteTableau } from "@/shared/components/SqueletteTableau/SqueletteTableau";

const ChauffeursPage = () => {
  const { getChauffeurs } = useChauffeur();
  const [data, setData] = useState<Chauffeur[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    const fetchUsers = async () => {
      try {
        const users = await getChauffeurs();
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
  }, [getChauffeurs]);

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
