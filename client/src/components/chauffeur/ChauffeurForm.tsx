import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateChauffeurSchema,
  type Chauffeur,
  type CreateChauffeur,
  type UpdateChauffeur,
} from "@/@types/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { DialogClose } from "../ui/dialog";
import { useChauffeur } from "@/hooks/useChauffeur";

interface ChauffeurFormProps {
  chauffeur?: Chauffeur;
}

const ChauffeurForm = ({ chauffeur }: ChauffeurFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateChauffeur>({
    resolver: zodResolver(updateChauffeurSchema),
    defaultValues: chauffeur
      ? {
          nom: chauffeur.nom,
          prenom: chauffeur.prenom,
          tel: chauffeur.tel,
          cin: chauffeur.cin,
          numeroPermis: chauffeur.numeroPermis,
          password: chauffeur.password,
          email: chauffeur.email,
        }
      : {
          nom: "",
          prenom: "",
          tel: "",
          cin: "",
          numeroPermis: "",
        },
  });

  const { createChauffeur, updateChauffeur } = useChauffeur();

  const onSubmit = async (data: UpdateChauffeur) => {
    console.log("🔥 FORM SUBMITTED", data);
    try {
      if (chauffeur) {
        const updateResult = await updateChauffeur(
          chauffeur.id_chauffeur,
          data,
        );

        if (updateResult) {
          toast.success("Utilisateur mis à jour avec succès");
        }
      } else {
        const createData: CreateChauffeur = {
          nom: data.nom ?? "",
          prenom: data.prenom ?? "",
          tel: data.tel ?? "",
          cin: data.cin ?? "",
          numeroPermis: data.numeroPermis ?? "",
          password: data.password ?? "",
          email: data.email ?? "",
        };

        const createResult = await createChauffeur(createData);

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
    <form
      onSubmit={handleSubmit(onSubmit, (errors) =>
        console.log("❌ VALIDATION ERRORS", errors),
      )}
    >
      {" "}
      <Input
        {...register("nom")}
        placeholder="nom"
        aria-invalid={!!errors.nom}
      />
      {errors.nom && (
        <span role="alert" className="text-red-600 text-sm">
          {errors.nom.message}
        </span>
      )}
      <Input
        {...register("prenom")}
        placeholder="prenom"
        aria-invalid={!!errors.prenom}
      />
      {errors.prenom && (
        <span role="alert" className="text-red-600 text-sm">
          {errors.prenom.message}
        </span>
      )}
      <Input
        {...register("email")}
        placeholder="Email"
        aria-invalid={!!errors.email}
      />
      {errors.email && (
        <span role="alert" className="text-red-600 text-sm">
          {errors.email.message}
        </span>
      )}
      <Input
        {...register("password")}
        placeholder="Mot de passe"
        aria-invalid={!!errors.password}
      />
      {errors.password && (
        <span role="alert" className="text-red-600 text-sm">
          {errors.password.message}
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
