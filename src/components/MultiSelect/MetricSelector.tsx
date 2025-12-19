import React from "react";
import type { MetricKey } from "../../hooks/useAnalyticsData";

type MetricSelectorProps = {
  selected: MetricKey;
  onSelect: (metric: MetricKey) => void;
};

const labels: Record<MetricKey, string> = {
  avgTemp: "Temperatura",
  avgPH: "pH",
  avgRain: "Pioggia",
};

export default function MetricSelector({
  selected,
  onSelect,
}: MetricSelectorProps) {
  const metrics: MetricKey[] = ["avgTemp", "avgPH", "avgRain"];
  return (
    <div className="flex space-x-2 bg-gray-50 p-1 rounded-lg">
      {metrics.map((key) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
            selected === key
              ? "bg-indigo-600 text-white shadow-md"
              : "text-gray-600 hover:bg-white"
          }`}
        >
          {labels[key]}
        </button>
      ))}
    </div>
  );
}
