import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAuthentification } from "@/features/auth/hooks/useAuth";
import { authService } from "@/features/auth/api/authService";
import { userService } from "@/features/users/api/userService";
import { driverService } from "@/features/drivers/api/driverService";
import {
  IconMail,
  IconPhone,
  IconBadge,
  IconShield,
  IconCalendar,
  IconUserCircle,
  IconEdit,
  IconCheck,
  IconX,
  IconLock,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Skeleton } from "@/shared/components/ui/skeleton";

const profileSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  prenom: z.string().min(1, "Le prénom est requis"),
  email: z.string().email("Email invalide"),
  tel: z.string().min(1, "Le téléphone est requis"),
});

type ProfileForm = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const { user, refreshUser } = useAuthentification();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    values: {
      nom: user?.nom || "",
      prenom: user?.prenom || "",
      email: user?.email || "",
      tel: user?.tel || "",
    },
  });

  if (!user) return null;

  const initials = `${user.prenom?.charAt(0) ?? ""}${user.nom?.charAt(0) ?? ""}`;
  const roleColors: Record<string, string> = {
    admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    chauffeur: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    user: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  };
  const roleColor = roleColors[user.role] || "bg-gray-100 text-gray-700";

  const onSave = async (data: ProfileForm) => {
    setSaving(true);
    try {
      if (user.role === "chauffeur") {
        await driverService.update((user as { id_chauffeur: string }).id_chauffeur, data);
      } else {
        await userService.update((user as { id_utilisateur: string }).id_utilisateur, data);
      }
      await refreshUser();
      toast.success("Profil mis à jour");
      setEditing(false);
    } catch {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setSaving(false);
    }
  };

  const onCancel = () => {
    reset();
    setEditing(false);
  };

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [changingPassword, setChangingPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    setChangingPassword(true);
    try {
      await authService.changePassword(passwordData.oldPassword, passwordData.newPassword);
      toast.success("Mot de passe mis à jour");
      setShowChangePassword(false);
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      toast.error("Ancien mot de passe incorrect");
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-10 md:px-6">
      <div className="w-full max-w-2xl">
        <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl transition-all duration-500 hover:shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10 p-6 md:p-8">
            <div className="flex items-start justify-between">
              <div className="flex flex-col items-center text-center flex-1">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-3xl font-semibold text-primary shadow-lg ring-4 ring-background">
                    {initials || "?"}
                  </div>
                  <div className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1.5 shadow-sm">
                    <IconUserCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>

                {!editing && (
                  <>
                    <h1 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">
                      {user.prenom} {user.nom}
                    </h1>
                    <span
                      className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium capitalize ${roleColor}`}
                    >
                      <IconShield className="h-3 w-3" />
                      {user.role}
                    </span>
                  </>
                )}
              </div>

              {!editing && (
                <Button variant="outline" size="sm" onClick={() => setEditing(true)} className="gap-2 shrink-0">
                  <IconEdit className="size-4" />
                  Modifier
                </Button>
              )}
            </div>

            <div className="mt-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {editing ? (
              <form onSubmit={handleSubmit(onSave)} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom</Label>
                    <Input id="nom" {...register("nom")} />
                    {errors.nom && (
                      <p className="text-xs text-destructive">{errors.nom.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input id="prenom" {...register("prenom")} />
                    {errors.prenom && (
                      <p className="text-xs text-destructive">{errors.prenom.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tel">Téléphone</Label>
                    <Input id="tel" {...register("tel")} />
                    {errors.tel && (
                      <p className="text-xs text-destructive">{errors.tel.message}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={onCancel} disabled={saving} className="gap-2">
                    <IconX className="size-4" />
                    Annuler
                  </Button>
                  <Button type="submit" disabled={saving} className="gap-2">
                    <IconCheck className="size-4" />
                    {saving ? "Enregistrement..." : "Enregistrer"}
                  </Button>
                </div>
              </form>
            ) : (
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
            )}

            {!editing && (
              <div className="mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowChangePassword(!showChangePassword)}
                  className="gap-2"
                >
                  <IconLock className="size-4" />
                  {showChangePassword ? "Annuler" : "Changer le mot de passe"}
                </Button>

                {showChangePassword && (
                  <form onSubmit={handleChangePassword} className="mt-4 space-y-4 rounded-xl border p-4">
                    <div className="space-y-2">
                      <Label htmlFor="oldPassword">Ancien mot de passe</Label>
                      <div className="relative">
                        <Input
                          id="oldPassword"
                          type={showOldPassword ? "text" : "password"}
                          value={passwordData.oldPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showOldPassword ? <IconEyeOff className="size-4" /> : <IconEye className="size-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showNewPassword ? <IconEyeOff className="size-4" /> : <IconEye className="size-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      />
                    </div>
                    <Button type="submit" disabled={changingPassword} className="gap-2">
                      <IconCheck className="size-4" />
                      {changingPassword ? "Mise à jour..." : "Mettre à jour"}
                    </Button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;