import { useEffect, useState } from "react";
import { GraphiqueKm } from "@/features/dashboard/components/GraphiqueKm";
import { GraphiqueCamembert } from "@/features/dashboard/components/GraphiqueCamembert";
import { GraphiqueCoutMaintenance } from "@/features/dashboard/components/GraphiqueCoutMaintenance";
import { GraphiquePannesStatut } from "@/features/dashboard/components/GraphiquePannesStatut";
import { GraphiqueTypesPannes } from "@/features/dashboard/components/GraphiqueTypesPannes";

import { GraphiqueAffectationsType } from "@/features/dashboard/components/GraphiqueAffectationsType";
import { GraphiqueEntretiensType } from "@/features/dashboard/components/GraphiqueEntretiensType";
import { GraphiqueEntretiensEtat } from "@/features/dashboard/components/GraphiqueEntretiensEtat";
import { GraphiqueVehiculesAnnee } from "@/features/dashboard/components/GraphiqueVehiculesAnnee";
import { GraphiqueProchainsEntretiens } from "@/features/dashboard/components/GraphiqueProchainsEntretiens";
import { CartesSections } from "@/features/dashboard/components/CartesSections";
import { CartesChauffeur } from "@/features/dashboard/components/CartesChauffeur";
import { IconDashboard, IconChartBar, IconChartPie, IconAlertTriangle, IconCalendarClock } from "@tabler/icons-react";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { useAuthentification } from "@/features/auth/hooks/useAuth";
import { Skeleton } from "@/shared/components/ui/skeleton";

function SectionTitle({ icon: Icon, title, description, color }: { icon: React.ComponentType<{ className?: string }>; title: string; description: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-4 lg:px-6 py-2 rounded-lg" style={{ backgroundColor: color + "18" }}>
      <div className="flex items-center gap-2">
        <span style={{ color }}><Icon className="h-5 w-5" /></span>
        <h2 className="text-lg font-semibold tracking-tight" style={{ color }}>{title}</h2>
      </div>
      <p className="text-sm text-muted-foreground text-center">{description}</p>
    </div>
  );
}

const TableauDeBord = () => {
  const { user } = useAuthentification();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (!user) return null;

  if (loading) {
    return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex flex-col items-center gap-2 mb-8">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-[160px] w-full rounded-xl" />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 lg:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-[350px] w-full rounded-xl" />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 lg:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === "admin";
  const isChauffeur = user?.role === "chauffeur";

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="animate-in fade-in slide-in-from-top-4 duration-700">
            <EntetePage
              title="Tableau de bord"
              description="Vue globale de votre activité et performance"
              icon={IconDashboard}
            />
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            {isChauffeur ? <CartesChauffeur /> : <CartesSections />}
          </div>

          {!isChauffeur && (
            <>
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <SectionTitle
                  icon={IconChartBar}
                  title="Aperçu principal"
                  description="Indicateurs clés de performance"
                  color="#3b82f6"
                />
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 grid grid-cols-1 gap-4 px-4 lg:px-6 lg:grid-cols-2">
                <GraphiqueKm />
                {isAdmin && <GraphiqueCoutMaintenance />}
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                <SectionTitle
                  icon={IconChartPie}
                  title="Répartitions"
                  description="Distribution des éléments clés"
                  color="#a855f7"
                />
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 grid grid-cols-1 gap-4 px-4 lg:px-6 sm:grid-cols-2 lg:grid-cols-3">
                {isAdmin && <GraphiqueCamembert />}
                {isAdmin && <GraphiquePannesStatut />}
                {isAdmin && <GraphiqueAffectationsType />}
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
                <SectionTitle
                  icon={IconAlertTriangle}
                  title="Pannes et entretiens"
                  description="Analyse des pannes et interventions"
                  color="#f59e0b"
                />
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700 flex flex-row gap-4 px-4 lg:px-6">
                {isAdmin && <div className="flex-1 min-w-0"><GraphiqueEntretiensEtat /></div>}
                {isAdmin && <div className="flex-1 min-w-0"><GraphiqueTypesPannes /></div>}
                {isAdmin && <div className="flex-1 min-w-0"><GraphiqueProchainsEntretiens /></div>}
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1100">
                <SectionTitle
                  icon={IconCalendarClock}
                  title="Parc et interventions"
                  description="Vue d&apos;ensemble du parc et des entretiens"
                  color="#10b981"
                />
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1100 grid grid-cols-1 gap-4 px-4 lg:px-6 lg:grid-cols-2">
                {isAdmin && <GraphiqueVehiculesAnnee />}
                {isAdmin && <GraphiqueEntretiensType />}
              </div>
            </>
          )}

          {isChauffeur && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 grid grid-cols-1 gap-4 px-4 lg:px-6">
              <GraphiqueKm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableauDeBord;
