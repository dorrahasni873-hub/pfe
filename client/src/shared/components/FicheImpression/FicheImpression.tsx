type Section = { label: string; value: string };

type Props = {
  title: string;
  subtitle?: string;
  sections: Section[][];
};

export function openPrintFiche({ title, subtitle, sections }: Props) {
  const rows = sections
    .map(
      (group) => `
      <tr>
        ${group
          .map(
            (s) => `
          <td style="padding: 6px 12px; vertical-align: top; min-width: 140px;">
            <div style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">${s.label}</div>
            <div style="font-size: 14px; font-weight: 500; margin-top: 2px;">${s.value}</div>
          </td>`
          )
          .join("")}
      </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <style>
    @page { margin: 15mm; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; color: #111; padding: 20px; }
    .header { text-align: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #eee; }
    .header h1 { font-size: 22px; font-weight: 700; }
    .header p { font-size: 13px; color: #666; margin-top: 4px; }
    table { width: 100%; border-collapse: collapse; }
    td { border: 1px solid #e5e7eb; }
    .footer { text-align: center; margin-top: 32px; font-size: 11px; color: #999; }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${title}</h1>
    ${subtitle ? `<p>${subtitle}</p>` : ""}
  </div>
  <table>${rows}</table>
  <div class="footer">Généré par STS Béja — ${new Date().toLocaleDateString("fr-FR")}</div>
  <div class="no-print" style="text-align:center;margin-top:24px;">
    <button onclick="window.print()" style="padding:10px 24px;font-size:14px;cursor:pointer;">Imprimer</button>
  </div>
  <script>window.onload = function() { setTimeout(function() { window.print(); }, 500); };<\/script>
</body>
</html>`;

  const w = window.open("", "_blank", "width=800,height=600");
  if (w) {
    w.document.write(html);
    w.document.close();
  }
}
