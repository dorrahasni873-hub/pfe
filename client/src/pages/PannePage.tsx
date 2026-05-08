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
      <div className="flex flex-col items-center justify-center mb-6 px-6 text-center">
        <h1 className="text-4xl font-light italic tracking-wide text-primary/80">
          Liste des Pannes
        </h1>

        <p className="mt-2 text-sm italic tracking-wider text-muted-foreground">
          Suivi élégant des incidents et pannes des véhicules
        </p>

        <div className="mt-4 h-[1px] w-28 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>
      <PanneDataTable data={data} />
    </div>
  );
};

export default PannePage;
