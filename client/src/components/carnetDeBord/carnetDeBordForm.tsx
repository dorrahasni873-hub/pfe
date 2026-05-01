import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createCarnetDeBordSchema,
  type CreateCarnetDeBord,
  type CarnetDeBord,
  type Chauffeur,
  type Vehicule,
} from "@/@types/types";

import { useCarnetDeBord } from "@/hooks/useCarnetDeBord";
import { useChauffeur } from "@/hooks/useChauffeur";
import { useVehicule } from "@/hooks/useVehicule";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CarnetDeBordFormProps {
  carnet?: CarnetDeBord;
}

export default function CarnetDeBordForm({ carnet }: CarnetDeBordFormProps) {
  const { createCarnet, updateCarnet } = useCarnetDeBord();
  const { getChauffeurs } = useChauffeur();
  const { getVehicules } = useVehicule();

  const [chauffeurs, setChauffeurs] = useState<Chauffeur[]>([]);
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);

  const form = useForm<CreateCarnetDeBord>({
    resolver: zodResolver(createCarnetDeBordSchema),
    defaultValues: carnet ?? {
      dateDeDebut: "",
      dateDeFin: "",
      km_depart: 0,
      km_arrive: 0,
      id_chauffeur: "",
      matricule: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const c = await getChauffeurs();
      const v = await getVehicules();

      setChauffeurs(c ?? []);
      setVehicules(v ?? []);
    };

    fetchData();
  }, []);

  const onSubmit = async (values: CreateCarnetDeBord) => {
    if (carnet) {
      await updateCarnet(carnet.id_carnet, values);
    } else {
      await createCarnet(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Dates */}
      <Input type="date" {...form.register("dateDeDebut")} />
      <Input type="date" {...form.register("dateDeFin")} />

      {/* KM */}
      <Input
        type="number"
        placeholder="Kilométrage départ"
        {...form.register("km_depart", { valueAsNumber: true })}
      />

      <Input
        type="number"
        placeholder="Kilométrage arrivée"
        {...form.register("km_arrive", { valueAsNumber: true })}
      />

      {/* CHAUFFEUR SELECT */}
      <div>
        <label className="text-sm">Chauffeur</label>
        <select
          className="w-full border rounded p-2"
          {...form.register("id_chauffeur")}
        >
          <option value="">Sélectionner un chauffeur</option>
          {chauffeurs.map((c) => (
            <option key={c.id_chauffeur} value={c.id_chauffeur}>
              {c.nom} {c.prenom}
            </option>
          ))}
        </select>
      </div>

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

      <Button type="submit">{carnet ? "Modifier" : "Créer"}</Button>
    </form>
  );
}
