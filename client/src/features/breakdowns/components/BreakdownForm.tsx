import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPanneSchema, type CreatePanne, type Panne } from "@/features/breakdowns/types";
import type { Chauffeur } from "@/features/drivers/types";
import type { Vehicule } from "@/features/vehicles/types";
import { useBreakdowns } from "@/features/breakdowns/hooks/useBreakdowns";
import { useDrivers } from "@/features/drivers/hooks/useDrivers";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { DialogClose } from "@/shared/components/ui/dialog";
import { Field, FieldLabel, FieldContent, FieldError } from "@/shared/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { toast } from "sonner";

type Props = { panne?: Panne };

export default function PanneForm({ panne }: Props) {
  const { create: createPanne, update: updatePanne } = useBreakdowns();
  const { getAll: getChauffeurs } = useDrivers();
  const { getAll: getVehicules } = useVehicles();
  const [chauffeurs, setChauffeurs] = useState<Chauffeur[]>([]);
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);

  const form = useForm({
    resolver: zodResolver(createPanneSchema),
    defaultValues: panne ?? { typePanne: "", dateDeclaration: new Date().toISOString().split("T")[0], chauffeurId: "", matricule: "", status: "en_attente" },
  });

  useEffect(() => {
    Promise.all([getChauffeurs(), getVehicules()]).then(([c, v]) => { setChauffeurs(c ?? []); setVehicules(v ?? []); }).catch(() => toast.error("Erreur de chargement"));
  }, []);

  const onSubmit = async (values: CreatePanne) => {
    try {
      if (panne) { await updatePanne(panne.id_panne, values); toast.success("Panne mise à jour"); }
      else { await createPanne(values); toast.success("Panne créée"); }
    } catch { toast.error("Une erreur est survenue"); }
  };

  const { errors } = form.formState;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Type de panne</FieldLabel>
          <FieldContent>
            <Select onValueChange={(v) => form.setValue("typePanne", v)} defaultValue={panne?.typePanne}>
              <SelectTrigger><SelectValue placeholder="Type de panne" /></SelectTrigger>
              <SelectContent>
                {["MECANIQUE", "ELECTRIQUE", "HYDRAULIQUE", "CARROSSERIE", "PNEU", "FREIN", "MOTEUR"].map((t) => (
                  <SelectItem key={t} value={t}>{t.charAt(0) + t.slice(1).toLowerCase()}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError errors={[errors.typePanne]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Date de déclaration</FieldLabel>
          <FieldContent>
            <Input type="date" {...form.register("dateDeclaration")} />
            <FieldError errors={[errors.dateDeclaration]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Véhicule</FieldLabel>
          <FieldContent>
            <Select onValueChange={(v) => form.setValue("matricule", v)} defaultValue={panne?.matricule}>
              <SelectTrigger><SelectValue placeholder="Véhicule" /></SelectTrigger>
              <SelectContent>{vehicules.map((v) => <SelectItem key={v.matricule} value={v.matricule}>{v.marqueVoiture} ({v.matricule})</SelectItem>)}</SelectContent>
            </Select>
            <FieldError errors={[errors.matricule]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Chauffeur</FieldLabel>
          <FieldContent>
            <Select onValueChange={(v) => form.setValue("chauffeurId", v)} defaultValue={panne?.chauffeurId}>
              <SelectTrigger><SelectValue placeholder="Chauffeur" /></SelectTrigger>
              <SelectContent>{chauffeurs.map((c) => <SelectItem key={c.id_chauffeur} value={c.id_chauffeur}>{c.nom} {c.prenom}</SelectItem>)}</SelectContent>
            </Select>
            <FieldError errors={[errors.chauffeurId]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Statut</FieldLabel>
          <FieldContent>
            <Select onValueChange={(v) => form.setValue("status", v)} defaultValue={panne?.status || "en_attente"}>
              <SelectTrigger><SelectValue placeholder="Statut" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en_attente">En attente</SelectItem>
                <SelectItem value="en_cours">En cours</SelectItem>
                <SelectItem value="resolue">Résolue</SelectItem>
                <SelectItem value="annulee">Annulée</SelectItem>
              </SelectContent>
            </Select>
            <FieldError errors={[errors.status]} />
          </FieldContent>
        </Field>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1">{panne ? "Modifier" : "Créer"}</Button>
        <DialogClose asChild><Button variant="outline" type="button">Annuler</Button></DialogClose>
      </div>
    </form>
  );
}
