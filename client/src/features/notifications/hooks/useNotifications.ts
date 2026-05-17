import { useState, useEffect, useCallback } from "react";
import { vehicleService } from "@/features/vehicles/api/vehicleService";
import { maintenanceService } from "@/features/maintenance/api/maintenanceService";

export type OverdueItem = {
  type: "visite" | "taxe" | "entretien";
  matricule: string;
  label: string;
  date: string;
  daysOverdue: number;
};

export function useNotifications() {
  const [overdue, setOverdue] = useState<OverdueItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [vehicules, maintenances] = await Promise.all([
        vehicleService.getAll(),
        maintenanceService.getAll(),
      ]);

      const now = new Date();
      const items: OverdueItem[] = [];

      if (vehicules) {
        for (const v of vehicules) {
          const veh = v as Record<string, unknown>;
          const matricule = veh.matricule as string;
          const marque = veh.marque as string;
          const label = `${matricule} (${marque})`;

          if (veh.dateVisite) {
            const d = new Date(veh.dateVisite as string);
            if (!isNaN(d.getTime()) && d < now) {
              const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
              items.push({ type: "visite", matricule, label, date: veh.dateVisite as string, daysOverdue: diff });
            }
          }

          if (veh.dateTaxe) {
            const d = new Date(veh.dateTaxe as string);
            if (!isNaN(d.getTime()) && d < now) {
              const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
              items.push({ type: "taxe", matricule, label, date: veh.dateTaxe as string, daysOverdue: diff });
            }
          }
        }
      }

      if (maintenances) {
        for (const m of maintenances) {
          const mt = m as Record<string, unknown>;
          if (mt.prochainEntretien) {
            const d = new Date(mt.prochainEntretien as string);
            if (!isNaN(d.getTime()) && d < now) {
              const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
              const matricule = mt.matricule as string;
              items.push({
                type: "entretien",
                matricule,
                label: `${matricule} - ${(mt.description as string) || "Entretien"}`,
                date: mt.prochainEntretien as string,
                daysOverdue: diff,
              });
            }
          }
        }
      }

      items.sort((a, b) => b.daysOverdue - a.daysOverdue);
      setOverdue(items);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { overdue, loading, total: overdue.length, refetch: fetchData };
}
