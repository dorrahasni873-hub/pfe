import { useEffect } from "react";
import { IconUsers } from "@tabler/icons-react";
import { useUsers } from "@/features/users/hooks/useUsers";
import { UserDataTable } from "@/features/users/components/UserDataTable";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { SqueletteTableau } from "@/shared/components/SqueletteTableau/SqueletteTableau";

const PageUtilisateurs = () => {
  const { data, loading, error, refetch } = useUsers();

  useEffect(() => {
    const intervalId = setInterval(refetch, 3000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des utilisateurs"
        description="Gestion des utilisateurs et de leurs rôles"
        icon={IconUsers}
      />
      {loading ? <SqueletteTableau columns={6} rows={5} /> : <UserDataTable data={data} />}
    </div>
  );
};

export default PageUtilisateurs;
