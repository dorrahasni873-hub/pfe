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
import { Checkbox } from "@/components/ui/checkbox";

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
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";

import MaintenanceForm from "./maintenanceForm";
import MaintenanceActionsMenu from "./maintenanceActionsMenu";

import { useVehicule } from "@/hooks/useVehicule";
import type { Maintenance, User, Vehicule } from "@/@types/types";
import { useUser } from "@/hooks/useUser";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

/* ---------------- DRAG HANDLE ---------------- */
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button {...attributes} {...listeners} variant="ghost" size="icon">
      <IconGripVertical className="size-4" />
    </Button>
  );
}

/* ---------------- COLUMNS ---------------- */
const getColumns = (
  userMap: Record<string, string>,
  vehiculeMap: Record<string, string>,
): ColumnDef<Maintenance>[] => [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id_maintenance} />,
  },

  /* ✅ ADDED FROM DESIGN 1 */
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(v) => row.toggleSelected(!!v)}
        />
      </div>
    ),
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

/* ---------------- ROW ---------------- */
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
      data-state={row.getIsSelected() && "selected"}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

/* ---------------- MAIN TABLE ---------------- */
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

  /* sync */
  useEffect(() => setData(initialData), [initialData]);

  /* fetch */
  useEffect(() => {
    (async () => {
      const u = await getUsers();
      const v = await getVehicules();

      setUsers((u || []).filter((x) => x.role === "maintenance"));
      setVehicules(v || []);
    })();
  }, [getUsers, getVehicules]);

  const userMap = React.useMemo(
    () =>
      Object.fromEntries(
        users.map((u) => [u.id_utilisateur, `${u.nom} ${u.prenom}`]),
      ),
    [users],
  );

  const vehiculeMap = React.useMemo(
    () => Object.fromEntries(vehicules.map((v) => [v.matricule, v.matricule])),
    [vehicules],
  );

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
    enableRowSelection: true, // ✅ from design 1
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const dataIds = React.useMemo(
    () => data.map((d) => d.id_maintenance),
    [data],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setData((items) => {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  return (
    <Tabs defaultValue="table" className="w-full">
      {/* TOP BAR */}
      <div className="flex justify-between p-4">
     

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

      {/* TABLE */}
      <TabsContent value="table">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
        >
          <div className="rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 bg-muted">
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
          </div>
        </DndContext>

        {/* PAGINATION (FROM DESIGN 1) */}
        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} ligne sélectionnée.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Lignes par page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Aller à la première page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Aller à la page précédente</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Aller à la page suivante</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Aller à la dernière page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
