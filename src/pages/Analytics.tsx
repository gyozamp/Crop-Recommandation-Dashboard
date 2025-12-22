import useAnalyticsData from "../hooks/useAnalyticsData";

// Layout / UI
import ChartCard from "../components/Chart/ChartCard";
import AnalyticsFilters from "../components/FilterSelect/AnalyticsFilters";

// Charts
import ScatterChart from "../components/Chart/ScatterChart";
//import HorizontalBarChart from "../components/Chart/HorizontalBarChart";

export default function Analytics() {
  const {
    // dati
    filteredSamples,
    //aggregatedAverages,
    cropLabels,

    // filtri colture
    selectedCrops,
    setSelectedCrops,
    toggleCropSelection,

    // range sliders
    tempRange,
    setTempRange,
    phRange,
    setPhRange,
    humidityRange,
    setHumidityRange,

    // metric selector
    //selectedMetric,
    //setSelectedMetric,

    // stato
    isLoading,
  } = useAnalyticsData();

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* --- FILTRI --- */}
        <AnalyticsFilters
          cropLabels={cropLabels}
          selectedCrops={selectedCrops}
          onToggleCrop={toggleCropSelection}
          onClearCrops={() => setSelectedCrops([])}
          tempRange={tempRange}
          onTempChange={setTempRange}
          phRange={phRange}
          onPhChange={setPhRange}
          humidityRange={humidityRange}
          onHumidityChange={setHumidityRange}
        />

        {/* --- GRAFICI --- */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-8">
            {/* Scatter */}
            <ChartCard
              title="Distribuzione Campioni per Condizioni"
              subtitle="Temperatura vs Umidità per i campioni che soddisfano i filtri"
            >
              <ScatterChart
                samples={filteredSamples}
                cropLabels={cropLabels}
                isLoading={isLoading}
                height={650}
              />
            </ChartCard>
          </div>
        </div>
      </div>
    </div>
  );
}






{/* Horizontal Bar */ }
// <ChartCard
//   title="Confronto Medie per Coltura"
//   subtitle="Metriche ambientali medie per coltura selezionata"
// >
//   <HorizontalBarChart
//     data={aggregatedAverages}
//     selectedMetric={selectedMetric}
//     onMetricChange={setSelectedMetric}
//     isLoading={isLoading}
//     height={500}
//   />
// </ChartCard>