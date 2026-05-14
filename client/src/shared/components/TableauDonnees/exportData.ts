import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { ColumnDef, Row } from "@tanstack/react-table";

function getHeader(col: ColumnDef<unknown>): string {
  if (typeof col.header === "string") return col.header;
  if (typeof col.id === "string") return col.id;
  if (typeof col.accessorKey === "string") return col.accessorKey;
  return "";
}

function getValue(row: Record<string, unknown>, col: ColumnDef<unknown>): string {
  const key = typeof col.accessorKey === "string" ? col.accessorKey : col.id;
  if (!key) return "";
  const val = row[key];
  if (val == null) return "";
  if (val instanceof Date) return val.toLocaleDateString();
  return String(val);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function visibleColumns(cols: ColumnDef<unknown>[]): ColumnDef<unknown>[] {
  const hidden = ["selection", "drag"];
  return cols.filter((c) => {
    const id = c.id || c.accessorKey;
    return id && !hidden.includes(id as string);
  });
}

export function exportToCsv<T>(rows: Row<T>[], columns: ColumnDef<T>[], filename: string) {
  const cols = visibleColumns(columns as ColumnDef<unknown>[]);
  const headers = cols.map(getHeader);
  const data = rows.map((r) => {
    const raw = r.original as Record<string, unknown>;
    return cols.map((c) => {
      const val = getValue(raw, c);
      return val.includes(",") || val.includes('"') || val.includes("\n")
        ? `"${val.replace(/"/g, '""')}"`
        : val;
    });
  });

  const bom = "\uFEFF";
  const csv = bom + [headers.join(","), ...data.map((r) => r.join(","))].join("\n");
  downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8;" }), `${filename}.csv`);
}

export function exportToJson<T>(rows: Row<T>[], columns: ColumnDef<T>[], filename: string) {
  const cols = visibleColumns(columns as ColumnDef<unknown>[]);
  const headers = cols.map(getHeader);
  const data = rows.map((r) => {
    const raw = r.original as Record<string, unknown>;
    const obj: Record<string, string> = {};
    cols.forEach((c, i) => {
      obj[headers[i]] = getValue(raw, c);
    });
    return obj;
  });

  const json = JSON.stringify(data, null, 2);
  downloadBlob(new Blob([json], { type: "application/json" }), `${filename}.json`);
}

export function exportToPdf<T>(rows: Row<T>[], columns: ColumnDef<T>[], filename: string, title?: string) {
  const cols = visibleColumns(columns as ColumnDef<unknown>[]);
  const headers = cols.map(getHeader);
  const body = rows.map((r) => {
    const raw = r.original as Record<string, unknown>;
    return cols.map((c) => getValue(raw, c));
  });

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  if (title) {
    doc.setFontSize(14);
    doc.text(title, 14, 20);
  }
  autoTable(doc, {
    head: [headers],
    body,
    startY: title ? 28 : 14,
    styles: { fontSize: 7, cellPadding: 1.5 },
    headStyles: { fillColor: [99, 102, 241] },
  });
  doc.save(`${filename}.pdf`);
}
