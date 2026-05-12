import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { DialogClose } from "@/shared/components/ui/dialog";
import { Field, FieldLabel, FieldContent, FieldError } from "@/shared/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { useVehicule } from "@/features/vehicles/hooks/useVehicles";
import { useUtilisateur } from "@/features/users/hooks/useUsers";
import { useMaintenance } from "@/features/maintenance/hooks/useMaintenance";
import type { Maintenance, User, Vehicule } from "@/shared/types/types";

const schema = z.object({
  matricule: z.string().min(1, "Véhicule requis"),
  description: z.string().min(1, "Description requise"),
  dateMaintenance: z.string().min(1, "Date requise"),
  cout: z.string().min(1, "Coût requis"),
  kilometrage: z.number().min(0, "Kilométrage invalide"),
  prochainEntretien: z.string().min(1, "Date requise"),
  id_utilisateur: z.string().min(1, "Mainteneur requis"),
});

type Props = { maintenance?: Maintenance };

export default function MaintenanceForm({ maintenance }: Props) {
  const [form, setForm] = useState({
    id_maintenance: maintenance?.id_maintenance ?? "",
    matricule: maintenance?.matricule ?? "",
    description: maintenance?.description ?? "",
    dateMaintenance: maintenance?.dateMaintenance ?? "",
    cout: maintenance?.cout ?? "",
    kilometrage: maintenance?.kilometrage ?? 0,
    prochainEntretien: maintenance?.prochainEntretien ?? "",
    id_utilisateur: maintenance?.id_utilisateur ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [users, setUsers] = useState<User[]>([]);
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);
  const { getUsers } = useUtilisateur();
  const { getVehicules } = useVehicule();
  const { createMaintenance, updateMaintenance } = useMaintenance();

  useEffect(() => {
    Promise.all([getUsers(), getVehicules()]).then(([u, v]) => { setUsers(u || []); setVehicules(v || []); });
  }, []);

  const set = (field: string, value: unknown) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      if (maintenance) { await updateMaintenance(maintenance.id_maintenance, form); toast.success("Maintenance modifiée"); }
      else { await createMaintenance(form); toast.success("Maintenance créée"); }
    } catch { toast.error("Erreur serveur"); }
  };

  const fields = [
    { key: "description", label: "Description", type: "text", placeholder: "Description" },
    { key: "dateMaintenance", label: "Date maintenance", type: "date" },
    { key: "cout", label: "Coût", type: "text", placeholder: "Coût (TND)" },
    { key: "kilometrage", label: "Kilométrage", type: "number", placeholder: "Kilométrage" },
    { key: "prochainEntretien", label: "Prochain entretien", type: "date" },
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {fields.map(({ key, label, type, placeholder }) => (
          <Field key={key} className={key === "description" ? "col-span-2" : ""}>
            <FieldLabel>{label}</FieldLabel>
            <FieldContent>
              <Input type={type} placeholder={placeholder} value={form[key] as string | number} onChange={(e) => set(key, key === "kilometrage" ? Number(e.target.value) : e.target.value)} />
              <FieldError errors={[{ message: errors[key] }]} />
            </FieldContent>
          </Field>
        ))}
        <Field>
          <FieldLabel>Mainteneur</FieldLabel>
          <FieldContent>
            <Select value={form.id_utilisateur} onValueChange={(v) => set("id_utilisateur", v)}>
              <SelectTrigger><SelectValue placeholder="Choisir un mainteneur" /></SelectTrigger>
              <SelectContent>{users.filter((u) => u.role === "maintenance").map((u) => <SelectItem key={u.id_utilisateur} value={u.id_utilisateur}>{u.nom} {u.prenom}</SelectItem>)}</SelectContent>
            </Select>
            <FieldError errors={[{ message: errors.id_utilisateur }]} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Véhicule</FieldLabel>
          <FieldContent>
            <Select value={form.matricule} onValueChange={(v) => set("matricule", v)}>
              <SelectTrigger><SelectValue placeholder="Choisir un véhicule" /></SelectTrigger>
              <SelectContent>{vehicules.map((v) => <SelectItem key={v.matricule} value={v.matricule}>{v.matricule}</SelectItem>)}</SelectContent>
            </Select>
            <FieldError errors={[{ message: errors.matricule }]} />
          </FieldContent>
        </Field>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1">{maintenance ? "Modifier" : "Créer"}</Button>
        <DialogClose asChild><Button variant="outline" type="button">Annuler</Button></DialogClose>
      </div>
    </form>
  );
}
