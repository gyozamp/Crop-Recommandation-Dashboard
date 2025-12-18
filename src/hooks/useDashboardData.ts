// src/hooks/useDashboardData.ts
import { useEffect, useState, useMemo } from "react";
import { getCropDistribution, getAveragesByCrop, getSamples } from "../services/dataService";
import type { CropSample } from "../types/crop";
import calculateAvgData from "../utils/calculateAvgData.ts";

export type AvgDataEntry = {
  label: string;
  avgN: number;
  avgP: number;
  avgK: number;
  avgTemp: number;
  avgPH: number;
  avgRain: number;
};

export type BaseAvgDataEntry = Omit<AvgDataEntry, "avgPH" | "avgRain">;

/**
 * Hook personalizzato che centralizza:
 *  - il recupero dei dati dal servizio,
 *  - il calcolo dei dati medi (compresi pH e pioggia),
 *  - la derivazione delle metriche aggregate usate nei KPI e nei grafici.
 */
export function useDashboardData() {
  // Dati originari
  const [pieData, setPieData] = useState<Array<{ label: string; count: number }>>([]);
  const [baseAvgData, setBaseAvgData] = useState<BaseAvgDataEntry[]>([]);
  const [allSamples, setAllSamples] = useState<CropSample[]>([]);

  // Recupero dati all’inizializzazione
  useEffect(() => {
    getCropDistribution().then(setPieData);
    getAveragesByCrop().then(setBaseAvgData);
    getSamples().then(setAllSamples);
  }, []);

  // Calcolo dei dati medi completi (inclusi pH e pioggia)
  const avgData: AvgDataEntry[] = useMemo(
    () => calculateAvgData(baseAvgData, allSamples),
    [baseAvgData, allSamples]
  );

  // Elenco delle colture uniche (usato nei filtri)
  const crops: string[] = useMemo(
    () => Array.from(new Set(allSamples.map((s) => s.label))),
    [allSamples]
  );

  // KPI derivati
  const totalCrops: number = useMemo(
    () => pieData.reduce((sum, d) => sum + d.count, 0),
    [pieData]
  );
  const uniqueCrops: number = useMemo(() => pieData.length, [pieData]);

  const avgTemperature: string = useMemo(() => {
    if (!avgData.length) return "0";
    const total = avgData.reduce((sum, d) => sum + d.avgTemp, 0);
    return (total / avgData.length).toFixed(1);
  }, [avgData]);

  const avgPHValue: string = useMemo(() => {
    if (!avgData.length) return "0";
    const total = avgData.reduce((sum, d) => sum + d.avgPH, 0);
    return (total / avgData.length).toFixed(2);
  }, [avgData]);

  const avgRain: string = useMemo(() => {
    if (!avgData.length) return "0";
    const total = avgData.reduce((sum, d) => sum + d.avgRain, 0);
    return (total / avgData.length).toFixed(1);
  }, [avgData]);

  return {
    // dati grezzi e aggregati
    pieData,
    avgData,
    crops,
    allSamples,

    // metriche per i KPI
    totalCrops,
    uniqueCrops,
    avgTemperature,
    avgPH: avgPHValue,
    avgRain,
  };
}

export default useDashboardData;
