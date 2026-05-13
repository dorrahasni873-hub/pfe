import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { affectationSchema, type Affectation, type AffectationPayload } from "@/features/assignments/types";
import type { Chauffeur } from "@/features/drivers/types";
import type { Vehicule } from "@/features/vehicles/types";
import { Button } from "@/shared/components/ui/button";
import { DialogClose } from "@/shared/components/ui/dialog";
import { Field, FieldLabel, FieldContent, FieldError } from "@/shared/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { ChampDate } from "@/shared/components/ChampDate/ChampDate";
import { vehicleService } from "@/features/vehicles/api/vehicleService";
import { driverService } from "@/features/drivers/api/driverService";
import { useAssignments } from "@/features/assignments/hooks/useAssignments";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

type Props = { affectation?: Affectation };

const AffectationForm = ({ affectation }: Props) => {
  const { handleSubmit, watch, setValue, control, formState: { errors, isSubmitting } } = useForm<Affectation>({
    resolver: zodResolver(affectationSchema),
    defaultValues: affectation ? { ...affectation, dateAffectation: new Date(affectation.dateAffectation), dateDebut: new Date(affectation.dateDebut) } : { id_affectation: "", dateAffectation: new Date(), dateDebut: new Date(), typeAffectation: "", etat: "", id_chauffeur: "", matricule: "" },
  });

  const [chauffeurs, setChauffeurs] = useState<Chauffeur[]>([]);
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);
  const { create, update } = useAssignments();

  useEffect(() => {
    Promise.all([vehicleService.getAll(), driverService.getAll()]).then(([v, c]) => { setVehicules(v || []); setChauffeurs(c || []); }).catch(() => toast.error("Erreur de chargement"));
  }, []);

  const onSubmit = async (data: Affectation) => {
    try {
      const { id_affectation, ...rest } = data;
      const payload: AffectationPayload = { ...rest, dateAffectation: format(data.dateAffectation, "yyyy-MM-dd"), dateDebut: format(data.dateDebut, "yyyy-MM-dd") };
      if (affectation) { await update(affectation.id_affectation, payload); toast.success("Affectation mise à jour"); }
      else { await create(payload); toast.success("Affectation créée"); }
    } catch { toast.error("Une erreur est survenue"); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Chauffeur</FieldLabel>
          <FieldContent>
            <Controller control={control} name="id_chauffeur" render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue placeholder="Choisir un chauffeur" /></SelectTrigger>
                <SelectContent>{chauffeurs.map((c) => <SelectItem key={c.id_chauffeur} value={c.id_chauffeur}>{c.nom} {c.prenom}</SelectItem>)}</SelectContent>
              </Select>
            )} />
            <FieldError errors={[errors.id_chauffeur]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Véhicule</FieldLabel>
          <FieldContent>
            <Controller control={control} name="matricule" render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue placeholder="Choisir un véhicule" /></SelectTrigger>
                <SelectContent>{vehicules.map((v) => <SelectItem key={v.matricule} value={v.matricule}>{v.marqueVoiture} ({v.matricule})</SelectItem>)}</SelectContent>
              </Select>
            )} />
            <FieldError errors={[errors.matricule]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>État</FieldLabel>
          <FieldContent>
            <Select value={watch("etat")} onValueChange={(v) => setValue("etat", v)}>
              <SelectTrigger><SelectValue placeholder="État" /></SelectTrigger>
              <SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="terminee">Terminée</SelectItem></SelectContent>
            </Select>
            <FieldError errors={[errors.etat]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Type d'affectation</FieldLabel>
          <FieldContent>
            <Select value={watch("typeAffectation")} onValueChange={(v) => setValue("typeAffectation", v)}>
              <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent><SelectItem value="permanente">Permanente</SelectItem><SelectItem value="temporaire">Temporaire</SelectItem><SelectItem value="remplacement">Remplacement</SelectItem><SelectItem value="occasionnelle">Occasionnelle</SelectItem></SelectContent>
            </Select>
            <FieldError errors={[errors.typeAffectation]} />
          </FieldContent>
        </Field>
        <ChampDate label="Date début" name="dateDebut" watch={watch} setValue={setValue} />
        <ChampDate label="Date affectation" name="dateAffectation" watch={watch} setValue={setValue} />
      </div>
      <div className="flex gap-3 pt-2">
        <Button disabled={isSubmitting} type="submit" className="flex-1">{isSubmitting ? "En cours..." : affectation ? "Modifier" : "Créer"}</Button>
        <DialogClose asChild><Button variant="outline" type="button">Annuler</Button></DialogClose>
      </div>
    </form>
  );
};

export default AffectationForm;
