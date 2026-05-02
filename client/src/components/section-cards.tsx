import { useEffect, useState } from "react";

import { useChauffeur } from "@/hooks/useChauffeur";
import { useVehicule } from "@/hooks/useVehicule";
import { ChartRadialText } from "./ChartRadialText";
import { ChartRadialStackedPannes } from "./ChartRadialStackedPannes";

export function SectionCards() {
  const { getChauffeurs } = useChauffeur();
  const { getVehicules } = useVehicule();

  const [chauffeurs, setChauffeurs] = useState(0);
  const [vehicules, setVehicules] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [c, v] = await Promise.all([getChauffeurs(), getVehicules()]);

      setChauffeurs(c?.length || 0);
      setVehicules(v?.length || 0);
    };

    fetchData();
  }, [getChauffeurs, getVehicules]);

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <ChartRadialStackedPannes />
      <ChartRadialText
        title="Total Véhicules"
        value={vehicules}
        description="Nombre total de véhicules"
        color="var(--chart-1)"
      />
      <ChartRadialText
        title="Total Chauffeurs"
        value={chauffeurs}
        description="Nombre total de chauffeurs"
        color="var(--chart-2)"
      />
    </div>
  );
}
