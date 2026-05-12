import { useEffect, useState } from "react";
import { useVehicule } from "@/features/vehicles/hooks/useVehicles";
import { usePanne } from "@/features/breakdowns/hooks/useBreakdowns";
import { GraphiqueRadialText } from "./GraphiqueRadialText";
import { GraphiquePannes } from "./GraphiquePannes";
import { IconTruck, IconAlertTriangle } from "@tabler/icons-react";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function CartesChauffeur() {
  const { getVehicules } = useVehicule();
  const { getPannes } = usePanne();

  const [data, setData] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      const results: Record<string, number> = {};

      try {
        const vehicules = await getVehicules();
        results.vehicules = vehicules?.length || 0;
      } catch {
        results.vehicules = 0;
      }

      try {
        const pannes = await getPannes();
        results.pannes = pannes?.length || 0;
      } catch {
        results.pannes = 0;
      }

      if (!cancelled) setData(results);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  if (!data) {
    return (
      <div className="grid grid-cols-2 gap-3 px-4 lg:px-6 sm:grid-cols-3">
        <Skeleton className="h-[160px] w-full rounded-xl" />
        <Skeleton className="h-[160px] w-full rounded-xl" />
        <Skeleton className="h-[160px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-4 lg:px-6 sm:grid-cols-3">
      <GraphiquePannes small />
      <GraphiqueRadialText
        small
        title="Véhicules"
        icon={IconTruck}
        value={data.vehicules}
        bg="from-sky-100 via-sky-200 to-sky-300 dark:from-sky-950 dark:via-sky-900 dark:to-sky-950"
      />
      <GraphiqueRadialText
        small
        title="Pannes"
        icon={IconAlertTriangle}
        value={data.pannes}
        bg="from-rose-100 via-rose-200 to-rose-300 dark:from-rose-950 dark:via-rose-900 dark:to-rose-950"
      />
    </div>
  );
}
