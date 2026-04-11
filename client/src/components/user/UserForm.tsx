import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, type User } from "@/@types/types";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { DialogClose } from "../ui/dialog";
import { useUser } from "@/hooks/useUser";

// ✅ Select imports
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserFormProps {
  user?: User;
}

const UserForm = ({ user }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    resolver: zodResolver(UserSchema),
    defaultValues: user
      ? {
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          tel: user.tel,
          email: user.email,
          motDePasse: user.motDePasse,
          role: user.role,
        }
      : {
          role: "",
        },
  });

  const { createUser, updateUser } = useUser();

  const role = watch("role");

  const onSubmit = async (data: User) => {
    try {
      if (user) {
        console.log("data from form", data);

        if (!user.id) return toast.error("Utilisateur invalide");

        const updateResult = await updateUser(user.id, data);

        if (updateResult) {
          toast.success("Utilisateur mis à jour avec succès");
        }
      } else {
        const createResult = await createUser(data);

        if (createResult) {
          toast.success("Utilisateur créé avec succès");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue, veuillez réessayer");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Input
        {...register("nom")}
        placeholder="Nom"
        aria-invalid={!!errors.nom}
      />
      {errors.nom && (
        <span className="text-red-600 text-sm">{errors.nom.message}</span>
      )}

      <Input
        {...register("prenom")}
        placeholder="Prénom"
        aria-invalid={!!errors.prenom}
      />
      {errors.prenom && (
        <span className="text-red-600 text-sm">{errors.prenom.message}</span>
      )}

      <Input
        {...register("tel")}
        placeholder="Téléphone"
        aria-invalid={!!errors.tel}
      />
      {errors.tel && (
        <span className="text-red-600 text-sm">{errors.tel.message}</span>
      )}

      <Input
        {...register("email")}
        placeholder="Email"
        aria-invalid={!!errors.email}
      />
      {errors.email && (
        <span className="text-red-600 text-sm">{errors.email.message}</span>
      )}

      <Input
        {...register("motDePasse")}
        placeholder="Mot de passe"
        type="password"
        aria-invalid={!!errors.motDePasse}
      />
      {errors.motDePasse && (
        <span className="text-red-600 text-sm">
          {errors.motDePasse.message}
        </span>
      )}

      <div className="flex flex-col gap-1">
        <Select value={role} onValueChange={(value) => setValue("role", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionner un rôle" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {errors.role && (
          <span className="text-red-600 text-sm">{errors.role.message}</span>
        )}
      </div>

      <Button disabled={isSubmitting} type="submit" className="w-full mt-2">
        {isSubmitting
          ? user
            ? "Mise à jour en cours..."
            : "Création en cours..."
          : user
            ? "Mettre à jour l'utilisateur"
            : "Créer l'utilisateur"}
      </Button>

      <DialogClose asChild>
        <Button type="button" variant="destructive">
          Annuler
        </Button>
      </DialogClose>
    </form>
  );
};

export default UserForm;
