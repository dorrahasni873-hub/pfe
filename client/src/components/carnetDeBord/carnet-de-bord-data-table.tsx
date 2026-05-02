"use client";

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
import { Badge } from "@/components/ui/badge";
import { IconGripVertical, IconPlus } from "@tabler/icons-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import CarnetDeBordForm from "./carnetDeBordForm";
import CarnetDeBordActionsMenu from "./carnet-de-bord-actions-menu";
import type { CarnetDeBord } from "@/@types/types";

/* =========================
   DRAG HANDLE
========================= */
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="size-4" />
    </Button>
  );
}

/* =========================
   COLUMNS (UNIFIED UI)
========================= */
const getColumns = (): ColumnDef<CarnetDeBord>[] => [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id_carnet} />,
  },
  {
    accessorKey: "dateDeDebut",
    header: "Début",
    cell: ({ row }) => {
      const date = row.original.dateDeDebut;
      return (
        <Badge variant="outline" className="text-muted-foreground px-2">
          {date ? format(new Date(date), "dd/MM/yyyy") : "-"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "dateDeFin",
    header: "Fin",
    cell: ({ row }) => {
      const date = row.original.dateDeFin;
      return (
        <Badge variant="outline" className="text-muted-foreground px-2">
          {date ? format(new Date(date), "dd/MM/yyyy") : "-"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "km_depart",
    header: "KM Départ",
    cell: ({ row }) => (
      <div className="text-sm">{row.original.km_depart ?? "-"}</div>
    ),
  },
  {
    accessorKey: "km_arrive",
    header: "KM Arrivée",
    cell: ({ row }) => (
      <div className="text-sm">{row.original.km_arrive ?? "-"}</div>
    ),
  },
  {
    accessorKey: "id_chauffeur",
    header: "Chauffeur",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {row.original.id_chauffeur ?? "-"}
      </div>
    ),
  },
  {
    accessorKey: "matricule",
    header: "Matricule",
    cell: ({ row }) => (
      <div className="text-sm">{row.original.matricule ?? "-"}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CarnetDeBordActionsMenu row={row} />,
  },
];

/* =========================
   DRAG ROW
========================= */
function DraggableRow({ row }: { row: Row<CarnetDeBord> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id_carnet,
  });

  return (
    <TableRow
      ref={setNodeRef}
      data-dragging={isDragging}
      className="data-[dragging=true]:opacity-70"
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

/* =========================
   MAIN COMPONENT
========================= */
export function CarnetDeBordDataTable({
  data: initialData,
}: {
  data: CarnetDeBord[];
}) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  const columns = React.useMemo(() => getColumns(), []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data.map((d) => d.id_carnet),
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
    <Tabs defaultValue="table" className="w-full flex-col gap-6">
      {/* HEADER ACTION */}
      <div className="flex justify-between px-4 lg:px-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <IconPlus className="mr-1 size-4" />
              Créer Carnet
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer Carnet de Bord</DialogTitle>
            </DialogHeader>

            <CarnetDeBordForm />
          </DialogContent>
        </Dialog>
      </div>

      <TabsContent value="table" className="px-4 lg:px-6">
        {/* TABLE WRAPPER */}
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
          >
            <Table>
              {/* HEADER */}
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id}>
                    {hg.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              {/* BODY */}
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
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between px-2 py-4 text-sm text-muted-foreground">
          <div>{data.length} carnet(s)</div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
