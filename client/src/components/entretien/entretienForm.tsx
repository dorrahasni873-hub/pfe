import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createEntretienSchema,
  type CreateEntretien,
  type Entretien,
  type Maintenance,
  type Panne,
  type Vehicule,
} from "@/@types/types";

import { useEntretien } from "@/hooks/useEntretien";
import { useVehicule } from "@/hooks/useVehicule";
import { useMaintenance } from "@/hooks/useMaintenance";
import { usePanne } from "@/hooks/usePanne";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EntretienFormProps {
  entretien?: Entretien;
}

export default function EntretienForm({ entretien }: EntretienFormProps) {
  const { createEntretien, updateEntretien } = useEntretien();

  const { getVehicules } = useVehicule();
  const { getMaintenances } = useMaintenance();
  const { getPannes } = usePanne();

  const [vehicules, setVehicules] = useState<Vehicule[]>([]);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [pannes, setPannes] = useState<Panne[]>([]);

  const form = useForm<CreateEntretien>({
    resolver: zodResolver(createEntretienSchema),
    defaultValues: entretien ?? {
      dateEntretien: "",
      typeIntervention: "",
      descriptionIntervention: "",
      etat: "",
      matricule: "",
      maintenanceId: "",
      panneId: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const v = await getVehicules();
      setVehicules(v ?? []);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const v = await getMaintenances();
      setMaintenances(v ?? []);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const p = await getPannes();

      setPannes(p ?? []);
    };

    fetchData();
  }, []);
  console.log("vehicle", vehicules);

  const onSubmit = async (values: CreateEntretien) => {
    if (entretien) {
      await updateEntretien(entretien.id_entretien, values);
    } else {
      await createEntretien(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Date */}
      <Input type="date" {...form.register("dateEntretien")} />

      {/* Type */}
      <Input
        placeholder="Type Intervention"
        {...form.register("typeIntervention")}
      />

      {/* Description */}
      <Input
        placeholder="Description Intervention"
        {...form.register("descriptionIntervention")}
      />

      {/* Etat */}
      <Input placeholder="État" {...form.register("etat")} />

      {/* VEHICULE SELECT */}
      <div>
        <label className="text-sm">Véhicule</label>
        <select
          className="w-full border rounded p-2"
          {...form.register("matricule")}
        >
          <option value="">Sélectionner un véhicule</option>
          {vehicules.map((v) => (
            <option key={v.matricule} value={v.matricule}>
              {v.matricule}
            </option>
          ))}
        </select>
      </div>

      {/* MAINTENANCE SELECT */}
      <div>
        <label className="text-sm">Maintenance</label>
        <select
          className="w-full border rounded p-2"
          {...form.register("maintenanceId")}
        >
          <option value="">Sélectionner une maintenance</option>
          {maintenances.map((m) => (
            <option key={m.id_maintenance} value={m.id_maintenance}>
              {m.description ?? m.id_maintenance}
            </option>
          ))}
        </select>
      </div>

      {/* PANNE SELECT */}
      <div>
        <label className="text-sm">Panne</label>
        <select
          className="w-full border rounded p-2"
          {...form.register("panneId")}
        >
          <option value="">Sélectionner une panne</option>
          {pannes.map((p) => (
            <option key={p.id_panne} value={p.id_panne}>
              {p.typePanne}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit">{entretien ? "Modifier" : "Créer"}</Button>
    </form>
  );
}
