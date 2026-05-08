import { useEffect, useState } from "react";

import { useChauffeur } from "@/hooks/useChauffeur";
import { ChartRadialText } from "./ChartRadialText";
import { ChartRadialStackedPannes } from "./ChartRadialStackedPannes";

export function SectionCardsChauffeur() {
  const { getChauffeurs } = useChauffeur();

  const [chauffeurs, setChauffeurs] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [c] = await Promise.all([getChauffeurs()]);

      setChauffeurs(c?.length || 0);
    };

    fetchData();
  }, [getChauffeurs]);

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <ChartRadialStackedPannes />
      <ChartRadialText
        title="Total Chauffeurs"
        value={chauffeurs}
        description="Nombre total de chauffeurs"
        color="var(--chart-1)"
      />
    </div>
  );
}
