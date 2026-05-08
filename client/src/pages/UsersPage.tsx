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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-6 px-6 text-center">
        <h1 className="text-4xl font-light italic tracking-wide text-primary/80">
          Liste des utilisateurs
        </h1>

        <p className="mt-2 text-sm italic tracking-wider text-muted-foreground">
          Gestion élégante de vos utilisateurs et rôles
        </p>

        <div className="mt-4 h-[1px] w-28 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>
      <UserDataTable data={data} />
    </div>
  );
};

export default UsersPage;
