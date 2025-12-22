import ChartCard from "../components/Chart/ChartCard";
import DashboardKpis from "../components/Dashboard/DashboardKpis";
import CropDistributionCard from "../components/Dashboard/CropDistributionCard";
import DatasetStatsCard from "../components/Dashboard/DatasetStatsCard";
import DatasetInfoPanel from "../components/Dashboard/DatasetInfoPanel";
import useDashboardData from "../hooks/useDashboardData";
import MetricBarChart from "../components/Chart/MetricBarChart";
import { CUSTOM_COLORS } from "../constants/chartConfig";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function Dashboard() {

  const {
    pieData,
    avgData,
    totalCrops,
    uniqueCrops,
    avgTemperature,
    avgPH,
    avgRain,
    allSamples,
  } = useDashboardData();

  return (
    <>
      {/* KPI Cards */}
      <DashboardKpis
        totalCrops={totalCrops}
        uniqueCrops={uniqueCrops}
        avgTemperature={avgTemperature}
        avgPH={avgPH}
        avgRain={avgRain}
      />

      {/* Grafico Statistiche, Info Dataset */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 auto-rows-fr">

        {/* A. Grafico distribuzione */}
        <CropDistributionCard
          pieData={pieData}
          total={totalCrops}
          loading={pieData.length === 0 && allSamples.length === 0}
        />


        {/* Statistiche Dataset */}
        <DatasetStatsCard samples={allSamples} />


        {/* Info Dataset */}
        <DatasetInfoPanel samplesCount={allSamples.length} />

      </div>

      {/* 3. Grafici nutrienti NPK */}
      <div className="mb-8">
        <ChartCard
          title="Analisi dei Nutrienti"
          subtitle="Confronto dei livelli medi di Azoto (N), Fosforo (P) e Potassio (K) per ogni coltura"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricBarChart data={avgData} dataKey="avgN" label="Azoto (N)" color={CUSTOM_COLORS.N} />
            <MetricBarChart data={avgData} dataKey="avgP" label="Fosforo (P)" color={CUSTOM_COLORS.P} />
            <MetricBarChart data={avgData} dataKey="avgK" label="Potassio (K)" color={CUSTOM_COLORS.K} />
          </div>
        </ChartCard>
      </div>

      {/* 4. Grafici parametri ambientali */}
      <div className="mb-8">
        <ChartCard
          title="Analisi dei Parametri Ambientali"
          subtitle="Confronto dei livelli medi di Temperatura, pH e Pioggia per ogni coltura"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricBarChart data={avgData} dataKey="avgTemp" label="Temperatura (°C)" color={CUSTOM_COLORS.Temp} />
            <MetricBarChart data={avgData} dataKey="avgPH" label="pH (%)" color={CUSTOM_COLORS.PH} />
            <MetricBarChart data={avgData} dataKey="avgRain" label="Pioggia (mm)" color={CUSTOM_COLORS.Rain} />
          </div>
        </ChartCard>
      </div>

    </>
  );
}