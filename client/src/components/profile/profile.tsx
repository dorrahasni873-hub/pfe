import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  console.log("user", user);

  if (!user) return null;

  return (
    <div className="flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl rounded-2xl border bg-card p-8 shadow-sm">
        {/* HEADER */}
        
        <div className="flex flex-col items-center text-center">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-light text-primary">
            {user.prenom?.charAt(0)}
            {user.nom?.charAt(0)}
          </div>

          <h1 className="mt-4 text-2xl font-light italic tracking-wide text-primary/80">
            {user.prenom} {user.nom}
          </h1>

          <p className="text-sm text-muted-foreground italic tracking-wider">
            {user.role}
          </p>

          <div className="mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>

        {/* INFO GRID */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 text-sm">
          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground">Téléphone</p>
            <p className="font-medium">{user.tel}</p>
          </div>

          <div className="rounded-lg border p-4 sm:col-span-2">
            <p className="text-muted-foreground">Rôle</p>
            <p className="font-medium capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
