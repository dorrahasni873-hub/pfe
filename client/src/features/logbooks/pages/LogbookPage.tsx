import { useEffect, useState } from "react";
import type { CarnetDeBord } from "@/shared/types/types";
import { CarnetDeBordDataTable } from "@/features/logbooks/components/LogbookDataTable";
import { IconBook } from "@tabler/icons-react";
import { useCarnetDeBord } from "@/features/logbooks/hooks/useLogbooks";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { SqueletteTableau } from "@/shared/components/SqueletteTableau/SqueletteTableau";

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
    intervalId = setInterval(fetchCarnets, 3000);

    return () => clearInterval(intervalId);
  }, [getCarnets]);

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
