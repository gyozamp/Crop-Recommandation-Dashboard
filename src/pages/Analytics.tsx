import React, { useEffect, useState, useMemo } from "react";
import FilterSelect from "../components/FilterSelect/FilterSelect";
import { getSamples } from "../services/dataService";
import type { CropSample } from "../types/crop";

// --- Import Chart.js Modules ---
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
} from 'chart.js';
import { Scatter, Bar } from 'react-chartjs-2';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// Registrazione di tutti i moduli necessari
ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title, BarElement, CategoryScale);

// --- PALETTE DI COLORI (22 Tonalità ad Alto Contrasto) ---
const SCATTER_COLORS = [
  '#E60049', '#009E73', '#0072B2', '#F0E442', '#D55E00', 
  '#CC79A7', '#00C3DA', '#6A3D9A', '#FF7F00', '#B2DF8A', 
  '#33A02C', '#1F78B4', '#FDBF6F', '#E31A1C', '#CAB2D6', 
  '#6A3E2A', '#FB9A99', '#999999', '#B15928', '#00A896', 
  '#2C5F2D', '#C96567',
];

// Colori per il Bar Chart Orizzontale
const BAR_METRIC_COLORS = {
    avgTemp: '#fb923c', // Orange
    avgPH: '#a78bfa',   // Violet
    avgRain: '#22d3ee', // Cyan
};

// Funzione helper per ottenere il colore in base al nome della coltura
const getColor = (label: string, labels: string[]) => {
    const index = labels.indexOf(label);
    return SCATTER_COLORS[index % SCATTER_COLORS.length]; 
};

// --- Funzione per renderizzare lo Slider Range (logica invariata) ---
const renderRangeSlider = (label: string, value: number[], onChange: (v: number | number[]) => void, min: number, max: number, step: number, unit: string) => (
    <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}: <span className="font-semibold text-indigo-700">{value[0].toFixed(step > 0.5 ? 0 : 1)}{unit} - {value[1].toFixed(step > 0.5 ? 0 : 1)}{unit}</span>
        </label>
        <Slider
            range
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            allowCross={false}
            trackStyle={[{ backgroundColor: '#4f46e5' }]} 
            handleStyle={[{ borderColor: '#4f46e5', boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.3)' }, { borderColor: '#4f46e5', boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.3)' }]}
        />
    </div>
);

type MetricKey = 'avgTemp' | 'avgPH' | 'avgRain';

export default function Analytics() {
    // --- STATI DATI ---
    const [allSamples, setAllSamples] = useState<CropSample[]>([]);
    const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
    const [tempRange, setTempRange] = useState<number[]>([10, 40]);
    const [phRange, setPhRange] = useState<number[]>([4, 10]);
    const [humidityRange, setHumidityRange] = useState<number[]>([40, 100]); 
    
    // STATO: per selezionare la metrica del Bar Chart
    const [selectedMetric, setSelectedMetric] = useState<MetricKey>('avgTemp'); 

    useEffect(() => {
        getSamples().then(setAllSamples);
    }, []);

    const cropLabels = useMemo(() => Array.from(new Set(allSamples.map(s => s.label))), [allSamples]);

    // Logica di toggle (identica)
    const toggleCropSelection = (crop: string) => {
        setSelectedCrops(prev => {
            if (prev.includes(crop)) {
                return prev.filter(c => c !== crop);
            } else {
                return [...prev, crop];
            }
        });
    };
    
    // --- FUNZIONE DI AGGREGAZIONE DATI (Genera i dati per tutti i grafici) ---
    const { filteredSamples, aggregatedAverages } = useMemo(() => {
        if (!allSamples.length) return { filteredSamples: [], aggregatedAverages: [] };

        const filtered = allSamples.filter(sample => {
            const tempOk = sample.temperature >= tempRange[0] && sample.temperature <= tempRange[1];
            const phOk = sample.ph >= phRange[0] && sample.ph <= phRange[1];
            const humidityOk = sample.humidity >= humidityRange[0] && sample.humidity <= humidityRange[1];
            const cropOk = selectedCrops.length === 0 || selectedCrops.includes(sample.label);
            return tempOk && phOk && humidityOk && cropOk;
        });
        
        // Calcolo le medie solo per i campioni VISIBILI
        const avgMap = new Map<string, { count: number; totalTemp: number; totalPH: number; totalRain: number }>();

        filtered.forEach(s => {
            const key = s.label;
            const entry = avgMap.get(key) || { count: 0, totalTemp: 0, totalPH: 0, totalRain: 0 };
            
            entry.count++;
            entry.totalTemp += s.temperature;
            entry.totalPH += s.ph;
            entry.totalRain += s.rainfall;
            
            avgMap.set(key, entry);
        });

        const averages = Array.from(avgMap).map(([label, data]) => ({
            label: label,
            avgTemp: data.totalTemp / data.count,
            avgPH: data.totalPH / data.count,
            avgRain: data.totalRain / data.count,
        }));


        return { filteredSamples: filtered, aggregatedAverages: averages };
    }, [allSamples, selectedCrops, tempRange, phRange, humidityRange]);


    // --- 1. PREPARAZIONE DATI SCATTER PLOT ---
    const scatterData = useMemo(() => {
        if (!filteredSamples.length) return { datasets: [] };

        const grouped = filteredSamples.reduce((acc, sample) => {
            const label = sample.label;
            if (!acc[label]) {
                acc[label] = {
                    label: label,
                    data: [],
                    backgroundColor: getColor(label, cropLabels), 
                    pointRadius: 6,
                    pointHoverRadius: 8,
                };
            }
            acc[label].data.push({ x: sample.temperature, y: sample.humidity, crop: label, ph: sample.ph }); 
            return acc;
        }, {} as Record<string, any>);

        return { datasets: Object.values(grouped) };

    }, [filteredSamples, cropLabels]);

    // --- 2. PREPARAZIONE DATI BAR CHART ORIZZONTALE ---
    const horizontalBarData = useMemo(() => {
        if (!aggregatedAverages.length) return { datasets: [] };

        // Definiamo etichette e unità per la metrica selezionata
        let chartLabel = '';
        let dataKey: MetricKey = selectedMetric;
        
        if (dataKey === 'avgTemp') chartLabel = 'Temperatura Media (°C)';
        else if (dataKey === 'avgPH') chartLabel = 'pH Medio (%)';
        else if (dataKey === 'avgRain') chartLabel = 'Pioggia Media (mm)';

        return {
            labels: aggregatedAverages.map(d => d.label).sort(), // Ordiniamo per consistenza
            datasets: [
                {
                    label: chartLabel,
                    data: aggregatedAverages.map(d => d[dataKey]),
                    backgroundColor: BAR_METRIC_COLORS[dataKey],
                    borderRadius: 6,
                    minBarLength: 5,
                },
            ],
        };
    }, [aggregatedAverages, selectedMetric]);


    // --- 3. OPZIONI GRAFICI ---
    const scatterOptions = {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' as const, labels: { usePointStyle: true, padding: 20, color: '#4b5563' } },
            title: {
                display: true, text: `Punti visibili: ${filteredSamples.length}`,
                font: { size: 16, weight: 'bold' }, color: '#4b5563', align: 'start' as const, padding: { bottom: 20 }
            },
            tooltip: { /* ... callbacks ... */ },
        },
        scales: {
            x: { type: 'linear' as const, title: { display: true, text: 'Temperatura Media (°C)', color: '#1f2937', font: { weight: 'bold' } }, grid: { color: '#e5e7eb' } },
            y: { type: 'linear' as const, title: { display: true, text: 'Umidità Media (%)', color: '#1f2937', font: { weight: 'bold' } }, grid: { color: '#e5e7eb' } }
        }
    };
    
    const horizontalBarOptions = {
        responsive: true, maintainAspectRatio: false,
        indexAxis: 'y' as const, // Essenziale per grafico Orizzontale
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index' as const, intersect: false, /* ... styling ... */ },
            title: {
                 display: true, 
                 text: horizontalBarData.datasets[0]?.label || 'Seleziona una metrica',
                 font: { size: 16, weight: 'bold' }, 
                 color: '#1f2937', 
                 align: 'start' as const, 
                 padding: { bottom: 20 }
            }
        },
        scales: { x: { title: { display: true, text: 'Valore Medio' }, grid: { color: '#e5e7eb' } }, y: { grid: { display: false } } }
    };


    return (
        <div className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* --- 1. SEZIONE FILTRI (Colonna Fisso) --- */}
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 h-full">
                    <h2 className="text-xl font-extrabold mb-6 text-indigo-700 border-b pb-3 border-indigo-50">Opzioni e Controlli</h2>
                    
                    {/* Pulsanti di Selezione Multipla (TAG FILTER) */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Seleziona Colture ({selectedCrops.length} attive)</h3>
                        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1">
                            
                            <button
                                onClick={() => setSelectedCrops([])}
                                className={`px-3 py-1 text-xs rounded-full font-semibold transition-colors ${selectedCrops.length === 0 ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                Tutte
                            </button>

                            {cropLabels.map(crop => {
                                const isSelected = selectedCrops.includes(crop);
                                const color = getColor(crop, cropLabels);
                                return (
                                    <button
                                        key={crop}
                                        onClick={() => toggleCropSelection(crop)}
                                        style={{ backgroundColor: isSelected ? color : '#f7f8f9', color: isSelected ? 'white' : '#4b5563', border: `1px solid ${isSelected ? color : '#e5e7eb'}`}}
                                        className="px-3 py-1 text-xs rounded-full font-medium transition-all duration-150 shadow-sm hover:shadow-md"
                                    >
                                        {crop}
                                    </button>
                                );
                            })}
                        </div>
                    </div>


                    <div className="border-t border-gray-100 pt-6 mt-6">
                        <h3 className="text-lg font-bold mb-4 text-gray-700">Range Dati Ambientali</h3>
                        
                        {/* Slider Temperatura */}
                        {renderRangeSlider("Temperatura", tempRange, setTempRange, 0, 45, 0.1, "°C")}
                        
                        {/* Slider pH */}
                        {renderRangeSlider("Livello pH", phRange, setPhRange, 0, 15, 0.1, "")}
                        
                        {/* Slider Umidità */}
                        {renderRangeSlider("Umidità", humidityRange, setHumidityRange, 0, 100, 1, "%")}

                    </div>
                    
                    <div className="p-4 mt-8 bg-indigo-50 text-indigo-800 text-sm rounded-xl border border-indigo-200">
                        <p className="font-bold">Note</p>
                        <p className="text-xs mt-1">L'analisi mostra come la Temperatura (X) e l'Umidità (Y) influenzano la distribuzione delle colture.</p>
                    </div>

                </div>

                {/* --- 2. SEZIONE GRAFICI (Colonna Scrollabile) --- */}
                <div className="lg:col-span-3"> {/* Contenitore che non imposta lo scroll, ma lascia scorrere il main */}
                    <div className="grid grid-cols-1 gap-8"> {/* Griglia interna per i due grafici */}
                        
                        {/* A. SCATTER PLOT (Sempre in alto) */}
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-bold mb-2 text-gray-800">Distribuzione Campioni per Condizioni</h2>
                            <p className="text-sm text-gray-500 mb-6">Visualizza i campioni che soddisfano i criteri dei filtri (Temperatura vs Umidità)</p>

                            <div style={{ height: '650px', width: '100%' }}>
                                {allSamples.length > 0 ? (
                                    <Scatter data={scatterData} options={scatterOptions} />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">Caricamento dati campioni...</div>
                                )}
                            </div>
                        </div>

                        {/* B. HORIZONTAL BAR CHART (Nuovo grafico sotto lo Scatter) */}
                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                            <div className="flex justify-between items-center mb-6 border-b pb-4">
                                <h2 className="text-2xl font-bold text-gray-800">Confronto Medie per Coltura</h2>
                                
                                {/* Selettore Metrica */}
                                <div className="flex space-x-2 bg-gray-50 p-1 rounded-lg">
                                    <button
                                        onClick={() => setSelectedMetric('avgTemp')}
                                        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${selectedMetric === 'avgTemp' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-white'}`}
                                    >
                                        Temperatura
                                    </button>
                                    <button
                                        onClick={() => setSelectedMetric('avgPH')}
                                        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${selectedMetric === 'avgPH' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-white'}`}
                                    >
                                        pH
                                    </button>
                                    <button
                                        onClick={() => setSelectedMetric('avgRain')}
                                        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${selectedMetric === 'avgRain' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-white'}`}
                                    >
                                        Pioggia
                                    </button>
                                </div>
                            </div>
                            
                            <div style={{ height: '500px', width: '100%' }}> {/* Altezza maggiore per barre multiple */}
                                {allSamples.length > 0 && horizontalBarData.labels.length > 0 ? (
                                    <Bar data={horizontalBarData} options={horizontalBarOptions} />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">Nessuna coltura selezionata o dati non disponibili.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}