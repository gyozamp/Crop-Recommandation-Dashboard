import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import type { AvgDataEntry } from "../../hooks/useDashboardData";
import { getBaseBarOptions } from "../../constants/chartConfig";
import LoadingIndicator from "../Feedback/LoadingIndicator";

type MetricBarChartProps = {
  data: AvgDataEntry[];
  dataKey: keyof AvgDataEntry;
  label: string;
  color: string;
};

export default function MetricBarChart({
  data,
  dataKey,
  label,
  color,
}: MetricBarChartProps) {
  
  const labels = useMemo(() => data.map((d) => d.label), [data]);
  
  const dataValues = useMemo(
    () => data.map((d) => (d[dataKey] as number) ?? 0),
    [data, dataKey]
  );

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label,
          data: dataValues,
          backgroundColor: color,
          borderRadius: 6,
          barThickness: 15,
        },
      ],
    }),
    [labels, dataValues, label, color]
  );

  const options = useMemo(() => getBaseBarOptions(), []);

  return (
    <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
      <h4 className="text-md font-bold text-gray-700">{label}</h4>
      <div className="h-[280px] w-full">
        {data.length > 0 && labels.length > 0 ? (
          <Bar data={chartData} options={options} />
        ) : (
          <LoadingIndicator
            text={`Caricamento ${label}...`}
            className="h-full"
          />
        )}
      </div>
    </div>
  );
}
