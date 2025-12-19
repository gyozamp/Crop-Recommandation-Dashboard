export const CHART_COLORS: string[] = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
  "#0ea5e9",
  "#8b5cf6",
  "#ec4899",
  "#84cc16",
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




