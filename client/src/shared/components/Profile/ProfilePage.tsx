import { useAuthentification } from "@/features/auth/hooks/useAuth";
import {
  IconMail,
  IconPhone,
  IconBadge,
  IconShield,
  IconCalendar,
  IconUserCircle,
} from "@tabler/icons-react";

const ProfilePage = () => {
  const { user } = useAuthentification();

  if (!user) return null;

  const initials = `${user.prenom?.charAt(0) ?? ""}${user.nom?.charAt(0) ?? ""}`;
  const roleColors: Record<string, string> = {
    admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    chauffeur: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    user: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  };
  const roleColor = roleColors[user.role] || "bg-gray-100 text-gray-700";

  return (
    <div className="flex items-center justify-center px-4 py-10 md:px-6">
      <div className="w-full max-w-2xl">
        <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl transition-all duration-500 hover:shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10 p-6 md:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-3xl font-semibold text-primary shadow-lg ring-4 ring-background">
                  {initials || "?"}
                </div>
                <div className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1.5 shadow-sm">
                  <IconUserCircle className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>

              <h1 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">
                {user.prenom} {user.nom}
              </h1>

              <span
                className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium capitalize ${roleColor}`}
              >
                <IconShield className="h-3 w-3" />
                {user.role}
              </span>
            </div>

            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="group rounded-xl border bg-card/50 p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20">
                    <IconMail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Email
                    </p>
                    <p className="mt-0.5 truncate text-sm font-medium">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="group rounded-xl border bg-card/50 p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20">
                    <IconPhone className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Téléphone
                    </p>
                    <p className="mt-0.5 truncate text-sm font-medium">{user.tel || "—"}</p>
                  </div>
                </div>
              </div>

              <div className="group rounded-xl border bg-card/50 p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20">
                    <IconBadge className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Nom complet
                    </p>
                    <p className="mt-0.5 truncate text-sm font-medium">
                      {user.nom} {user.prenom}
                    </p>
                  </div>
                </div>
              </div>

              <div className="group rounded-xl border bg-card/50 p-4 transition-all duration-200 hover:border-primary/30 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20">
                    <IconCalendar className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Rôle
                    </p>
                    <p className="mt-0.5 truncate text-sm font-medium capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
