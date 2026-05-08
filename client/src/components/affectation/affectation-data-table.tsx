import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import {
  IconGripVertical,
  IconLayoutColumns,
  IconPlus,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";

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

import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import type { affectationSchema, Chauffeur } from "@/@types/types";
import { format } from "date-fns";
import AffectationActionsMenu from "./AffectationActionsMenu";
import AffectationForm from "./AffectationForm";

import { useEffect, useMemo, useState } from "react";
import { useChauffeur } from "@/hooks/useChauffeur";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

/* -------------------- Drag Handle -------------------- */
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button {...attributes} {...listeners} variant="ghost" size="icon">
      <IconGripVertical className="size-4" />
    </Button>
  );
}

/* -------------------- Columns -------------------- */
const getColumns = (
  chauffeurMap: Record<string, string>,
): ColumnDef<z.infer<typeof affectationSchema>>[] => [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.matricule} />,
  },

  // ✅ ADDED FROM DESIGN 1: row selection
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
    accessorKey: "matricule",
    header: "Matricule",
  },

  {
    accessorKey: "id_chauffeur",
    header: "Chauffeur",
    cell: ({ row }) => chauffeurMap[row.original.id_chauffeur] ?? "-",
  },

  {
    accessorKey: "dateAffectation",
    header: "Date Affectation",
    cell: ({ row }) =>
      row.original.dateAffectation
        ? format(new Date(row.original.dateAffectation), "dd/MM/yyyy")
        : "-",
  },

  {
    accessorKey: "dateDebut",
    header: "Date Début",
    cell: ({ row }) =>
      row.original.dateDebut
        ? format(new Date(row.original.dateDebut), "dd/MM/yyyy")
        : "-",
  },

  {
    accessorKey: "etat",
    header: "Etat",
    cell: ({ row }) => <Badge variant="outline">{row.original.etat}</Badge>,
  },

  {
    accessorKey: "typeAffectation",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.typeAffectation}</Badge>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <AffectationActionsMenu row={row} />,
  },
];

/* -------------------- Row -------------------- */
function DraggableRow({
  row,
}: {
  row: Row<z.infer<typeof affectationSchema>>;
}) {
  const { transform, transition, setNodeRef } = useSortable({
    id: row.original.matricule,
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

/* -------------------- Table -------------------- */
export function AffectationDataTable({
  data: initialData,
}: {
  data: z.infer<typeof affectationSchema>[];
}) {
  const [data, setData] = useState(initialData);
  const [chauffeurs, setChauffeurs] = useState<Chauffeur[]>([]);
  const { getChauffeurs } = useChauffeur();

  /* sync */
  useEffect(() => setData(initialData), [initialData]);

  /* fetch chauffeurs */
  useEffect(() => {
    (async () => {
      const res = await getChauffeurs();
      setChauffeurs(res || []);
    })();
  }, [getChauffeurs]);

  const chauffeurMap = useMemo(() => {
    return Object.fromEntries(
      chauffeurs.map((c) => [c.id_chauffeur, `${c.nom} ${c.prenom}`]),
    );
  }, [chauffeurs]);

  /* sensors */
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  const columns = useMemo(() => getColumns(chauffeurMap), [chauffeurMap]);

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true, // ✅ from design 1
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => data.map((d) => d.matricule),
    [data],
  );

  /* drag */
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
      {/* HEADER ACTIONS */}
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
              <IconPlus /> Créer Affectation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer Affectation</DialogTitle>
            </DialogHeader>
            <AffectationForm />
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
