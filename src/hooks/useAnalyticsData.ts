import { useEffect, useState, useMemo } from "react";
import { getSamples } from "../services/dataService";
import type { CropSample } from "../types/crop";

export type MetricKey = "avgTemp" | "avgPH" | "avgRain";

export type AggregatedAverage = {
  label: string;
  avgTemp: number;
  avgPH: number;
  avgRain: number;
};

export default function useAnalyticsData() {
  // Stati per i dati
  const [allSamples, setAllSamples] = useState<CropSample[]>([]);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [tempRange, setTempRange] = useState<number[]>([10, 40]);
  const [phRange, setPhRange] = useState<number[]>([4, 10]);
  const [humidityRange, setHumidityRange] = useState<number[]>([40, 100]);
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>("avgTemp");

  // Caricamento campioni all'avvio
  useEffect(() => {
    getSamples().then(setAllSamples);
  }, []);

  // Etichette uniche delle colture (per MultiSelectTags)
  const cropLabels: string[] = useMemo(
    () => Array.from(new Set(allSamples.map((s) => s.label))),
    [allSamples]
  );

  // Toggle selezione colture
  const toggleCropSelection = (crop: string) => {
    setSelectedCrops((prev) => {
      if (prev.includes(crop)) {
        return prev.filter((c) => c !== crop);
      } else {
        return [...prev, crop];
      }
    });
  };

  // Filtra campioni e calcola medie
  const { filteredSamples, aggregatedAverages } = useMemo(() => {
    if (!allSamples.length) {
      return { filteredSamples: [] as CropSample[], aggregatedAverages: [] as AggregatedAverage[] };
    }

    const filtered = allSamples.filter((sample) => {
      const tempOk = sample.temperature >= tempRange[0] && sample.temperature <= tempRange[1];
      const phOk = sample.ph >= phRange[0] && sample.ph <= phRange[1];
      const humidityOk = sample.humidity >= humidityRange[0] && sample.humidity <= humidityRange[1];
      const cropOk = selectedCrops.length === 0 || selectedCrops.includes(sample.label);
      return tempOk && phOk && humidityOk && cropOk;
    });

    const avgMap = new Map<string, { count: number; totalTemp: number; totalPH: number; totalRain: number }>();

    filtered.forEach((s) => {
      const key = s.label;
      const entry =
        avgMap.get(key) || {
          count: 0,
          totalTemp: 0,
          totalPH: 0,
          totalRain: 0,
        };

      entry.count++;
      entry.totalTemp += s.temperature;
      entry.totalPH += s.ph;
      entry.totalRain += s.rainfall;

      avgMap.set(key, entry);
    });

    const averages: AggregatedAverage[] = Array.from(avgMap).map(([label, data]) => ({
      label,
      avgTemp: data.totalTemp / data.count,
      avgPH: data.totalPH / data.count,
      avgRain: data.totalRain / data.count,
    }));

    return { filteredSamples: filtered, aggregatedAverages: averages };
  }, [allSamples, selectedCrops, tempRange, phRange, humidityRange]);

  // Preparazione dei dati per lo scatter plot
  const scatterData = useMemo(() => {
    if (!filteredSamples.length) return { datasets: [] };

    // Raggruppiamo per etichetta
    const grouped: Record<
      string,
      {
        label: string;
        data: { x: number; y: number; crop: string; ph: number }[];
      }
    > = {};

    filteredSamples.forEach((sample) => {
      const label = sample.label;
      if (!grouped[label]) {
        grouped[label] = {
          label,
          data: [],
        };
      }
      grouped[label].data.push({
        x: sample.temperature,
        y: sample.humidity,
        crop: label,
        ph: sample.ph,
      });
    });

    return { datasets: Object.values(grouped) };
  }, [filteredSamples]);

  // Flag di caricamento
  const isLoading = allSamples.length === 0;

  return {
    // dati
    allSamples,
    filteredSamples,
    aggregatedAverages,
    scatterData,

    // etichette e filtri
    cropLabels,
    selectedCrops,
    setSelectedCrops,
    toggleCropSelection,
    tempRange,
    setTempRange,
    phRange,
    setPhRange,
    humidityRange,
    setHumidityRange,
    selectedMetric,
    setSelectedMetric,

    // stato
    isLoading,
  };
}
