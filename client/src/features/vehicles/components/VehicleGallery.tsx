import { IconTruck, IconCalendar, IconShield, IconCoin, IconCar } from "@tabler/icons-react";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { Vehicule } from "@/features/vehicles/types";
import { format } from "date-fns";

const etatColors: Record<string, string> = {
  disponible: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  en_service: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  en_panne: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

const etatLabels: Record<string, string> = {
  disponible: "Disponible",
  en_service: "En service",
  en_panne: "En panne",
};

export function VehicleGallery({ data }: { data: Vehicule[] }) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
        <IconCar className="size-12 opacity-30" />
        <p className="text-sm">Aucun véhicule enregistré</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((vehicle) => (
        <Card key={vehicle.matricule} className="group hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2.5 group-hover:bg-primary/15 transition-colors">
                  <IconTruck className="size-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{vehicle.matricule}</CardTitle>
                  <p className="text-sm text-muted-foreground">{vehicle.marqueVoiture}</p>
                </div>
              </div>
              <Badge className={etatColors[vehicle.etat] || ""}>
                {etatLabels[vehicle.etat] || vehicle.etat}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <IconCalendar className="size-3.5 shrink-0" />
                <span>Mise en circ.:</span>
              </div>
              <span className="font-medium">{format(vehicle.dateCirculation, "dd/MM/yyyy")}</span>

              <div className="flex items-center gap-2 text-muted-foreground">
                <IconShield className="size-3.5 shrink-0" />
                <span>Visite tech.:</span>
              </div>
              <span className="font-medium">{format(vehicle.dateVisite, "dd/MM/yyyy")}</span>

              <div className="flex items-center gap-2 text-muted-foreground">
                <IconCoin className="size-3.5 shrink-0" />
                <span>Taxe:</span>
              </div>
              <span className="font-medium">{format(vehicle.dateTaxe, "dd/MM/yyyy")}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
