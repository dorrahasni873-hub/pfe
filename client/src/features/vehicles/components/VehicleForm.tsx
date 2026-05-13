import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VehiculeSchema,
  type Vehicule,
  type VehiculePayload,
} from "@/features/vehicles/types";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { DialogClose } from "@/shared/components/ui/dialog";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/shared/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { ChampDate } from "@/shared/components/ChampDate/ChampDate";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import { format } from "date-fns";
import { toast } from "sonner";

type Props = { vehicule?: Vehicule };

const VehiculeForm = ({ vehicule }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Vehicule>({
    resolver: zodResolver(VehiculeSchema),
    defaultValues: vehicule
      ? {
          ...vehicule,
          dateCirculation: new Date(vehicule.dateCirculation),
          dateVisite: new Date(vehicule.dateVisite),
          dateTaxe: new Date(vehicule.dateTaxe),
        }
      : { matricule: "", marqueVoiture: "", etat: "" },
  });

  const { create, update } = useVehicles();

  const onSubmit = async (data: Vehicule) => {
    try {
      const payload: VehiculePayload = {
        matricule: data.matricule,
        marqueVoiture: data.marqueVoiture,
        dateCirculation: format(data.dateCirculation, "yyyy-MM-dd"),
        dateVisite: format(data.dateVisite, "yyyy-MM-dd"),
        dateTaxe: format(data.dateTaxe, "yyyy-MM-dd"),
        etat: data.etat,
      };
      if (vehicule) {
        await update(vehicule.matricule, payload);
        toast.success("Véhicule mis à jour");
      } else {
        await create(payload);
        toast.success("Véhicule créé");
      }
    } catch {
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Matricule</FieldLabel>
          <FieldContent>
            <Input
              {...register("matricule")}
              placeholder="Matricule"
              disabled={!!vehicule}
              aria-invalid={!!errors.matricule}
            />
            <FieldError errors={[errors.matricule]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Marque</FieldLabel>
          <FieldContent>
            <Input
              {...register("marqueVoiture")}
              placeholder="Marque"
              aria-invalid={!!errors.marqueVoiture}
            />
            <FieldError errors={[errors.marqueVoiture]} />
          </FieldContent>
        </Field>
        <ChampDate
          label="Date de circulation"
          name="dateCirculation"
          watch={watch}
          setValue={setValue}
        />
        <ChampDate
          label="Date de visite"
          name="dateVisite"
          watch={watch}
          setValue={setValue}
        />
        <ChampDate
          label="Date de taxe"
          name="dateTaxe"
          watch={watch}
          setValue={setValue}
        />
        <Field>
          <FieldLabel>État</FieldLabel>
          <FieldContent>
            <Select
              onValueChange={(v) => setValue("etat", v)}
              defaultValue={vehicule?.etat}
            >
              <SelectTrigger>
                <SelectValue placeholder="État du véhicule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disponible">Disponible</SelectItem>
                <SelectItem value="en_service">En service</SelectItem>
                <SelectItem value="en_panne">En panne</SelectItem>
              </SelectContent>
            </Select>
            <FieldError errors={[errors.etat]} />
          </FieldContent>
        </Field>
      </div>
      <div className="flex gap-3 pt-2">
        <Button disabled={isSubmitting} type="submit" className="flex-1">
          {isSubmitting ? "En cours..." : vehicule ? "Modifier" : "Créer"}
        </Button>
        <DialogClose asChild>
          <Button variant="outline" type="button">
            Annuler
          </Button>
        </DialogClose>
      </div>
    </form>
  );
};

export default VehiculeForm;
