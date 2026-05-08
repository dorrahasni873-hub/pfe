import { useEffect, useState } from "react";
import type { Chauffeur } from "@/@types/types";
import { ChauffeurDataTable } from "@/components/chauffeur/chauffeur-data-table";
import { useChauffeur } from "@/hooks/useChauffeur";

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
    console.log(data);

    fetchUsers();
    // eslint-disable-next-line prefer-const
    intervalId = setInterval(fetchUsers, 3000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-6 px-6 text-center">
        <h1 className="text-4xl font-light italic tracking-wide text-primary/80">
          Liste des chauffeurs
        </h1>

        <p className="mt-2 text-sm italic tracking-wider text-muted-foreground">
          Gestion élégante des chauffeurs et de leurs performances
        </p>

        <div className="mt-4 h-[1px] w-28 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>
      <ChauffeurDataTable data={data} />
    </div>
  );
};

export default ChauffeursPage;
