import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, type CreateUser, type User } from "@/shared/types/types";
import { useUtilisateur } from "@/features/users/hooks/useUsers";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { DialogClose } from "@/shared/components/ui/dialog";
import { Field, FieldLabel, FieldContent, FieldError } from "@/shared/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { toast } from "sonner";

type Props = { user?: User };

export default function UserForm({ user }: Props) {
  const { createUser, updateUser } = useUtilisateur();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: user ?? { nom: "", prenom: "", email: "", motDePasse: "", role: "", tel: "" },
  });

  const onSubmit = async (values: CreateUser) => {
    try {
      if (user) { await updateUser(user.id_utilisateur, values); toast.success("Utilisateur mis à jour"); }
      else { await createUser(values); toast.success("Utilisateur créé"); }
    } catch { toast.error("Une erreur est survenue"); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Nom</FieldLabel>
          <FieldContent><Input {...register("nom")} placeholder="Nom" aria-invalid={!!errors.nom} /><FieldError errors={[errors.nom]} /></FieldContent>
        </Field>
        <Field>
          <FieldLabel>Prénom</FieldLabel>
          <FieldContent><Input {...register("prenom")} placeholder="Prénom" aria-invalid={!!errors.prenom} /><FieldError errors={[errors.prenom]} /></FieldContent>
        </Field>
        <Field className="col-span-2">
          <FieldLabel>Email</FieldLabel>
          <FieldContent><Input type="email" {...register("email")} placeholder="Email" aria-invalid={!!errors.email} /><FieldError errors={[errors.email]} /></FieldContent>
        </Field>
        <Field>
          <FieldLabel>Mot de passe</FieldLabel>
          <FieldContent><Input type="password" {...register("motDePasse")} placeholder="Mot de passe" aria-invalid={!!errors.motDePasse} /><FieldError errors={[errors.motDePasse]} /></FieldContent>
        </Field>
        <Field>
          <FieldLabel>Téléphone</FieldLabel>
          <FieldContent><Input {...register("tel")} placeholder="Téléphone" aria-invalid={!!errors.tel} /><FieldError errors={[errors.tel]} /></FieldContent>
        </Field>
        <Field className="col-span-2">
          <FieldLabel>Rôle</FieldLabel>
          <FieldContent>
            <Select onValueChange={(v) => setValue("role", v)} defaultValue={user?.role}>
              <SelectTrigger><SelectValue placeholder="Sélectionner un rôle" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <FieldError errors={[errors.role]} />
          </FieldContent>
        </Field>
      </div>
      <div className="flex gap-3 pt-2">
        <Button disabled={isSubmitting} type="submit" className="flex-1">{isSubmitting ? "En cours..." : user ? "Modifier" : "Créer"}</Button>
        <DialogClose asChild><Button variant="outline" type="button">Annuler</Button></DialogClose>
      </div>
    </form>
  );
}
