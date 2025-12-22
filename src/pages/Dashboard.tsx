import { useMemo } from "react";

import FilterPanel from "../components/FilterSelect/FilterPanel";


//import components/Card
import ChartCard from "../components/Chart/ChartCard";
import KpiGrid from "../components/Card/KpiGrid";

//import components/Feedback
import LoadingIndicator from "../components/Feedback/LoadingIndicator";
import EmptyState from "../components/Feedback/EmptyState";


// Chart.js e componenti di Chart.js
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
import { Doughnut } from "react-chartjs-2";

// Icone
import {
  CircleStackIcon,
  TagIcon,
  SunIcon,
  BeakerIcon,
  CloudIcon,
} from "@heroicons/react/24/solid";

// Hook e componenti personalizzati
import useDashboardData from "../hooks/useDashboardData";
import MetricBarChart from "../components/Chart/MetricBarChart";
import { CHART_COLORS, CUSTOM_COLORS } from "../constants/chartConfig";

import { getDatasetStats } from "../utils/datasetStats";

// Registriamo i componenti Chart.js necessari
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
  // Recuperiamo dati e metriche tramite l’hook personalizzato
  const {
    pieData,
    avgData,
    //crops,
    totalCrops,
    uniqueCrops,
    avgTemperature,
    avgPH,
    avgRain,
    allSamples,
  } = useDashboardData();

  // Preparazione dei dati per il grafico a ciambella
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
    plugins: { legend: { display: false } },
  };

  // Qui definiamo le KPI da passare al componente KpiGrid
  const kpiItems = [
    {
      title: "Campioni totali",
      value: totalCrops,
      icon: <CircleStackIcon />,
      color: "emerald" as const,
    },
    {
      title: "Colture uniche",
      value: uniqueCrops,
      icon: <TagIcon />,
      color: "indigo" as const,
    },
    {
      title: "Temp. media (°C)",
      value: avgTemperature,
      icon: <SunIcon />,
      color: "orange" as const,
    },
    {
      title: "pH medio",
      value: avgPH,
      icon: <BeakerIcon />,
      color: "purple" as const,
    },
    {
      title: "Pioggia media (mm)",
      value: avgRain,
      icon: <CloudIcon />,
      color: "blue" as const,
    },
  ];

  const isLoading = pieData.length === 0 && allSamples.length === 0;
  const hasData = pieData.length > 0;

  const datasetStats = useMemo(() => {
    if (!allSamples.length) return null;
    return getDatasetStats(allSamples);
  }, [allSamples]);

  const statsRows = datasetStats
    ? [
      {
        label: "Azoto (N)",
        color: "emerald",
        min: {
          value: datasetStats.N.min.value,
          label: datasetStats.N.min.label,
        },
        max: {
          value: datasetStats.N.max.value,
          label: datasetStats.N.max.label,
        },
      },
      {
        label: "Fosforo (P)",
        color: "indigo",
        min: {
          value: datasetStats.P.min.value,
          label: datasetStats.P.min.label,
        },
        max: {
          value: datasetStats.P.max.value,
          label: datasetStats.P.max.label,
        },
      },
      {
        label: "Potassio (K)",
        color: "orange",
        min: {
          value: datasetStats.K.min.value,
          label: datasetStats.K.min.label,
        },
        max: {
          value: datasetStats.K.max.value,
          label: datasetStats.K.max.label,
        },
      },
      {
        label: "Temperatura (°C)",
        color: "red",
        min: {
          value: datasetStats.temperature.min.value.toFixed(1),
          label: datasetStats.temperature.min.label,
        },
        max: {
          value: datasetStats.temperature.max.value.toFixed(1),
          label: datasetStats.temperature.max.label,
        },
      },
      {
        label: "Umidità (%)",
        color: "blue",
        min: {
          value: datasetStats.humidity.min.value,
          label: datasetStats.humidity.min.label,
        },
        max: {
          value: datasetStats.humidity.max.value,
          label: datasetStats.humidity.max.label,
        },
      },
      {
        label: "pH",
        color: "purple",
        min: {
          value: datasetStats.ph.min.value.toFixed(2),
          label: datasetStats.ph.min.label,
        },
        max: {
          value: datasetStats.ph.max.value.toFixed(2),
          label: datasetStats.ph.max.label,
        },
      },
      {
        label: "Pioggia (mm)",
        color: "cyan",
        min: {
          value: datasetStats.rainfall.min.value,
          label: datasetStats.rainfall.min.label,
        },
        max: {
          value: datasetStats.rainfall.max.value,
          label: datasetStats.rainfall.max.label,
        },
      },
    ]
    : [];

  type BadgeColor = "emerald" | "indigo" | "orange" | "red" | "blue" | "purple" | "cyan";

  const BADGE_COLORS: Record<BadgeColor, { min: string; max: string }> = {
    emerald: {
      min: "px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium",
      max: "px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium",
    },
    indigo: {
      min: "px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium",
      max: "px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 font-medium",
    },
    orange: {
      min: "px-2 py-1 rounded-full bg-orange-50 text-orange-700 font-medium",
      max: "px-2 py-1 rounded-full bg-orange-100 text-orange-800 font-medium",
    },
    red: {
      min: "px-2 py-1 rounded-full bg-red-50 text-red-700 font-medium",
      max: "px-2 py-1 rounded-full bg-red-100 text-red-800 font-medium",
    },
    blue: {
      min: "px-2 py-1 rounded-full bg-blue-50 text-blue-700 font-medium",
      max: "px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-medium",
    },
    purple: {
      min: "px-2 py-1 rounded-full bg-purple-50 text-purple-700 font-medium",
      max: "px-2 py-1 rounded-full bg-purple-100 text-purple-800 font-medium",
    },
    cyan: {
      min: "px-2 py-1 rounded-full bg-cyan-50 text-cyan-700 font-medium",
      max: "px-2 py-1 rounded-full bg-cyan-100 text-cyan-800 font-medium",
    },
  };


  return (
    <>
      {/* 1. KPI Cards */}
      <KpiGrid items={kpiItems} />

      {/* 2. Grafico a ciambella & Filtro colture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 auto-rows-fr">
        {/* A. Grafico a ciambella */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <div className="w-full mb-4 text-left">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Distribuzione Colture
            </h3>
            <p className="text-sm text-gray-500">
              Composizione del dataset per tipologia
            </p>
          </div>

          <div className="flex flex-col flex-1">
            {/* Doughnut */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">

              <div className="relative w-full flex justify-center">
                <div className="relative h-[260px] w-[260px]">
                  {isLoading ? (
                    <LoadingIndicator text="Caricamento dati..." className="h-full" />
                  ) : hasData ? (
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                  ) : (
                    <EmptyState message="Nessun dato disponibile per il grafico." />
                  )}

                  {/* Totale centrale */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-extrabold text-gray-800 leading-none">
                      {totalCrops}
                    </span>
                    <span className="text-xs text-gray-400 uppercase font-bold mt-1 tracking-wider">
                      Campioni
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* LEGENDA */}
            {!isLoading && hasData && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-xs">
                  {pieData.map((item, index) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: CHART_COLORS[index] }}
                      />
                      <span className="font-medium truncate">{item.label}</span>
                      <span className="text-gray-400 ml-auto">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* A. Statistiche Dataset */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-5 h-full">
          <div className="w-full mb-4 text-left">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Statistiche Dataset
            </h3>
            <p className="text-sm text-gray-500">
              Visualizzazione dei valori minimi e massimi per ogni feature
            </p>
          </div>

          <div className="space-y-4 flex-1 flex flex-col justify-between">
            {statsRows.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-800">
                  {item.label}
                </span>

                <div className="flex items-center gap-3 text-xs">
                  <span className={BADGE_COLORS[item.color].min}>
                    min {item.min.value} · {item.min.label}
                  </span>
                  <span className={BADGE_COLORS[item.color].max}>
                    max {item.max.value} · {item.max.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* B. Filtri */}
        <div className="flex flex-col h-full">
          <FilterPanel title="Informazioni sul Dataset" subtitle="Dettagli e caratteristiche principali del dataset utilizzato" className="flex flex-col h-full">
            {/* Info Dataset */}
            <div className="space-y-4 flex flex-col flex-1">

              {/* Riepilogo numerico */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                  <p className="text-xs text-indigo-700 font-medium">Record processati</p>
                  <p className="text-2xl font-bold text-indigo-900">
                    {allSamples.length}
                  </p>
                </div>

                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                  <p className="text-xs text-indigo-700 font-medium">Numero feature</p>
                  <p className="text-2xl font-bold text-indigo-900">
                    7
                  </p>
                </div>
              </div>

              {/* Feature */}
              <div className="p-5 bg-white rounded-xl border border-gray-200 space-y-4">
                {/* Feature numeriche */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    Feature Dataset
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      Azoto (N)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      Fosforo (P)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      Potassio (K)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      Temperatura (°C)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      Umidità (%)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      pH
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      Pioggia (mm)
                    </li>
                  </ul>
                </div>

                {/* Feature target */}
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    Variabile target
                  </p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">
                    Coltura (label)
                  </div>
                </div>
              </div>
              {/* Nota descrittiva */}
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <h4 className="font-semibold text-indigo-900 mb-1 text-sm">
                  Descrizione
                </h4>
                <p className="text-xs text-indigo-700 leading-relaxed">
                  Il dataset raccoglie misurazioni agronomiche e ambientali
                  utilizzate per l’analisi e la raccomandazione delle colture.
                  Ogni record rappresenta un campione osservato in condizioni
                  specifiche di suolo e clima.
                </p>
              </div>
            </div>
          </FilterPanel>
        </div>
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