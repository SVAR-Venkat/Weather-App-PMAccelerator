// exportUtils.js
export function exportToJSON(data, filename = "forecast.json") {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  downloadFile(url, filename);
}

export function exportToCSV(data, filename = "forecast.csv") {
  if (!data || !data.length) return;

  const headers = Object.keys(data[0]).join(",");
  const rows = data.map(row => Object.values(row).join(","));
  const csv = [headers, ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  downloadFile(url, filename);
}

function downloadFile(url, filename) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
