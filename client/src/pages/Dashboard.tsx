import { ChartVehicle } from "@/components/ChartKmBeforeAfter";
import { ChartPieInteractive } from "@/components/ChartPieInteractive";
import { SectionCards } from "@/components/section-cards";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="flex flex-col items-center justify-center mb-2 px-6 text-center">
            <h1 className="text-4xl font-light italic tracking-wide text-primary/80">
              Tableau de bord
            </h1>

            <p className="mt-2 text-sm italic tracking-wider text-muted-foreground">
              Vue globale élégante de votre activité et performance de dashboard
            </p>

            <div className="mt-4 h-[1px] w-28 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>

          <SectionCards />
          <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:px-6">
            <ChartVehicle />
            {user?.role === "admin" && <ChartPieInteractive />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
