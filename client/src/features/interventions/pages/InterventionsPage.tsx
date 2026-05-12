import { useEffect, useState } from "react";
import type { Entretien } from "@/shared/types/types";
import { EntretienDataTable } from "@/features/interventions/components/InterventionDataTable";
import { IconTools } from "@tabler/icons-react";
import { useEntretien } from "@/features/interventions/hooks/useInterventions";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { SqueletteTableau } from "@/shared/components/SqueletteTableau/SqueletteTableau";

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
    intervalId = setInterval(fetchEntretiens, 3000);

    return () => clearInterval(intervalId);
  }, [getEntretiens]);

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des entretiens"
        description="Suivi des interventions et réparations"
        icon={IconTools}
      />
      {loading ? <SqueletteTableau columns={6} rows={5} /> : <EntretienDataTable data={data} />}
    </div>
  );
};

export default EntretienPage;
