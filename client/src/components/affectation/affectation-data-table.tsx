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

import { useEffect, useState } from "react";
import { useChauffeur } from "@/hooks/useChauffeur";

// 🔹 Drag Handle
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button {...attributes} {...listeners} variant="ghost" size="icon">
      <IconGripVertical className="size-4" />
    </Button>
  );
}

// 🔹 Columns (now receives chauffeurMap)
const getColumns = (
  chauffeurMap: Record<string, string>,
): ColumnDef<z.infer<typeof affectationSchema>>[] => [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.matricule} />,
  },
  {
    accessorKey: "matricule",
    header: "Matricule",
  },
  {
    accessorKey: "id_chauffeur",
    header: "Chauffeur",
    cell: ({ row }) => {
      const id = row.original.id_chauffeur;
      return chauffeurMap[id] ?? "-";
    },
  },
  {
    accessorKey: "dateAffectation",
    header: "Date Affectation",
    cell: ({ row }) => {
      const d = row.original.dateAffectation;
      return d ? format(new Date(d), "dd/MM/yyyy") : "-";
    },
  },
  {
    accessorKey: "dateDebut",
    header: "Date Début",
    cell: ({ row }) => {
      const d = row.original.dateDebut;
      return d ? format(new Date(d), "dd/MM/yyyy") : "-";
    },
  },
  {
    accessorKey: "etat",
    header: "Etat",
    cell: ({ row }) => <Badge variant="outline">{row.original.etat}</Badge>,
  },
  {
    accessorKey: "typeAffectation",
    header: "Type Affectation",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.typeAffectation}</Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <AffectationActionsMenu row={row} />,
  },
];

// 🔹 Row
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
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

// 🔹 Table Component
export function AffectationDataTable({
  data: initialData,
}: {
  data: z.infer<typeof affectationSchema>[];
}) {
  const [data, setData] = useState(initialData);

  const [chauffeurs, setChauffeurs] = useState<Chauffeur[]>([]);

  const { getChauffeurs } = useChauffeur();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const c = await getChauffeurs();
        setChauffeurs(c || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chauffeurMap = React.useMemo(() => {
    return Object.fromEntries(
      chauffeurs.map((c) => [c.id_chauffeur, `${c.nom} ${c.prenom}`]),
    );
  }, [chauffeurs]);

  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  const columns = React.useMemo(() => getColumns(chauffeurMap), [chauffeurMap]);
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data.map((d) => d.matricule),
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
