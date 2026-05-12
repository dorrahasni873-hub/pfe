import { GraphiqueKm } from "@/features/dashboard/components/GraphiqueKm";
import { CartesSections } from "@/features/dashboard/components/CartesSections";
import { CartesChauffeur } from "@/features/dashboard/components/CartesChauffeur";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

const PageOnglets = () => {
  return (
    <Tabs defaultValue="vehicles" className="w-full ">
      <TabsList variant="default" className="w-fit m-auto">
        <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
        <TabsTrigger value="users">Utilisateurs</TabsTrigger>
        <TabsTrigger value="chauffeurs">Chauffeurs</TabsTrigger>
        <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        <TabsTrigger value="affectations">Affectations</TabsTrigger>
        <TabsTrigger value="carnets">Carnets de Bord</TabsTrigger>
        <TabsTrigger value="entretiens">Entretiens</TabsTrigger>
        <TabsTrigger value="pannes">Pannes</TabsTrigger>
      </TabsList>
      <TabsContent value="vehicles">
        <div className="@container/main flex flex-1 flex-col gap-2">  
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex flex-col items-center justify-center mb-2 px-6 text-center">
              <p className="mt-2 text-sm italic tracking-wider text-muted-foreground">
                Vue globale élégante de votre activité et performance des
                véhicules
              </p>

              <div className="mt-4 h-[1px] w-28 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </div>

            <CartesSections />

            <div className="px-4 lg:px-6">
              <GraphiqueKm />
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="users"></TabsContent>
      <TabsContent value="chauffeurs">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex flex-col items-center justify-center mb-2 px-6 text-center">
              <p className="mt-2 text-sm italic tracking-wider text-muted-foreground">
                Vue globale élégante de votre activité et performance des
                chauffeurs
              </p>

              <div className="mt-4 h-[1px] w-28 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </div>

            <CartesChauffeur />

            <div className="px-4 lg:px-6">
              <GraphiqueKm />
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="maintenance"></TabsContent>
      <TabsContent value="affectations"></TabsContent>
      <TabsContent value="carnets"></TabsContent>
      <TabsContent value="entretiens"></TabsContent>
      <TabsContent value="pannes"></TabsContent>
    </Tabs>
  );
};

export default PageOnglets;
