import { IconUsers } from "@tabler/icons-react";
import { useUsers } from "@/features/users/hooks/useUsers";
import { UserDataTable } from "@/features/users/components/UserDataTable";
import EntetePage from "@/shared/components/EntetePage/EntetePage";

const PageUtilisateurs = () => {
  const { data, loading, refetch } = useUsers();

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des utilisateurs"
        description="Gestion des utilisateurs et de leurs rôles"
        icon={IconUsers}
      />
      <UserDataTable data={data} loading={loading} onRefresh={refetch} />
    </div>
  );
};

export default PageUtilisateurs;
