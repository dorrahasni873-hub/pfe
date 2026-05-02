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
      <div className="flex flex-col items-center justify-center mb-6 px-6 text-center">
        <h1 className="text-4xl font-light italic tracking-wide text-primary/80">
          Liste des Entretiens
        </h1>

        <p className="mt-2 text-sm italic tracking-wider text-muted-foreground">
          Suivi raffiné des opérations de maintenance
        </p>

        <div className="mt-4 h-[1px] w-28 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <EntretienDataTable data={data} />
    </div>
  );
};

export default EntretienPage;
