import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconGripVertical,
  IconRefresh,
  IconSearch,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
  IconArrowsSort,
  IconDownload,
  IconFileTypeCsv,
  IconFileDescription,
  IconFileTypePdf,
} from "@tabler/icons-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Input } from "@/shared/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { exportToCsv, exportToJson, exportToPdf } from "./exportData";

function DraggableRow<T>({ row, id }: { row: Row<T>; id: string }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({ id });
  return (
    <TableRow
      ref={setNodeRef}
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      className="data-[dragging=true]:z-10 data-[dragging=true]:opacity-60 transition-opacity"
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
      ))}
    </TableRow>
  );
}

export type FiltreColonne = {
  columnId: string;
  label: string;
  options: { label: string; value: string }[];
  placeholder?: string;
};

type TableauDonneesProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  getRowId: (row: T) => string;
  title?: string;
  icon?: React.ComponentType<{ className?: string }>;
  createButton?: React.ReactNode;
  onDeleteSelected?: (ids: string[]) => Promise<void>;
  onRefresh?: () => Promise<void>;
  searchPlaceholder?: string;
  filters?: FiltreColonne[];
  emptyMessage?: string;
  loading?: boolean;
  skeletonRows?: number;
  exportFilename?: string;
};

export function TableauDonnees<T>({
  data: initialData,
  columns,
  getRowId,
  title,
  icon: Icon,
  createButton,
  onDeleteSelected,
  onRefresh,
  searchPlaceholder,
  filters = [],
  emptyMessage,
  loading = false,
  skeletonRows = 8,
  exportFilename,
}: TableauDonneesProps<T>) {
  const [data, setData] = React.useState(initialData);
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });
  const [deleting, setDeleting] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = React.useCallback(async () => {
    if (!onRefresh) return;
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setIsRefreshing(false);
    }
  }, [onRefresh]);

  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
    useSensor(KeyboardSensor),
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(() => data.map((row) => getRowId(row)), [data, getRowId]);

  const selectedIds = React.useMemo(() => {
    return Object.keys(rowSelection).filter((k) => rowSelection[k as keyof typeof rowSelection]);
  }, [rowSelection]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, rowSelection, columnFilters, pagination, globalFilter },
    getRowId: (row) => getRowId(row),
    enableSorting: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((prev) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  const handleDeleteSelected = async () => {
    if (!onDeleteSelected || selectedIds.length === 0) return;
    setDeleting(true);
    try {
      await onDeleteSelected(selectedIds);
      setRowSelection({});
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 px-4 lg:px-6">
          <div className="relative flex-1 max-w-sm">
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
          {createButton && <Skeleton className="h-9 w-32 rounded-lg" />}
        </div>
        <div className="overflow-hidden rounded-xl border shadow-sm">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                {columns.slice(0, Math.min(columns.length, 6)).map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: skeletonRows }).map((_, i) => (
                <TableRow key={i}>
                  {columns.slice(0, Math.min(columns.length, 6)).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 px-4 lg:px-6">
        {title && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {Icon && <Icon className="size-5 text-primary" />}
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            <Badge variant="secondary" className="font-mono text-xs px-1.5">
              {initialData.length}
            </Badge>
          </div>
        )}
        <div className="relative flex-1 max-w-sm min-w-[200px]">
          <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder || "Rechercher..."}
            className="pl-8 h-9 text-sm rounded-lg"
          />
        </div>

        {filters.map((filter) => {
          const currentValue = columnFilters.find((f) => f.id === filter.columnId)?.value as string | undefined;
          return (
            <Select
              key={filter.columnId}
              value={currentValue || ""}
              onValueChange={(v) => {
                setColumnFilters((prev) => {
                  const rest = prev.filter((f) => f.id !== filter.columnId);
                  return v && v !== "__all__" ? [...rest, { id: filter.columnId, value: v }] : rest;
                });
              }}
            >
              <SelectTrigger size="sm" className="w-[150px] h-9">
                <SelectValue placeholder={filter.placeholder || filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">Tous</SelectItem>
                {filter.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        })}

        <div className="flex items-center gap-2 ml-auto">
          {onRefresh && (
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing} className="size-9 p-0" title="Actualiser">
              <IconRefresh className={`size-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="size-9 p-0" title="Exporter">
                <IconDownload className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => exportToCsv(table.getFilteredRowModel().rows, columns, exportFilename || title || "export")}>
                <IconFileTypeCsv className="size-4 mr-2" />
                CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportToJson(table.getFilteredRowModel().rows, columns, exportFilename || title || "export")}>
                <IconFileDescription className="size-4 mr-2" />
                JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportToPdf(table.getFilteredRowModel().rows, columns, exportFilename || title || "export", title)}>
                <IconFileTypePdf className="size-4 mr-2" />
                PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedIds.length > 0 && onDeleteSelected && (
            <Button variant="destructive" size="sm" onClick={handleDeleteSelected} disabled={deleting} className="gap-2">
              <IconTrash className="size-4" />
              <span>Supprimer ({selectedIds.length})</span>
            </Button>
          )}
          {createButton}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="bg-muted/50 sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const sorted = header.column.getIsSorted();
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : header.column.getCanSort() ? (
                          <button
                            type="button"
                            onClick={header.column.getToggleSortingHandler()}
                            className="flex items-center gap-1.5 w-full text-left cursor-pointer select-none hover:text-foreground transition-colors"
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {sorted === "asc" ? (
                              <IconArrowUp className="size-3.5 shrink-0" />
                            ) : sorted === "desc" ? (
                              <IconArrowDown className="size-3.5 shrink-0" />
                            ) : (
                              <IconArrowsSort className="size-3.5 shrink-0 text-muted-foreground/40" />
                            )}
                          </button>
                        ) : (
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} id={getRowId(row.original)} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-40 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <div className="rounded-full bg-muted p-3">
                        <IconGripVertical className="size-6 opacity-40" />
                      </div>
                      <span className="text-sm">{emptyMessage || "Aucune donnée"}</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>

      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
          {table.getFilteredSelectedRowModel().rows.length} sur {table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s)
        </div>

        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <span className="text-sm text-muted-foreground">Lignes/page</span>
            <Select value={`${table.getState().pagination.pageSize}`} onValueChange={(v) => table.setPageSize(Number(v))}>
              <SelectTrigger size="sm" className="w-20">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 40, 50].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronsLeft className="size-4" />
            </Button>
            <Button variant="outline" className="size-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <IconChevronLeft className="size-4" />
            </Button>
            <Button variant="outline" className="size-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <IconChevronRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <IconChevronsRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
