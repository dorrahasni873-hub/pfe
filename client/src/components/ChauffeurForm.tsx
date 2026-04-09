import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chauffeurSchema, type Chauffeur } from "@/@types/types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { DialogClose } from "./ui/dialog";
import { useChauffeur } from "@/hooks/useChauffeur";

interface ChauffeurFormProps {
  chauffeur?: Chauffeur;
}

const ChauffeurForm = ({ chauffeur: chauffeur }: ChauffeurFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Chauffeur>({
    resolver: zodResolver(chauffeurSchema),
    defaultValues: chauffeur
      ? {
          id: chauffeur.id,
          nom: chauffeur.nom,
          prenom: chauffeur.prenom,
          tel: chauffeur.tel,
          cin: chauffeur.cin,
          numeroPermis: chauffeur.numeroPermis,
        }
      : {},
  });

  const { createChauffeur, updateChauffeur } = useChauffeur();

  const onSubmit = async (data: Chauffeur) => {
    try {
      if (chauffeur) {
        console.log("data from form", data);

        if (!chauffeur.id) return toast.error("Utilisateur invalide");
        const updateResult = await updateChauffeur(chauffeur.id, data);
        if (updateResult) {
          toast("utilisateur mis à jour avec succès");
        }
      } else {
        const createResult = await createChauffeur(data);
        if (createResult) {
          toast("utilisateur créé avec succès");
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
        placeholder="Prénom"
        aria-invalid={!!errors.nom}
      />
      {errors.nom && (
        <span role="alert" className="text-red-600 text-sm">
          {errors.nom.message}
        </span>
      )}

      <Input
        {...register("prenom")}
        placeholder="Nom"
        aria-invalid={!!errors.prenom}
      />
      {errors.prenom && (
        <span role="alert" className="text-red-600 text-sm">
          {errors.prenom.message}
        </span>
      )}

      <Input
        {...register("tel")}
        placeholder="Téléphone"
        aria-invalid={!!errors.tel}
      />
      {errors.tel && (
        <span role="alert" className="text-red-600 text-sm">
          {errors.tel.message}
        </span>
      )}

      <Input
        {...register("cin")}
        placeholder="CIN"
        aria-invalid={!!errors.cin}
      />
      {errors.cin && (
        <span role="alert" className="text-red-600 text-sm">
          {errors.cin.message}
        </span>
      )}

      <Input
        {...register("numeroPermis")}
        placeholder="Numéro de permis"
        aria-invalid={!!errors.numeroPermis}
      />
      {errors.numeroPermis && (
        <span role="alert" className="text-red-600 text-sm">
          {errors.numeroPermis.message}
        </span>
      )}

      <Button disabled={isSubmitting} type="submit" className="w-full mt-2">
        {isSubmitting
          ? chauffeur
            ? "Mise à jour en cours..."
            : "Création en cours..."
          : chauffeur
            ? "Mettre à jour le utilisateur"
            : "Créer le utilisateur"}
      </Button>
      <DialogClose asChild>
        <Button variant={"destructive"} className="relative ">
          Annuler
        </Button>
      </DialogClose>
    </form>
  );
};

export default ChauffeurForm;
