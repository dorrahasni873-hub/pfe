import { useEffect, useState } from "react";
import type { Panne } from "@/shared/types/types";
import { PanneDataTable } from "@/features/breakdowns/components/BreakdownDataTable";
import { IconAlertTriangle } from "@tabler/icons-react";
import { usePanne } from "@/features/breakdowns/hooks/useBreakdowns";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { SqueletteTableau } from "@/shared/components/SqueletteTableau/SqueletteTableau";

const PannePage = () => {
  const { getPannes } = usePanne();
  const [data, setData] = useState<Panne[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    const fetchPannes = async () => {
      try {
        const data = await getPannes();
        setData(data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPannes();
    intervalId = setInterval(fetchPannes, 3000);

    return () => clearInterval(intervalId);
  }, [getPannes]);

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des pannes"
        description="Suivi des incidents et pannes des véhicules"
        icon={IconAlertTriangle}
      />
      {loading ? <SqueletteTableau columns={6} rows={5} /> : <PanneDataTable data={data} />}
    </div>
  );
};

export default PannePage;
