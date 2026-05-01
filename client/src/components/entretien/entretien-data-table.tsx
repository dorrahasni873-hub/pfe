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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import { IconGripVertical, IconPlus } from "@tabler/icons-react";

import type { Entretien } from "@/@types/types";
import EntretienActionsMenu from "./entretienActionsMenu";
import EntretienForm from "./entretienForm";

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
const getColumns = (): ColumnDef<Entretien>[] => [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id_entretien} />,
  },
  {
    accessorKey: "dateEntretien",
    header: "Date Entretien",
    cell: ({ row }) =>
      row.original.dateEntretien
        ? format(new Date(row.original.dateEntretien), "dd/MM/yyyy")
        : "-",
  },
  {
    accessorKey: "typeIntervention",
    header: "Type Intervention",
  },
  {
    accessorKey: "descriptionIntervention",
    header: "Description",
  },
  {
    accessorKey: "etat",
    header: "État",
  },
  {
    accessorKey: "matricule",
    header: "Matricule",
  },
  {
    accessorKey: "maintenanceId",
    header: "Maintenance",
  },
  {
    accessorKey: "panneId",
    header: "Panne",
  },
  {
    id: "actions",
    cell: ({ row }) => <EntretienActionsMenu row={row} />,
  },
];

// 🔹 Draggable Row
function DraggableRow({ row }: { row: Row<Entretien> }) {
  const { transform, transition, setNodeRef } = useSortable({
    id: row.original.id_entretien,
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
export function EntretienDataTable({
  data: initialData,
}: {
  data: Entretien[];
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
    () => data.map((d) => d.id_entretien),
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
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <IconPlus /> Créer Entretien
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer Entretien</DialogTitle>
            </DialogHeader>

            <EntretienForm />
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
