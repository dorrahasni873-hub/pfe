import { useEffect, useState } from "react";
import type { Affectation } from "@/shared/types/types";
import { IconArrowsExchange } from "@tabler/icons-react";
import { useAffectation } from "@/features/assignments/hooks/useAssignments";
import { AffectationDataTable } from "@/features/assignments/components/AssignmentDataTable";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { SqueletteTableau } from "@/shared/components/SqueletteTableau/SqueletteTableau";

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

    fetchUsers();
    intervalId = setInterval(fetchUsers, 3000);

    return () => clearInterval(intervalId);
  }, [getAffectations]);

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des affectations"
        description="Gestion des conducteurs et de leurs affectations aux véhicules"
        icon={IconArrowsExchange}
      />
      {loading ? <SqueletteTableau columns={7} rows={5} /> : <AffectationDataTable data={data} />}
    </div>
  );
};

export default AffectationsPage;
