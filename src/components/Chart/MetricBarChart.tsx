import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import type { AvgDataEntry } from "../../hooks/useDashboardData";
import { getBaseBarOptions } from "../../constants/chartConfig";
import LoadingIndicator from "../Feedback/LoadingIndicator"; // Regola il percorso se la cartella è diversa

type MetricBarChartProps = {
  /** Array di dati aggregati per tutte le colture */
  data: AvgDataEntry[];
  /** Chiave dell’oggetto AvgDataEntry da visualizzare (es. 'avgN', 'avgPH', ecc.) */
  dataKey: keyof AvgDataEntry;
  /** Etichetta che compare nel titolo del grafico */
  label: string;
  /** Colore della serie di barre */
  color: string;
};

/**
 * Componente generico per visualizzare un grafico a barre a partire da
 * un array di AvgDataEntry e una metrica specifica.
 */
export default function MetricBarChart({
  data,
  dataKey,
  label,
  color,
}: MetricBarChartProps) {
  // Le etichette sull'asse X (nomi delle colture)
  const labels = useMemo(() => data.map((d) => d.label), [data]);
  // I valori sull'asse Y (valori medi della metrica)
  const dataValues = useMemo(
    () => data.map((d) => (d[dataKey] as number) ?? 0),
    [data, dataKey]
  );

  // Struttura dei dati per Chart.js
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

  // Opzioni del grafico (generate una volta sola)
  const options = useMemo(() => getBaseBarOptions(), []);

  return (
    <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
      <h4 className="text-md font-bold text-gray-700 mb-3">{label}</h4>
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
