import { useEffect, useState } from "react";
import type { Affectation } from "@/@types/types";
import { useAffectation } from "@/hooks/useAffectations";
import { AffectationDataTable } from "@/components/affectation/affectation-data-table";

const AffectationsPage = () => {
  const { getAffectations } = useAffectation();
  const [data, setData] = useState<Affectation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    const fetchUsers = async () => {
      try {
        const affectations = await getAffectations();

        setData(affectations ?? []);
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
      <h1 className="text-2xl font-bold mb-4 px-6">Liste des affectations</h1>

      <AffectationDataTable data={data} />
    </div>
  );
};

export default AffectationsPage;
