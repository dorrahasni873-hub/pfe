import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { fr } from "react-day-picker/locale";
import { Calendar } from "@/shared/components/ui/calendar";
import { IconCalendarMonth, IconTools, IconTool } from "@tabler/icons-react";
import { maintenanceService } from "@/features/maintenance/api/maintenanceService";
import { interventionService } from "@/features/interventions/api/interventionService";
import EntetePage from "@/shared/components/EntetePage/EntetePage";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes";

type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  type: "maintenance" | "intervention";
  status: string;
  matricule: string;
};

const typeColors: Record<string, string> = {
  préventive: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  corrective: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  en_attente: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  en_cours: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  terminé: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
};

const CalendrierPage = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [maintenanceData, interventionData] = await Promise.all([
          maintenanceService.getAll(),
          interventionService.getAll(),
        ]);

        const maintenanceEvents: CalendarEvent[] = (maintenanceData ?? []).map((m) => ({
          id: m.id_maintenance,
          title: m.description,
          date: m.dateMaintenance,
          type: "maintenance" as const,
          status: "terminé",
          matricule: m.matricule,
        }));

        const nextMaintenanceEvents: CalendarEvent[] = (maintenanceData ?? [])
          .filter((m) => m.prochainEntretien)
          .map((m) => ({
            id: "next-" + m.id_maintenance,
            title: "Prochain entretien: " + m.description,
            date: m.prochainEntretien,
            type: "maintenance" as const,
            status: "en_attente",
            matricule: m.matricule,
          }));

        const interventionEvents: CalendarEvent[] = (interventionData ?? []).map((i) => ({
          id: i.id_entretien,
          title: i.descriptionIntervention,
          date: i.dateEntretien,
          type: "intervention" as const,
          status: i.etat,
          matricule: i.matricule,
        }));

        setEvents([...maintenanceEvents, ...nextMaintenanceEvents, ...interventionEvents]);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const eventDates = events.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
    const dateKey = event.date?.split("T")[0];
    if (dateKey) {
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(event);
    }
    return acc;
  }, {});

  const selectedDateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const selectedEvents = eventDates[selectedDateKey] || [];

  return (
    <div className="py-6 space-y-6">
      <EntetePage
        title="Calendrier"
        description="Visualisez les maintenances et interventions par date"
        icon={IconCalendarMonth}
      />

      <div className="grid gap-6 px-4 lg:px-6 lg:grid-cols-[400px_1fr]">
        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-[300px] w-full rounded-lg" />
              </div>
            ) : (
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                locale={fr}
                modifiers={{
                  hasEvent: Object.keys(eventDates).map((d) => new Date(d + "T00:00:00")),
                }}
                modifiersStyles={{
                  hasEvent: {
                    fontWeight: "bold",
                    textDecoration: "underline",
                    textDecorationColor: "var(--color-primary)",
                    textUnderlineOffset: "3px",
                  },
                }}
                formatters={{
                  formatCaption: (date) => format(date, "MMMM yyyy", { locale: fr }),
                  formatWeekdayName: (date) => format(date, "EEEEE", { locale: fr }),
                }}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedDate
                ? format(selectedDate, "dd MMMM yyyy", { locale: fr })
                : "Sélectionnez une date"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-lg" />
                ))}
              </div>
            ) : selectedEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Aucun événement pour cette date
              </p>
            ) : (
              <div className="space-y-3">
                {selectedEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={event.type === "maintenance" ? ROUTES.MAINTENANCES : ROUTES.ENTRETIENS}
                    className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50"
                  >
                    <div className="rounded-lg bg-primary/10 p-2 text-primary mt-0.5">
                      {event.type === "maintenance" ? (
                        <IconTool className="size-4" />
                      ) : (
                        <IconTools className="size-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{event.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {event.matricule}
                        {event.date.includes("T") && ` \u2022 ${format(parseISO(event.date), "HH:mm")}`}
                      </p>
                      <Badge
                        variant="outline"
                        className={`mt-1 text-[10px] px-1.5 py-0 ${
                          typeColors[event.status] || "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
                        }`}
                      >
                        {event.type === "maintenance" ? "Maintenance" : "Entretien"} - {event.status}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendrierPage;