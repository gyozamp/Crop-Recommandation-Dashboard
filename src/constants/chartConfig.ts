// export const CHART_COLORS: string[] = [
//   "#6366f1",
//   "#10b981",
//   "#f59e0b",
//   "#f43f5e",
//   "#0ea5e9",
//   "#8b5cf6",
//   "#ec4899",
//   "#84cc16",
// ];

export const CHART_COLORS: string[] = [
  "#a7c7b7", // verde salvia
  "#9fb8ad", // verde menta spento
  "#b6c4a2", // verde oliva chiaro
  "#c9d6b5", // verde muschio chiaro

  "#d6a5a5", // rosso cipria
  "#c99b9b", // rosso polvere
  "#e0b4b4", // rosa antico
  "#f0c7c7", // rosa pastello

  "#a9b7c9", // blu polvere
  "#9fb3c8", // azzurro desaturato
  "#b7c7d6", // carta da zucchero
  "#c6d4e1", // azzurro grigio chiaro

  "#b7a9c9", // viola polvere
  "#c4b7d6", // lilla spento
  "#d6cde8", // lavanda chiaro

  "#c9b6a3", // beige caldo
  "#d6c7b7", // sabbia
  "#e4d6c9", // avorio rosato

  "#d1c4a8", // ocra chiaro
  "#e0d4a8", // senape pastello
  "#cbb7a2", // marrone chiaro soft
  "#e7dccf", // crema
];


export const CUSTOM_COLORS: Record<string, string> = {
  N: "#60a5fa",    // blue-400
  P: "#f87171",    // red-400
  K: "#4ade80",    // green-400
  Temp: "#fb923c", // orange-400
  PH: "#a78bfa",   // violet-400
  Rain: "#22d3ee", // cyan-400
};

export function getBaseBarOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: false },
      legend: { display: false },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "#ffffff",
        titleColor: "#111827",
        bodyColor: "#4b5563",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 10,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280", font: { size: 10 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#f3f4f6", borderDash: [4, 4] },
        ticks: { color: "#6b7280", font: { size: 10 } },
      },
    },
  };
}




