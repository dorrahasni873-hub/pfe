import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useVehicule } from "@/hooks/useVehicule";
import { useUser } from "@/hooks/useUser";

import type { Maintenance, User, Vehicule } from "@/@types/types";
import { useMaintenance } from "@/hooks/useMaintenance";

type Props = {
  maintenance?: Maintenance;
};

export default function MaintenanceForm({ maintenance }: Props) {
  const [formData, setFormData] = useState<Maintenance>({
    id_maintenance: maintenance?.id_maintenance ?? "",
    matricule: maintenance?.matricule ?? "",
    description: maintenance?.description ?? "",
    dateMaintenance: maintenance?.dateMaintenance ?? "",
    cout: maintenance?.cout ?? "",
    kilometrage: maintenance?.kilometrage ?? 0,
    prochainEntretien: maintenance?.prochainEntretien ?? "",
    id_utilisateur: maintenance?.id_utilisateur ?? "",
  });

  const [users, setUsers] = useState<User[]>([]);
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);

  const { getUsers } = useUser();
  const { getVehicules } = useVehicule();

  useEffect(() => {
    const fetchData = async () => {
      const u = await getUsers();
      const v = await getVehicules();

      setUsers(u || []);
      setVehicules(v || []);
    };

    fetchData();
  }, []);

  const handleChange = (field: keyof Maintenance, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ✅ Zod validation
  const schema = z.object({
    matricule: z.string().min(1),
    description: z.string().min(1),
    dateMaintenance: z.string().min(1),
    cout: z.string().min(1),
    kilometrage: z.number().min(0),
    prochainEntretien: z.string().min(1),
    id_utilisateur: z.string().min(1),
  });

  const { createMaintenance, updateMaintenance } = useMaintenance();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = schema.safeParse(formData);

    if (!result.success) {
      toast.error("Veuillez remplir tous les champs correctement");
      return;
    }

    try {
      if (maintenance) {
        console.log("UPDATE:", formData);
        toast.success("Maintenance modifiée avec succès");
        await updateMaintenance(maintenance.id_maintenance, formData);
      } else {
        console.log("CREATE:", formData);
        toast.success("Maintenance créée avec succès");
        await createMaintenance(formData);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Erreur serveur");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Description */}
      <Input
        placeholder="Description"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      {/* Date */}
      <Input
        type="date"
        value={formData.dateMaintenance}
        onChange={(e) => handleChange("dateMaintenance", e.target.value)}
      />

      {/* Cout */}
      <Input
        placeholder="Coût"
        value={formData.cout}
        onChange={(e) => handleChange("cout", e.target.value)}
      />

      {/* Kilometrage */}
      <Input
        type="number"
        placeholder="Kilométrage"
        value={formData.kilometrage}
        onChange={(e) => handleChange("kilometrage", Number(e.target.value))}
      />

      {/* Prochain entretien */}
      <Input
        type="date"
        value={formData.prochainEntretien}
        onChange={(e) => handleChange("prochainEntretien", e.target.value)}
      />

      {/* 🔹 Utilisateur */}
      <Select
        value={formData.id_utilisateur}
        onValueChange={(value) => handleChange("id_utilisateur", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Choisir un mainteneur" />
        </SelectTrigger>

        <SelectContent>
          {users.map((u) => (
            <SelectItem key={u.id_utilisateur} value={u.id_utilisateur}>
              {u.nom} {u.prenom}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 🔹 Véhicule (matricule = ID) */}
      <Select
        value={formData.matricule}
        onValueChange={(value) => handleChange("matricule", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Choisir un véhicule" />
        </SelectTrigger>

        <SelectContent>
          {vehicules.map((v) => (
            <SelectItem key={v.matricule} value={v.matricule}>
              {v.matricule}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button type="submit" className="w-full">
        {maintenance ? "Modifier" : "Créer"}
      </Button>
    </form>
  );
}
