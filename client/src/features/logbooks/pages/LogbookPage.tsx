import { CarnetDeBordDataTable } from "@/features/logbooks/components/LogbookDataTable";
import { IconBook } from "@tabler/icons-react";
import { useLogbooks } from "@/features/logbooks/hooks/useLogbooks";
import EntetePage from "@/shared/components/EntetePage/EntetePage";

const CarnetDeBordPage = () => {
  const { data, loading, refetch } = useLogbooks();

  return (
    <div className="py-6">
      <EntetePage
        title="Carnets de bord"
        description="Suivi des trajets et kilométrages"
        icon={IconBook}
      />
      <CarnetDeBordDataTable data={data} loading={loading} onRefresh={refetch} />
    </div>
  );
};

export default CarnetDeBordPage;
