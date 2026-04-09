import { useEffect, useState } from "react";
import type { Chauffeur } from "@/@types/types";
import { ChauffeurDataTable } from "@/components/chauffeur-data-table";
import { useChauffeur } from "@/hooks/useChauffeur";

const DriversPage = () => {
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
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 px-6">Liste d'utilisateur</h1>

      <ChauffeurDataTable data={data} />
    </div>
  );
};

export default DriversPage;
