import { useEffect } from "react";
import { CarnetDeBordDataTable } from "@/features/logbooks/components/LogbookDataTable";
import { IconBook } from "@tabler/icons-react";
import { useLogbooks } from "@/features/logbooks/hooks/useLogbooks";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { SqueletteTableau } from "@/shared/components/SqueletteTableau/SqueletteTableau";

const CarnetDeBordPage = () => {
  const { data, loading, error, refetch } = useLogbooks();

  useEffect(() => {
    const intervalId = setInterval(refetch, 3000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <div className="py-6">
      <EntetePage
        title="Carnets de bord"
        description="Suivi des trajets et kilométrages"
        icon={IconBook}
      />
      {loading ? <SqueletteTableau columns={6} rows={5} /> : <CarnetDeBordDataTable data={data} />}
    </div>
  );
};

export default CarnetDeBordPage;
