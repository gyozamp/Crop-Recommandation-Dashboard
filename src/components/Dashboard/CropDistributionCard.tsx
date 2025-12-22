import { Doughnut } from "react-chartjs-2";
import LoadingIndicator from "../../components/Feedback/LoadingIndicator";
import EmptyState from "../../components/Feedback/EmptyState";
import { CHART_COLORS } from "../../constants/chartConfig";
import FilterPanel from "../../components/FilterSelect/FilterPanel";

type PieItem = {
  label: string;
  count: number;
};

type CropDistributionCardProps = {
  pieData: PieItem[];
  total: number;
  loading: boolean;
};

export default function CropDistributionCard({
  pieData,
  total,
  loading,
}: CropDistributionCardProps) {
  const hasData = pieData.length > 0;

  const doughnutData = {
    labels: pieData.map((d) => d.label),
    datasets: [
      {
        data: pieData.map((d) => d.count),
        backgroundColor: CHART_COLORS,
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "80%",
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
      {/* HEADER */}
      <FilterPanel
            title="Informazioni sul Dataset"
            subtitle="Dettagli e caratteristiche principali del dataset utilizzato"
            className="flex flex-col h-full"
      >
      <div className="flex flex-col flex-1">
        <div className="relative flex justify-center">
          <div className="relative h-[260px] w-[260px]">
            {loading ? (
              <LoadingIndicator className="h-full" />
            ) : hasData ? (
              <Doughnut data={doughnutData} options={doughnutOptions} />
            ) : (
              <EmptyState message="Nessun dato disponibile per il grafico." />
            )}

            {/* Totale centrale */}
            {!loading && hasData && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-extrabold text-gray-800">
                  {total}
                </span>
                <span className="text-xs text-gray-400 uppercase font-bold mt-1 tracking-wider">
                  Campioni
                </span>
              </div>
            )}
          </div>
        </div>

        {/* LEGENDA */}
        {!loading && hasData && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-xs">
              {pieData.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: CHART_COLORS[index] }}
                  />
                  <span className="font-medium truncate">{item.label}</span>
                  <span className="ml-auto text-gray-400">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      </FilterPanel>
    </div>
  );
}
