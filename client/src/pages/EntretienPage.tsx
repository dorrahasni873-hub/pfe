import { useEffect, useState } from "react";
import type { Entretien } from "@/@types/types";
import { EntretienDataTable } from "@/components/entretien/entretien-data-table";
import { useEntretien } from "@/hooks/useEntretien";

const EntretienPage = () => {
  const { getEntretiens } = useEntretien();
  const [data, setData] = useState<Entretien[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    const fetchEntretiens = async () => {
      try {
        const data = await getEntretiens();
        setData(data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntretiens();
    // eslint-disable-next-line prefer-const
    intervalId = setInterval(fetchEntretiens, 3000);

    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 px-6">Liste des Entretiens</h1>

      <EntretienDataTable data={data} />
    </div>
  );
};

export default EntretienPage;
