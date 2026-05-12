import { useEffect, useState } from "react";
import type { User } from "@/shared/types/types";
import { UserDataTable } from "@/features/users/components/UserDataTable";
import { IconUsers } from "@tabler/icons-react";
import { useUtilisateur } from "@/features/users/hooks/useUsers";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { SqueletteTableau } from "@/shared/components/SqueletteTableau/SqueletteTableau";

const PageUtilisateurs = () => {
  const { getUsers } = useUtilisateur();
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setData(users ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    intervalId = setInterval(fetchUsers, 3000);

    return () => clearInterval(intervalId);
  }, [getUsers]);

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
