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
      <div className="flex flex-col items-center justify-center mb-6 px-6 text-center">
        <h1 className="text-4xl font-light italic tracking-wide text-primary/80">
          Liste des Carnets de Bord
        </h1>

        <p className="mt-2 text-sm italic tracking-wider text-muted-foreground">
          Vue globale élégante de votre activité et performance des carnets de
          bord
        </p>

        <div className="mt-4 h-[1px] w-28 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <CarnetDeBordDataTable data={data} />
    </div>
  );
};

export default CarnetDeBordPage;
