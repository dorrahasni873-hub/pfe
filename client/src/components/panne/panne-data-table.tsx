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
import { IconGripVertical, IconPlus } from "@tabler/icons-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import type { Panne } from "@/@types/types";
import PanneActionsMenu from "./panneActionsMenu";
import PanneForm from "./panneForm";

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
const getColumns = (): ColumnDef<Panne>[] => [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id_panne} />,
  },
  {
    accessorKey: "typePanne",
    header: "Type Panne",
  },
  {
    accessorKey: "dateDeclaration",
    header: "Date Déclaration",
    cell: ({ row }) =>
      row.original.dateDeclaration
        ? format(new Date(row.original.dateDeclaration), "dd/MM/yyyy")
        : "-",
  },
  {
    accessorKey: "chauffeurId",
    header: "Chauffeur",
  },
  {
    id: "actions",
    cell: ({ row }) => <PanneActionsMenu row={row} />,
  },
];

// 🔹 Draggable Row
function DraggableRow({ row }: { row: Row<Panne> }) {
  const { transform, transition, setNodeRef } = useSortable({
    id: row.original.id_panne,
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
export function PanneDataTable({ data: initialData }: { data: Panne[] }) {
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
    () => data.map((d) => d.id_panne),
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
              <IconPlus /> Créer Panne
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer Panne</DialogTitle>
            </DialogHeader>
            <PanneForm />
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
