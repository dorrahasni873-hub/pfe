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
      <div className="flex flex-col items-center justify-center mb-6 px-6 text-center">
        <h1 className="text-4xl font-light italic tracking-wide text-primary/80">
          Liste des affectations
        </h1>

        <p className="mt-2 text-sm italic tracking-wider text-muted-foreground">
          Gestion élégante des conducteurs et affectations
        </p>

        <div className="mt-4 h-[1px] w-28 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>
      <AffectationDataTable data={data} />
    </div>
  );
};

export default AffectationsPage;
