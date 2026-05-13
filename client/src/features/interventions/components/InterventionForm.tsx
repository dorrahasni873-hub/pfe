import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEntretienSchema, type CreateEntretien, type Entretien } from "@/features/interventions/types";
import type { Maintenance } from "@/features/maintenance/types";
import type { Panne } from "@/features/breakdowns/types";
import type { Vehicule } from "@/features/vehicles/types";
import { useInterventions } from "@/features/interventions/hooks/useInterventions";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import { useMaintenance } from "@/features/maintenance/hooks/useMaintenance";
import { useBreakdowns } from "@/features/breakdowns/hooks/useBreakdowns";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { DialogClose } from "@/shared/components/ui/dialog";
import { Field, FieldLabel, FieldContent, FieldError } from "@/shared/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { toast } from "sonner";

type Props = { entretien?: Entretien };

export default function EntretienForm({ entretien }: Props) {
  const { create: createEntretien, update: updateEntretien } = useInterventions();
  const { getAll: getVehicules } = useVehicles();
  const { getAll: getMaintenances } = useMaintenance();
  const { getAll: getPannes } = useBreakdowns();
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [pannes, setPannes] = useState<Panne[]>([]);

  const form = useForm<CreateEntretien>({
    resolver: zodResolver(createEntretienSchema),
    defaultValues: entretien ?? { dateEntretien: "", typeIntervention: "", descriptionIntervention: "", etat: "", matricule: "", maintenanceId: "", panneId: "" },
  });

  useEffect(() => {
    Promise.all([getVehicules(), getMaintenances(), getPannes()]).then(([v, m, p]) => { setVehicules(v ?? []); setMaintenances(m ?? []); setPannes(p ?? []); }).catch(() => toast.error("Erreur de chargement"));
  }, []);

  const onSubmit = async (values: CreateEntretien) => {
    try {
      if (entretien) { await updateEntretien(entretien.id_entretien, values); toast.success("Entretien modifié"); }
      else { await createEntretien(values); toast.success("Entretien créé"); }
    } catch { toast.error("Une erreur est survenue"); }
  };

  const { errors } = form.formState;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Date entretien</FieldLabel>
          <FieldContent>
            <Input type="date" {...form.register("dateEntretien")} />
            <FieldError errors={[errors.dateEntretien]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Type d'intervention</FieldLabel>
          <FieldContent>
            <Select onValueChange={(v) => form.setValue("typeIntervention", v)} defaultValue={entretien?.typeIntervention}>
              <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="préventive">Préventive</SelectItem>
                <SelectItem value="corrective">Corrective</SelectItem>
              </SelectContent>
            </Select>
            <FieldError errors={[errors.typeIntervention]} />
          </FieldContent>
        </Field>
        <Field className="col-span-2">
          <FieldLabel>Description</FieldLabel>
          <FieldContent>
            <Input placeholder="Description de l'intervention" {...form.register("descriptionIntervention")} />
            <FieldError errors={[errors.descriptionIntervention]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>État</FieldLabel>
          <FieldContent>
            <Select onValueChange={(v) => form.setValue("etat", v)} defaultValue={entretien?.etat}>
              <SelectTrigger><SelectValue placeholder="État" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en_attente">En attente</SelectItem>
                <SelectItem value="en_cours">En cours</SelectItem>
                <SelectItem value="terminé">Terminé</SelectItem>
              </SelectContent>
            </Select>
            <FieldError errors={[errors.etat]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Véhicule</FieldLabel>
          <FieldContent>
            <Select onValueChange={(v) => form.setValue("matricule", v)} defaultValue={entretien?.matricule}>
              <SelectTrigger><SelectValue placeholder="Véhicule" /></SelectTrigger>
              <SelectContent>{vehicules.map((v) => <SelectItem key={v.matricule} value={v.matricule}>{v.matricule}</SelectItem>)}</SelectContent>
            </Select>
            <FieldError errors={[errors.matricule]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Maintenance</FieldLabel>
          <FieldContent>
            <Select onValueChange={(v) => form.setValue("maintenanceId", v)} defaultValue={entretien?.maintenanceId}>
              <SelectTrigger><SelectValue placeholder="Maintenance" /></SelectTrigger>
              <SelectContent>{maintenances.map((m) => <SelectItem key={m.id_maintenance} value={m.id_maintenance}>{m.description?.slice(0, 30)}</SelectItem>)}</SelectContent>
            </Select>
            <FieldError errors={[errors.maintenanceId]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Panne</FieldLabel>
          <FieldContent>
            <Select onValueChange={(v) => form.setValue("panneId", v)} defaultValue={entretien?.panneId}>
              <SelectTrigger><SelectValue placeholder="Panne" /></SelectTrigger>
              <SelectContent>{pannes.map((p) => <SelectItem key={p.id_panne} value={p.id_panne}>{p.typePanne}</SelectItem>)}</SelectContent>
            </Select>
            <FieldError errors={[errors.panneId]} />
          </FieldContent>
        </Field>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1">{entretien ? "Modifier" : "Créer"}</Button>
        <DialogClose asChild><Button variant="outline" type="button">Annuler</Button></DialogClose>
      </div>
    </form>
  );
}
