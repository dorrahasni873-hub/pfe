import { useEffect, useState } from "react";
import type { Panne } from "@/@types/types";
import { PanneDataTable } from "@/components/panne/panne-data-table";
import { usePanne } from "@/hooks/usePanne";

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
    // eslint-disable-next-line prefer-const
    intervalId = setInterval(fetchPannes, 3000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 px-6">Liste des Pannes</h1>

      <PanneDataTable data={data} />
    </div>
  );
};

export default PannePage;
