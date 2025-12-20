//import React, { useState, useMemo } from "react";

// import components/Filter
//import FilterSelect from "../components/FilterSelect/FilterSelect";
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
  // Selezione dell’eventuale coltura da filtrare
  //const [selectedCrop, setSelectedCrop] = useState<string>("");

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

  // Applichiamo il filtro per coltura, se impostato
  // const filteredAvgData = useMemo(
  //   () =>
  //     selectedCrop
  //       ? avgData.filter((d) => d.label === selectedCrop)
  //       : avgData,
  //   [avgData, selectedCrop]
  // );

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

  return (
    <>
      {/* 1. KPI Cards */}
      <KpiGrid items={kpiItems} />

      {/* 2. Grafico a ciambella & Filtro colture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* A. Grafico a ciambella */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 flex flex-col items-center">
          <div className="w-full mb-4 text-left">
            <h3 className="text-lg font-bold text-gray-800">
              Distribuzione Colture
            </h3>
            <p className="text-sm text-gray-500">
              Composizione del dataset per tipologia
            </p>
          </div>
          <div className="h-[300px] w-full relative flex justify-center">
            {isLoading ? (
              <LoadingIndicator text="Caricamento dati..." className="h-full" />
            ) : hasData ? (
              <Doughnut data={doughnutData} options={doughnutOptions} />
            ) : (
              <EmptyState message="Nessun dato disponibile per il grafico." />
            )}

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-extrabold text-gray-800 leading-none">
                {totalCrops}
              </span>
              <span className="text-xs text-gray-400 uppercase font-bold mt-1 tracking-wider">
                Campioni
              </span>
            </div>
          </div>
        </div>

        {/* B. Filtri */}
        <div className="flex flex-col gap-6">
          <FilterPanel title="Informazioni Dataset">
            {/* Info Dataset */}
            <div className="space-y-6">

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
                <h4 className="text-sm font-semibold text-gray-800">
                  Feature del Dataset
                </h4>

                {/* Feature numeriche */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    Variabili numeriche
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