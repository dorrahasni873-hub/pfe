import { IconTruck, IconTable, IconLayoutGrid } from "@tabler/icons-react";
import { useVehicles } from "@/features/vehicles/hooks/useVehicles";
import { VehiculeDataTable } from "@/features/vehicles/components/VehicleDataTable";
import { VehicleGallery } from "@/features/vehicles/components/VehicleGallery";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { ToggleGroup, ToggleGroupItem } from "@/shared/components/ui/toggle-group";
import { useState } from "react";

const VehiculesPage = () => {
  const { data, loading, refetch } = useVehicles();
  const [view, setView] = useState<"table" | "gallery">(
    () => (localStorage.getItem("vehicle-view") as "table" | "gallery") || "table"
  );

  const handleViewChange = (v: string) => {
    if (v === "table" || v === "gallery") {
      setView(v);
      localStorage.setItem("vehicle-view", v);
    }
  };

  return (
    <div className="py-6">
      <EntetePage
        title="Liste des véhicules"
        description="Gestion de votre flotte et performance de vos véhicules"
        icon={IconTruck}
      />
      <div className="px-4 lg:px-6 mb-4">
        <ToggleGroup type="single" value={view} onValueChange={handleViewChange}>
          <ToggleGroupItem value="table" className="gap-2">
            <IconTable className="size-4" />
            Tableau
          </ToggleGroupItem>
          <ToggleGroupItem value="gallery" className="gap-2">
            <IconLayoutGrid className="size-4" />
            Galerie
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {view === "gallery" ? (
        <div className="px-4 lg:px-6">
          <VehicleGallery data={data} />
        </div>
      ) : (
        <VehiculeDataTable data={data} loading={loading} onRefresh={refetch} />
      )}
    </div>
  );
};

export default VehiculesPage;
