import { useEffect, useState } from "react";

import { useChauffeur } from "@/features/drivers/hooks/useDrivers";
import { useVehicule } from "@/features/vehicles/hooks/useVehicles";
import { GraphiqueRadialText } from "./GraphiqueRadialText";
import { GraphiquePannes } from "./GraphiquePannes";
import { usePanne } from "@/features/breakdowns/hooks/useBreakdowns";
import { useAffectation } from "@/features/assignments/hooks/useAssignments";
import { useMaintenance } from "@/features/maintenance/hooks/useMaintenance";
import { useCarnetDeBord } from "@/features/logbooks/hooks/useLogbooks";
import { useEntretien } from "@/features/interventions/hooks/useInterventions";
import { useUtilisateur } from "@/features/users/hooks/useUsers";
import {
  IconTruck,
  IconArrowsExchange,
  IconTools,
  IconSteeringWheel,
  IconAlertTriangle,
  IconUsers,
  IconBook,
  IconSettings,
} from "@tabler/icons-react";
import { useAuthentification } from "@/features/auth/hooks/useAuth";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function CartesSections() {
  const { getChauffeurs } = useChauffeur();
  const { getVehicules } = useVehicule();
  const { getPannes } = usePanne();
  const { getAffectations } = useAffectation();
  const { getMaintenances } = useMaintenance();
  const { getCarnets } = useCarnetDeBord();
  const { getEntretiens } = useEntretien();
  const { getUsers } = useUtilisateur();

  const [data, setData] = useState<Record<string, number> | null>(null);
  const { user } = useAuthentification();

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      const results: Record<string, number> = {};

      try {
        const chauffeurs = await getChauffeurs();
        results.chauffeurs = chauffeurs?.length || 0;
      } catch {
        results.chauffeurs = 0;
      }

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

      try {
        const affectations = await getAffectations();
        results.affectations = affectations?.length || 0;
      } catch {
        results.affectations = 0;
      }

      try {
        const maintenances = await getMaintenances();
        results.maintenances = maintenances?.length || 0;
      } catch {
        results.maintenances = 0;
      }

      try {
        const carnets = await getCarnets();
        results.carnets = carnets?.length || 0;
      } catch {
        results.carnets = 0;
      }

      try {
        const entretiens = await getEntretiens();
        results.entretiens = entretiens?.length || 0;
      } catch {
        results.entretiens = 0;
      }

      try {
        const users = await getUsers();
        results.utilisateurs = users?.length || 0;
      } catch {
        results.utilisateurs = 0;
      }

      if (!cancelled) setData(results);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  if (!data) {
    return (
      <div className="grid grid-cols-2 gap-3 px-4 lg:px-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <Skeleton key={i} className="h-[160px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-4 lg:px-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      <GraphiquePannes small />
      <GraphiqueRadialText
        small
        title="Véhicules"
        icon={IconTruck}
        value={data.vehicules}
        bg="from-sky-100 via-sky-200 to-sky-300 dark:from-sky-950 dark:via-sky-900 dark:to-sky-950"
      />
      {user?.role === "admin" && (
        <GraphiqueRadialText
          small
          title="Affectations"
          icon={IconArrowsExchange}
          value={data.affectations}
          bg="from-indigo-100 via-indigo-200 to-indigo-300 dark:from-indigo-950 dark:via-indigo-900 dark:to-indigo-950"
        />
      )}
      {user?.role === "admin" && (
        <GraphiqueRadialText
          small
          title="Maintenances"
          icon={IconTools}
          value={data.maintenances}
          bg="from-purple-100 via-purple-200 to-purple-300 dark:from-purple-950 dark:via-purple-900 dark:to-purple-950"
        />
      )}
      {user?.role === "admin" && (
        <GraphiqueRadialText
          small
          title="Chauffeurs"
          icon={IconSteeringWheel}
          value={data.chauffeurs}
          bg="from-emerald-100 via-emerald-200 to-emerald-300 dark:from-emerald-950 dark:via-emerald-900 dark:to-emerald-950"
        />
      )}
      <GraphiqueRadialText
        small
        title="Pannes"
        icon={IconAlertTriangle}
        value={data.pannes}
        bg="from-rose-100 via-rose-200 to-rose-300 dark:from-rose-950 dark:via-rose-900 dark:to-rose-950"
      />
      {user?.role === "admin" && (
        <GraphiqueRadialText
          small
          title="Utilisateurs"
          icon={IconUsers}
          value={data.utilisateurs}
          bg="from-amber-100 via-amber-200 to-amber-300 dark:from-amber-950 dark:via-amber-900 dark:to-amber-950"
        />
      )}
      {user?.role === "admin" && (
        <GraphiqueRadialText
          small
          title="Carnets de Bord"
          icon={IconBook}
          value={data.carnets}
          bg="from-teal-100 via-teal-200 to-teal-300 dark:from-teal-950 dark:via-teal-900 dark:to-teal-950"
        />
      )}
      {user?.role === "admin" && (
        <GraphiqueRadialText
          small
          title="Entretiens"
          icon={IconSettings}
          value={data.entretiens}
          bg="from-orange-100 via-orange-200 to-orange-300 dark:from-orange-950 dark:via-orange-900 dark:to-orange-950"
        />
      )}
    </div>
  );
}
