import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createPanneSchema,
  type Chauffeur,
  type CreatePanne,
  type Panne,
} from "@/@types/types";

import { usePanne } from "@/hooks/usePanne";
import { useChauffeur } from "@/hooks/useChauffeur";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  panne?: Panne;
};

export default function PanneForm({ panne }: Props) {
  const { createPanne, updatePanne } = usePanne();
  const { getChauffeurs } = useChauffeur();

  const [chauffeurs, setChauffeurs] = useState<Chauffeur[]>([]);

  const form = useForm({
    resolver: zodResolver(createPanneSchema),
    defaultValues: panne ?? {
      typePanne: "",
      dateDeclaration: "",
      chauffeurId: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const c = await getChauffeurs();

      setChauffeurs(c ?? []);
    };

    fetchData();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (values: CreatePanne) => {
    if (panne) {
      await updatePanne(panne.id_panne, values);
    } else {
      await createPanne(values);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Type panne */}
      <div>
        <label className="text-sm">Panne</label>

        <select
          className="w-full border rounded p-2"
          {...form.register("typePanne")}
        >
          <option value="">Sélectionner une panne</option>
          <option value="MECANIQUE">Mécanique</option>
          <option value="ELECTRIQUE">Électrique</option>
          <option value="HYDRAULIQUE">Hydraulique</option>
          <option value="CARROSSERIE">Carrosserie</option>
        </select>
      </div>
      {/* Date */}
      <Input type="date" {...form.register("dateDeclaration")} />

      {/* Chauffeur SELECT */}
      <div>
        <label className="text-sm">Chauffeur</label>
        <select
          className="w-full border rounded p-2"
          {...form.register("chauffeurId")}
        >
          <option value="">Sélectionner un chauffeur</option>
          {chauffeurs.map((c) => (
            <option key={c.id_chauffeur} value={c.id_chauffeur}>
              {c.nom} {c.prenom}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit">{panne ? "Modifier" : "Créer"}</Button>
    </form>
  );
}
