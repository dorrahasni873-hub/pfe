import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateChauffeurSchema, type Chauffeur, type CreateChauffeur, type UpdateChauffeur } from "@/features/drivers/types";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { DialogClose } from "@/shared/components/ui/dialog";
import { Field, FieldLabel, FieldContent, FieldError } from "@/shared/components/ui/field";
import { useDrivers } from "@/features/drivers/hooks/useDrivers";
import { toast } from "sonner";

type Props = { chauffeur?: Chauffeur };

const ChauffeurForm = ({ chauffeur }: Props) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UpdateChauffeur>({
    resolver: zodResolver(updateChauffeurSchema),
    defaultValues: chauffeur ?? { nom: "", prenom: "", tel: "", cin: "", numeroPermis: "", email: "" },
  });

  const { create: createChauffeur, update: updateChauffeur } = useDrivers();

  const onSubmit = async (data: UpdateChauffeur) => {
    try {
      if (chauffeur) {
        await updateChauffeur(chauffeur.id_chauffeur, data);
        toast.success("Chauffeur mis à jour");
      } else {
        await createChauffeur(data as CreateChauffeur);
        toast.success("Chauffeur créé");
      }
    } catch { toast.error("Une erreur est survenue"); }
  };

  const fields = [
    { name: "nom" as const, label: "Nom", placeholder: "Nom" },
    { name: "prenom" as const, label: "Prénom", placeholder: "Prénom" },
    { name: "email" as const, label: "Email", placeholder: "Email", type: "email" },
    { name: "password" as const, label: "Mot de passe", placeholder: "Mot de passe", type: "password" },
    { name: "tel" as const, label: "Téléphone", placeholder: "Téléphone" },
    { name: "cin" as const, label: "CIN", placeholder: "CIN" },
    { name: "numeroPermis" as const, label: "Numéro de permis", placeholder: "Numéro de permis" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {fields.map(({ name, label, placeholder, type }) => (
          <Field key={name} className={name === "numeroPermis" ? "col-span-2" : ""}>
            <FieldLabel>{label}</FieldLabel>
            <FieldContent>
              <Input {...register(name)} placeholder={placeholder} type={type} aria-invalid={!!errors[name]} />
              <FieldError errors={[errors[name]]} />
            </FieldContent>
          </Field>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <Button disabled={isSubmitting} type="submit" className="flex-1">
          {isSubmitting ? "En cours..." : chauffeur ? "Mettre à jour" : "Créer"}
        </Button>
        <DialogClose asChild>
          <Button variant="outline" type="button">Annuler</Button>
        </DialogClose>
      </div>
    </form>
  );
};

export default ChauffeurForm;
