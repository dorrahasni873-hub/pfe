import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  affectationSchema,
  type Affectation,
  type AffectationPayload,
  type Chauffeur,
  type Vehicule,
} from "@/@types/types";

import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { useVehicule } from "@/hooks/useVehicule";
import { useChauffeur } from "@/hooks/useChauffeur";
import { DatePickerField } from "@/components/DatePickerField";
import { format } from "date-fns";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { useAffectation } from "@/hooks/useAffectations";

interface AffectationFormProps {
  affectation?: Affectation;
}

const AffectationForm = ({ affectation }: AffectationFormProps) => {
  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Affectation>({
    resolver: zodResolver(affectationSchema),
    defaultValues: {
      id_affectation: affectation?.id_affectation ?? "",
      dateAffectation: affectation
        ? new Date(affectation.dateAffectation)
        : new Date(),
      dateDebut: affectation ? new Date(affectation.dateDebut) : new Date(),
      typeAffectation: affectation?.typeAffectation ?? "",
      etat: affectation?.etat ?? "",
      id_chauffeur: affectation?.id_chauffeur ?? "",
      matricule: affectation?.matricule ?? "",
    },
  });

  const [chauffeurs, setChauffeurs] = useState<Chauffeur[]>([]);
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);
  const { createAffectation, updateAffectation } = useAffectation();
  const { getVehicules } = useVehicule();
  const { getChauffeurs } = useChauffeur();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const v = await getVehicules();
        const c = await getChauffeurs();
        setVehicules(v || []);
        setChauffeurs(c || []);
      } catch (err) {
        console.error(err);
        toast.error("Erreur lors du chargement des données");
      }
    };

    fetchData();
  }, [getVehicules, getChauffeurs]);

  const onSubmit = async (data: Affectation) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id_affectation, ...rest } = data;

      const payload: AffectationPayload = {
        ...rest,
        dateAffectation: format(data.dateAffectation, "yyyy-MM-dd"),
        dateDebut: format(data.dateDebut, "yyyy-MM-dd"),
      };

      console.log("payload", payload);

      if (affectation) {
        if (!affectation.id_affectation)
          return toast.error("Affectation invalide");

        await updateAffectation(affectation.id_affectation, payload);
        toast.success("Affectation mise à jour avec succès");
      } else {
        await createAffectation(payload);
        toast.success("Affectation créée avec succès");
      }
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue, veuillez réessayer");
    }
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const etat = watch("etat");
  const typeAffectation = watch("typeAffectation");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Controller
        control={control}
        name="id_chauffeur"
        render={({ field }) => (
          <Select
            value={field.value ?? ""}
            onValueChange={(value) => field.onChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner le chauffeur" />
            </SelectTrigger>
            <SelectContent>
              {chauffeurs.map((c) => (
                <SelectItem key={c.id_chauffeur} value={c.id_chauffeur}>
                  {c.nom} {c.prenom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errors.id_affectation && (
        <span className="text-red-600 text-sm">
          {errors.id_affectation.message}
        </span>
      )}

      <Controller
        control={control}
        name="matricule"
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner le véhicule" />
            </SelectTrigger>
            <SelectContent>
              {vehicules.map((v) => (
                <SelectItem key={v.matricule} value={v.matricule}>
                  {v.marqueVoiture} ({v.matricule})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      <Select value={etat} onValueChange={(v) => setValue("etat", v)}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner l'état" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="disponible">Disponible</SelectItem>
          <SelectItem value="en_panne">En panne</SelectItem>
          <SelectItem value="en_service">En service</SelectItem>
          <SelectItem value="hors_service">Hors service</SelectItem>
        </SelectContent>
      </Select>
      {errors.etat && (
        <span className="text-red-600 text-sm">{errors.etat.message}</span>
      )}

      <Select
        value={typeAffectation}
        onValueChange={(v) => setValue("typeAffectation", v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner le type d'affectation" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="disponible">Disponible</SelectItem>
          <SelectItem value="en_panne">En panne</SelectItem>
          <SelectItem value="en_service">En service</SelectItem>
          <SelectItem value="hors_service">Hors service</SelectItem>
        </SelectContent>
      </Select>
      {errors.etat && (
        <span className="text-red-600 text-sm">{errors.etat.message}</span>
      )}

      <DatePickerField
        label="Date de début"
        name="dateDebut"
        watch={watch}
        setValue={setValue}
      />

      <DatePickerField
        label="Date d'affectation"
        name="dateAffectation"
        watch={watch}
        setValue={setValue}
      />

      <Button disabled={isSubmitting} type="submit" className="w-full mt-2">
        {isSubmitting
          ? affectation
            ? "Mise à jour en cours..."
            : "Création en cours..."
          : affectation
            ? "Mettre à jour l'affectation"
            : "Créer l'affectation"}
      </Button>

      <DialogClose asChild>
        <Button type="button" variant="destructive">
          Annuler
        </Button>
      </DialogClose>
    </form>
  );
};

export default AffectationForm;
