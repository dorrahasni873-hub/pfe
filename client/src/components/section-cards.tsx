import { useEffect, useState } from "react";

import { useChauffeur } from "@/hooks/useChauffeur";
import { useVehicule } from "@/hooks/useVehicule";
import { ChartRadialText } from "./ChartRadialText";
import { ChartRadialStackedPannes } from "./ChartRadialStackedPannes";
import { usePanne } from "@/hooks/usePanne";
import { useAffectation } from "@/hooks/useAffectations";
import { useMaintenance } from "@/hooks/useMaintenance";
import {
  IconTruck,
  IconArrowsExchange,
  IconTools,
  IconSteeringWheel,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { useAuth } from "@/hooks/useAuth";
export function SectionCards() {
  const { getChauffeurs } = useChauffeur();
  const { getVehicules } = useVehicule();
  const { getPannes } = usePanne();
  const { getAffectations } = useAffectation();
  const { getMaintenances } = useMaintenance();

  const [chauffeurs, setChauffeurs] = useState(0);
  const [vehicules, setVehicules] = useState(0);
  const [pannes, setPannes] = useState(0);
  const [affectations, setAffectations] = useState(0);
  const [maintenances, setMaintenances] = useState(0);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const [c, v, p, a, m] = await Promise.all([
        getChauffeurs(),
        getVehicules(),
        getPannes(),
        getAffectations(),
        getMaintenances(),
      ]);

      setChauffeurs(c?.length || 0);
      setVehicules(v?.length || 0);
      setPannes(p?.length || 0);
      setAffectations(a?.length || 0);
      setMaintenances(m?.length || 0);
    };

    fetchData();
  }, [
    getChauffeurs,
    getVehicules,
    getPannes,
    getAffectations,
    getMaintenances,
  ]);

  return (
    <div className="flex flex-wrap gap-10 px-4 lg:px-6">
      <ChartRadialStackedPannes />
      <ChartRadialText
        title="Total Véhicules"
        icon={IconTruck}
        value={vehicules}
        description="Nombre total de véhicules"
        bg="from-sky-100 via-sky-200 to-sky-300"
      />
      {user?.role === "admin" && (
        <ChartRadialText
          title="Total Affectations"
          icon={IconArrowsExchange}
          value={affectations}
          description="Nombre total de affectations"
          bg="from-indigo-100 via-indigo-200 to-indigo-300"
        />
      )}
      {user?.role === "admin" && (
        <ChartRadialText
          title="Total Maintenances"
          icon={IconTools}
          value={maintenances}
          description="Nombre total de maintenances"
          bg="from-purple-100 via-purple-200 to-purple-300"
        />
      )}
      {user?.role === "admin" && (
        <ChartRadialText
          title="Total Chauffeurs"
          icon={IconSteeringWheel}
          value={chauffeurs}
          description="Nombre total de chauffeurs"
          bg="from-emerald-100 via-emerald-200 to-emerald-300"
        />
      )}
      <ChartRadialText
        title="Total Pannes"
        icon={IconAlertTriangle}
        value={pannes}
        description="Nombre total de pannes"
        bg="from-rose-100 via-rose-200 to-rose-300"
      />
    </div>
  );
}
