import { useEffect, useState } from "react";
import type { User } from "@/@types/types";
import { UserDataTable } from "@/components/user/user-data-table";
import { useUser } from "@/hooks/useUser";

const UsersPage = () => {
  const { getUsers } = useUser();
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
    console.log(data);

    fetchUsers();
    // eslint-disable-next-line prefer-const
    intervalId = setInterval(fetchUsers, 3000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 px-6">Liste d'utilisateur</h1>

      <UserDataTable data={data} />
    </div>
  );
};

export default UsersPage;
