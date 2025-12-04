import React, { useEffect, useState, useMemo } from "react";
import Card from "../components/Card/Card";
import FilterSelect from "../components/FilterSelect/FilterSelect";

// --- 1. Import Chart.js Modules ---
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
import { Doughnut, Bar } from "react-chartjs-2";

// --- 2. Import Icone ---
import { 
  CircleStackIcon, 
  TagIcon, 
  SunIcon, 
  BeakerIcon, 
  CloudIcon 
} from "@heroicons/react/24/solid";

import { getCropDistribution, getAveragesByCrop, getSamples } from "../services/dataService";
import type { CropSample } from "../types/crop";

// --- 3. Registrazione componenti Chart.js ---
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const CHART_COLORS = [
  "#6366f1", "#10b981", "#f59e0b", "#f43f5e", 
  "#0ea5e9", "#8b5cf6", "#ec4899", "#84cc16"
];

// Colori tenui personalizzati per i Bar Charts
const CUSTOM_COLORS = {
    N: '#60a5fa',   // blue-400
    P: '#f87171',   // red-400
    K: '#4ade80',   // green-400
    Temp: '#fb923c', // orange-400
    PH: '#a78bfa',   // violet-400
    Rain: '#22d3ee', // cyan-400
};

// Configurazione base per i Bar Charts (DEFINITA FUORI DALLO SCOPE DEL COMPONENTE)
const baseBarOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: { display: false },
        legend: { display: false },
        tooltip: {
            mode: 'index' as const,
            intersect: false,
            backgroundColor: "#ffffff",
            titleColor: '#111827',
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
            ticks: { color: "#6b7280", font: { size: 10 } }
        },
        y: {
            beginAtZero: true,
            grid: { color: "#f3f4f6", borderDash: [4, 4] },
            ticks: { color: "#6b7280", font: { size: 10 } }
        },
    },
});

// Definiamo il tipo completo per avgData
type AvgDataEntry = { label: string; avgN: number; avgP: number; avgK: number; avgTemp: number; avgPH: number; avgRain: number };
type BaseAvgDataEntry = Omit<AvgDataEntry, 'avgPH' | 'avgRain'>;


// --- Componente principale Dashboard ---
export default function Dashboard() {
  const [pieData, setPieData] = useState<{ label: string; count: number }[]>([]);
  
  // Usiamo baseAvgData per i dati iniziali (N,P,K,Temp)
  const [baseAvgData, setBaseAvgData] = useState<BaseAvgDataEntry[]>([]);
  const [allSamples, setAllSamples] = useState<CropSample[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>("");

  // Fetch Dati
  useEffect(() => {
    getCropDistribution().then(setPieData);
    getAveragesByCrop().then(setBaseAvgData); 
    getSamples().then(setAllSamples);
  }, []);

  // --- CALCOLO STATO DERIVATO (avgData calcolato con useMemo) ---
  const avgData: AvgDataEntry[] = useMemo(() => {
    // 1. Dati base non ancora caricati
    if (!allSamples.length || !baseAvgData.length) {
        // Mappa i dati base iniziali e aggiunge i campi mancanti a 0 per la tipizzazione
        return baseAvgData.map(d => ({ ...d, avgPH: 0, avgRain: 0 })) as AvgDataEntry[];
    }
    
    // 2. Calcolo PH e Rain da allSamples (logica di aggregazione)
    const map = new Map<string, { ph: number; rainfall: number; count: number }>();
    allSamples.forEach(s => {
      const label = s.label;
      const entry = map.get(label) ?? { ph: 0, rainfall: 0, count: 0 };
      entry.ph += s.ph;
      entry.rainfall += s.rainfall;
      entry.count += 1;
      map.set(label, entry);
    });

    // 3. Fusione dei dati
    return baseAvgData.map(d => {
        const m = map.get(d.label);
        return m 
            ? { 
                ...d, 
                avgPH: +(m.ph / m.count).toFixed(2), 
                avgRain: +(m.rainfall / m.count).toFixed(1) 
            } 
            : { ...d, avgPH: 0, avgRain: 0, ...d } as AvgDataEntry;
    }) as AvgDataEntry[];

  }, [allSamples, baseAvgData]);

  // --- Funzione per renderizzare un singolo grafico a barre (SPOSATA ALL'INTERNO) ---
  const renderMetricBarChart = (dataKey: keyof AvgDataEntry, label: string, color: string) => {
    
    const labels = avgData.map(d => d.label);
    const dataValues = avgData.map(d => d[dataKey] || 0);

    const data = {
        labels: labels,
        datasets: [
            {
                label: label, 
                data: dataValues,
                backgroundColor: color,
                borderRadius: 6,
                barThickness: 15,
            }
        ]
    };

    const options = baseBarOptions();
    
    // Contenitore individuale che fa da "scheda"
    return (
        <div className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
            <h4 className="text-md font-bold text-gray-700 mb-3">{label}</h4>
            
            <div className="h-[280px] w-full"> 
                {avgData.length > 0 && labels.length > 0 ? (
                    <Bar data={data} options={options} />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">Caricamento {label}...</div>
                )}
            </div>
        </div>
    );
  };


  const crops = useMemo(() => Array.from(new Set(allSamples.map(s => s.label))), [allSamples]);

  // Metriche Calcolate
  const totalCrops = pieData.reduce((sum, d) => sum + d.count, 0);
  const uniqueCrops = pieData.length;
  const avgTemperature = avgData.length > 0 ? (avgData.reduce((sum, d) => sum + d.avgTemp, 0) / avgData.length).toFixed(1) : 0;
  const avgPH = avgData.length > 0 ? (avgData.reduce((sum, d) => sum + d.avgPH, 0) / avgData.length).toFixed(2) : 0;
  const avgRain = avgData.length > 0 ? (avgData.reduce((sum, d) => sum + d.avgRain, 0) / avgData.length).toFixed(1) : 0;

  // Configurazione Doughnut
  const doughnutData = {
    labels: pieData.map((d) => d.label),
    datasets: [{ data: pieData.map((d) => d.count), backgroundColor: CHART_COLORS, borderWidth: 0, hoverOffset: 4 }],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "80%",
    plugins: { legend: { display: false } },
  };


  return (
    <>
      {/* 1. KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
        <Card title="Campioni totali" value={totalCrops} icon={<CircleStackIcon />} color="emerald" />
        <Card title="Colture uniche" value={uniqueCrops} icon={<TagIcon />} color="indigo" />
        <Card title="Temp. media (°C)" value={avgTemperature} icon={<SunIcon />} color="orange" />
        <Card title="pH medio" value={avgPH} icon={<BeakerIcon />} color="purple" />
        <Card title="Pioggia media (mm)" value={avgRain} icon={<CloudIcon />} color="blue" />
      </div>

      {/* 2. DOUGHNUT & FILTERS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* A. Grafico Ciambella */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 flex flex-col items-center">
          <div className="w-full mb-4 text-left">
            <h3 className="text-lg font-bold text-gray-800">Distribuzione Colture</h3>
            <p className="text-sm text-gray-500">Composizione del dataset per tipologia</p>
          </div>
          <div className="h-[300px] w-full relative flex justify-center">
            {pieData.length > 0 ? (<Doughnut data={doughnutData} options={doughnutOptions} />) : (
              <div className="flex items-center justify-center text-gray-400 text-sm h-full">Caricamento dati...</div>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-4xl font-extrabold text-gray-800 leading-none">{totalCrops}</span>
                 <span className="text-xs text-gray-400 uppercase font-bold mt-1 tracking-wider">Campioni</span>
            </div>
          </div>
        </div>

        {/* B. Filtri */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Filtri Dati</h3>
            <FilterSelect label="Seleziona Coltura" options={crops} value={selectedCrop} onChange={setSelectedCrop} placeholder="Tutte le colture" />
            <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
               <h4 className="font-semibold text-indigo-900 mb-1 text-sm">Info Dataset</h4>
               <p className="text-xs text-indigo-700 leading-relaxed">Dataset caricato: {allSamples.length} record processati.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 3. SEZIONE NPK: Grafici Nutrienti */}
      <div className="mb-8">
        <div className="p-6 rounded-2xl shadow-md border border-gray-100 bg-white">
            
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">Analisi dei Nutrienti</h2>
                <p className="text-sm text-gray-500">Confronto dei livelli medi di Azoto (N), Fosforo (P) e Potassio (K) per ogni coltura</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6 border-gray-100">
                {renderMetricBarChart('avgN', 'Azoto (N)', CUSTOM_COLORS.N)} 
                {renderMetricBarChart('avgP', 'Fosforo (P)', CUSTOM_COLORS.P)}
                {renderMetricBarChart('avgK', 'Potassio (K)', CUSTOM_COLORS.K)}
            </div>
        </div>
      </div>

      {/* 4. SEZIONE AMBIENTALE: Temperatura, pH, Pioggia */}
      <div className="mb-8">
        <div className="p-6 rounded-2xl shadow-md border border-gray-100 bg-white">
            
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">Analisi dei Parametri Ambientali</h2>
                <p className="text-sm text-gray-500">Confronto dei livelli medi di Temperatura, pH e Pioggia per ogni coltura</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6 border-gray-100">
                {renderMetricBarChart('avgTemp', 'Temperatura (°C)', CUSTOM_COLORS.Temp)}
                {renderMetricBarChart('avgPH', 'pH (%)', CUSTOM_COLORS.PH)}
                {renderMetricBarChart('avgRain', 'Pioggia (mm)', CUSTOM_COLORS.Rain)}
            </div>
        </div>
      </div>
    </>
  );
}