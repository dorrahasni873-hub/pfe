import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VehiculeSchema,
  type Vehicule,
  type VehiculePayload,
} from "@/@types/types";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { useVehicule } from "@/hooks/useVehicule";
import { DatePickerField } from "@/components/DatePickerField";
import { format } from "date-fns";
import { toast } from "sonner";

// ✅ Select imports
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VehiculeFormProps {
  vehicule?: Vehicule;
}

const VehiculeForm = ({ vehicule }: VehiculeFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Vehicule>({
    resolver: zodResolver(VehiculeSchema),
    defaultValues: {
      matricule: vehicule?.matricule ?? "",
      marqueVoiture: vehicule?.marqueVoiture ?? "",

      dateCirculation: vehicule?.dateCirculation
        ? new Date(vehicule.dateCirculation)
        : undefined,

      dateVisite: vehicule?.dateVisite
        ? new Date(vehicule.dateVisite)
        : undefined,

      dateTaxe: vehicule?.dateTaxe ? new Date(vehicule.dateTaxe) : undefined,

      etat: vehicule?.etat ?? "",
    },
  });

  const { createVehicule, updateVehicule } = useVehicule();

  const onSubmit = async (data: Vehicule) => {
    try {
      const payload: VehiculePayload = {
        ...data,
        dateCirculation: format(data.dateCirculation, "yyyy-MM-dd"),
        dateVisite: format(data.dateVisite, "yyyy-MM-dd"),
        dateTaxe: format(data.dateTaxe, "yyyy-MM-dd"),
      };

      if (vehicule) {
        if (!vehicule.matricule) {
          toast.error("Véhicule invalide");
          return;
        }

        await updateVehicule(vehicule.matricule, payload);
        toast.success("Véhicule mis à jour avec succès");
      } else {
        await createVehicule(payload);
        toast.success("Véhicule créé avec succès");
      }
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue, veuillez réessayer");
    }
  };

  const etat = watch("etat");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Input
        {...register("matricule")}
        placeholder="Matricule"
        aria-invalid={!!errors.matricule}
      />
      {errors.matricule && (
        <span className="text-red-600 text-sm">{errors.matricule.message}</span>
      )}

      <Input
        {...register("marqueVoiture")}
        placeholder="Marque"
        aria-invalid={!!errors.marqueVoiture}
      />
      {errors.marqueVoiture && (
        <span className="text-red-600 text-sm">
          {errors.marqueVoiture.message}
        </span>
      )}

      <DatePickerField
        label="Date de circulation"
        name="dateCirculation"
        watch={watch}
        setValue={setValue}
      />

      <DatePickerField
        label="Date de visite"
        name="dateVisite"
        watch={watch}
        setValue={setValue}
      />

      <DatePickerField
        label="Date de taxe"
        name="dateTaxe"
        watch={watch}
        setValue={setValue}
      />

      <div className="flex flex-col gap-1">
        <Select value={etat} onValueChange={(value) => setValue("etat", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionner l'état" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectItem value="disponible">Disponible</SelectItem>
              <SelectItem value="en_panne">En panne</SelectItem>
              <SelectItem value="en_service">En service</SelectItem>
              <SelectItem value="hors_service">Hors service</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {errors.etat && (
          <span className="text-red-600 text-sm">{errors.etat.message}</span>
        )}
      </div>

      <Button disabled={isSubmitting} type="submit" className="w-full mt-2">
        {isSubmitting
          ? vehicule
            ? "Mise à jour en cours..."
            : "Création en cours..."
          : vehicule
            ? "Mettre à jour le véhicule"
            : "Créer le véhicule"}
      </Button>

      <DialogClose asChild>
        <Button type="button" variant="destructive">
          Annuler
        </Button>
      </DialogClose>
    </form>
  );
};

export default VehiculeForm;
