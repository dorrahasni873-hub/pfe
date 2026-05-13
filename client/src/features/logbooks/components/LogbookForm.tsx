import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCarnetDeBordSchema, type CreateCarnetDeBord, type CarnetDeBord } from "@/features/logbooks/types";
import type { Chauffeur } from "@/features/drivers/types";
import type { Vehicule } from "@/features/vehicles/types";
import { useLogbooks } from "@/features/logbooks/hooks/useLogbooks";
import { driverService } from "@/features/drivers/api/driverService";
import { vehicleService } from "@/features/vehicles/api/vehicleService";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { DialogClose } from "@/shared/components/ui/dialog";
import { Field, FieldLabel, FieldContent, FieldError } from "@/shared/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { toast } from "sonner";

type Props = { carnet?: CarnetDeBord };

export default function CarnetDeBordForm({ carnet }: Props) {
  const { create, update } = useLogbooks();
  const [chauffeurs, setChauffeurs] = useState<Chauffeur[]>([]);
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);

  const form = useForm<CreateCarnetDeBord>({
    resolver: zodResolver(createCarnetDeBordSchema),
    defaultValues: carnet ?? { dateDeDebut: "", dateDeFin: "", km_depart: 0, km_arrive: 0, id_chauffeur: "", matricule: "" },
  });

  useEffect(() => {
    Promise.all([driverService.getAll(), vehicleService.getAll()]).then(([c, v]) => { setChauffeurs(c ?? []); setVehicules(v ?? []); }).catch(() => toast.error("Erreur de chargement"));
  }, []);

  const onSubmit = async (values: CreateCarnetDeBord) => {
    try {
      if (carnet) { await update(carnet.id_carnet, values); toast.success("Carnet mis à jour"); }
      else { await create(values); toast.success("Carnet créé"); }
    } catch { toast.error("Une erreur est survenue"); }
  };

  const { errors } = form.formState;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Date début</FieldLabel>
          <FieldContent>
            <Input type="date" {...form.register("dateDeDebut")} />
            <FieldError errors={[errors.dateDeDebut]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Date fin</FieldLabel>
          <FieldContent>
            <Input type="date" {...form.register("dateDeFin")} />
            <FieldError errors={[errors.dateDeFin]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Km départ</FieldLabel>
          <FieldContent>
            <Input type="number" placeholder="Kilométrage départ" {...form.register("km_depart", { valueAsNumber: true })} />
            <FieldError errors={[errors.km_depart]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Km arrivée</FieldLabel>
          <FieldContent>
            <Input type="number" placeholder="Kilométrage arrivée" {...form.register("km_arrive", { valueAsNumber: true })} />
            <FieldError errors={[errors.km_arrive]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Chauffeur</FieldLabel>
          <FieldContent>
            <Select onValueChange={(v) => form.setValue("id_chauffeur", v)} defaultValue={carnet?.id_chauffeur}>
              <SelectTrigger><SelectValue placeholder="Chauffeur" /></SelectTrigger>
              <SelectContent>{chauffeurs.map((c) => <SelectItem key={c.id_chauffeur} value={c.id_chauffeur}>{c.nom} {c.prenom}</SelectItem>)}</SelectContent>
            </Select>
            <FieldError errors={[errors.id_chauffeur]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Véhicule</FieldLabel>
          <FieldContent>
            <Select onValueChange={(v) => form.setValue("matricule", v)} defaultValue={carnet?.matricule}>
              <SelectTrigger><SelectValue placeholder="Véhicule" /></SelectTrigger>
              <SelectContent>{vehicules.map((v) => <SelectItem key={v.matricule} value={v.matricule}>{v.matricule}</SelectItem>)}</SelectContent>
            </Select>
            <FieldError errors={[errors.matricule]} />
          </FieldContent>
        </Field>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1">{carnet ? "Modifier" : "Créer"}</Button>
        <DialogClose asChild><Button variant="outline" type="button">Annuler</Button></DialogClose>
      </div>
    </form>
  );
}
