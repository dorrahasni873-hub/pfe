import * as React from "react";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type Row,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import {
  IconGripVertical,
  IconLayoutColumns,
  IconPlus,
} from "@tabler/icons-react";

import MaintenanceForm from "./maintenanceForm";
import MaintenanceActionsMenu from "./maintenanceActionsMenu";

import { useVehicule } from "@/hooks/useVehicule";
import type { Maintenance, User, Vehicule } from "@/@types/types";
import { useUser } from "@/hooks/useUser";

// 🔹 Drag Handle
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button {...attributes} {...listeners} variant="ghost" size="icon">
      <IconGripVertical className="size-4" />
    </Button>
  );
}

// 🔹 Columns
const getColumns = (
  userMap: Record<string, string>,
  vehiculeMap: Record<string, string>,
): ColumnDef<Maintenance>[] => [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id_maintenance} />,
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "dateMaintenance",
    header: "Date Maintenance",
    cell: ({ row }) =>
      row.original.dateMaintenance
        ? format(new Date(row.original.dateMaintenance), "dd/MM/yyyy")
        : "-",
  },
  {
    accessorKey: "cout",
    header: "Coût",
  },
  {
    accessorKey: "kilometrage",
    header: "Kilométrage",
  },
  {
    accessorKey: "prochainEntretien",
    header: "Prochain Entretien",
    cell: ({ row }) =>
      row.original.prochainEntretien
        ? format(new Date(row.original.prochainEntretien), "dd/MM/yyyy")
        : "-",
  },
  {
    accessorKey: "id_utilisateur",
    header: "Mainteneur",
    cell: ({ row }) => userMap[row.original.id_utilisateur] ?? "-",
  },
  {
    accessorKey: "matricule",
    header: "Matricule",
    cell: ({ row }) => vehiculeMap[row.original.matricule] ?? "-",
  },
  {
    id: "actions",
    cell: ({ row }) => <MaintenanceActionsMenu row={row} />,
  },
];

// 🔹 Draggable Row
function DraggableRow({ row }: { row: Row<Maintenance> }) {
  const { transform, transition, setNodeRef } = useSortable({
    id: row.original.id_maintenance,
  });

  return (
    <TableRow
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

// 🔹 Main Component
export function MaintenanceDataTable({
  data: initialData,
}: {
  data: Maintenance[];
}) {
  const [data, setData] = useState(initialData);

  const [users, setUsers] = useState<User[]>([]);
  const [vehicules, setVehicules] = useState<Vehicule[]>([]);

  const { getUsers } = useUser();
  const { getVehicules } = useVehicule();

  useEffect(() => {
    const fetchData = async () => {
      const u = await getUsers();
      const v = await getVehicules();

      setUsers((u || []).filter((user) => user.role === "maintenance"));
      setVehicules(v || []);
    };

    fetchData();
  }, []);

  const userMap = React.useMemo(() => {
    return Object.fromEntries(
      users.map((u) => [u.id_utilisateur, `${u.nom} ${u.prenom}`]),
    );
  }, [users]);

  const vehiculeMap = React.useMemo(() => {
    return Object.fromEntries(vehicules.map((v) => [v.matricule, v.matricule]));
  }, [vehicules]);

  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  const columns = React.useMemo(
    () => getColumns(userMap, vehiculeMap),
    [userMap, vehiculeMap],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data.map((d) => d.id_maintenance),
    [data],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setData((items) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over!.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <Tabs defaultValue="table" className="w-full">
      <div className="flex justify-between p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <IconLayoutColumns /> Colonnes
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            {table.getAllColumns().map((col) => (
              <DropdownMenuCheckboxItem
                key={col.id}
                checked={col.getIsVisible()}
                onCheckedChange={() => col.toggleVisibility()}
              >
                {col.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <IconPlus /> Créer Maintenance
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer Maintenance</DialogTitle>
            </DialogHeader>
            <MaintenanceForm />
          </DialogContent>
        </Dialog>
      </div>

      <TabsContent value="table">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              <SortableContext
                items={dataIds}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow key={row.id} row={row} />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      </TabsContent>
    </Tabs>
  );
}
