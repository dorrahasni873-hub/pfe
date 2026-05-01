import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createUserSchema, type CreateUser, type User } from "@/@types/types";

import { useUser } from "@/hooks/useUser";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserFormProps {
  user?: User;
}

export default function UserForm({ user }: UserFormProps) {
  const { createUser, updateUser } = useUser();

  const form = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: user ?? {
      nom: "",
      prenom: "",
      email: "",
      motDePasse: "",
      role: "",
      tel: "",
    },
  });

  const onSubmit = async (values: CreateUser) => {
    if (user) {
      await updateUser(user.id_utilisateur, values);
    } else {
      await createUser(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Nom" {...form.register("nom")} />
      <Input placeholder="Prénom" {...form.register("prenom")} />
      <Input type="email" placeholder="Email" {...form.register("email")} />
      <Input
        type="password"
        placeholder="Mot de passe"
        {...form.register("motDePasse")}
      />

      {/* ROLE SELECT */}
      <div>
        <label className="text-sm">Rôle</label>
        <select
          className="w-full border rounded p-2"
          {...form.register("role")}
        >
          <option value="">Sélectionner un rôle</option>
          <option value="admin">Admin</option>
          <option value="chauffeur">Chauffeur</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <Input placeholder="Téléphone" {...form.register("tel")} />

      <Button type="submit">{user ? "Modifier" : "Créer"}</Button>
    </form>
  );
}
