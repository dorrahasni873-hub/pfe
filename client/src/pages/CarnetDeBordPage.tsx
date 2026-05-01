import { useEffect, useState } from "react";
import type { CarnetDeBord } from "@/@types/types";
import { CarnetDeBordDataTable } from "@/components/carnetDeBord/carnet-de-bord-data-table";
import { useCarnetDeBord } from "@/hooks/useCarnetDeBord";

const CarnetDeBordPage = () => {
  const { getCarnets } = useCarnetDeBord();
  const [data, setData] = useState<CarnetDeBord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    const fetchCarnets = async () => {
      try {
        const data = await getCarnets();
        setData(data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarnets();
    // eslint-disable-next-line prefer-const
    intervalId = setInterval(fetchCarnets, 3000);

    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 px-6">
        Liste des Carnets de Bord
      </h1>

      <CarnetDeBordDataTable data={data} />
    </div>
  );
};

export default CarnetDeBordPage;
