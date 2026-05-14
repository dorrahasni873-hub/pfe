import { IconBell, IconCalendar, IconCoin, IconTool } from "@tabler/icons-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useNotifications, type OverdueItem } from "@/features/notifications/hooks/useNotifications";

const typeConfig: Record<OverdueItem["type"], { icon: typeof IconBell; label: string }> = {
  visite: { icon: IconCalendar, label: "Visite technique" },
  taxe: { icon: IconCoin, label: "Taxe" },
  entretien: { icon: IconTool, label: "Entretien" },
};

export function NotificationBell() {
  const { overdue, total } = useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 relative">
          <IconBell className="size-4" />
          {total > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 size-4 p-0 text-[9px] flex items-center justify-center">
              {total > 9 ? "9+" : total}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 rounded-xl max-h-96 overflow-y-auto">
        <DropdownMenuLabel className="font-normal">
          {total === 0 ? "Aucun élément en retard" : `${total} élément(s) en retard`}
        </DropdownMenuLabel>
        {total > 0 && <DropdownMenuSeparator />}
        {overdue.slice(0, 20).map((item, i) => {
          const cfg = typeConfig[item.type];
          const Icon = cfg.icon;
          return (
            <div key={`${item.type}-${item.matricule}-${i}`} className="flex items-start gap-3 px-2 py-2.5 hover:bg-accent rounded-lg mx-1">
              <Icon className="size-4 text-destructive shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.label}</p>
                <p className="text-xs text-muted-foreground">{cfg.label} — {item.date}</p>
              </div>
              <span className="text-xs font-semibold text-destructive shrink-0">{item.daysOverdue > 0 ? `J+${item.daysOverdue}` : "Aujourd'hui"}</span>
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
