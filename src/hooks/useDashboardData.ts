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

export function useDashboardData() {
  const [pieData, setPieData] = useState<Array<{ label: string; count: number }>>([]);
  const [baseAvgData, setBaseAvgData] = useState<BaseAvgDataEntry[]>([]);
  const [allSamples, setAllSamples] = useState<CropSample[]>([]);

  useEffect(() => {
    getCropDistribution().then(setPieData);
    getAveragesByCrop().then(setBaseAvgData);
    getSamples().then(setAllSamples);
  }, []);

  const avgData: AvgDataEntry[] = useMemo(
    () => calculateAvgData(baseAvgData, allSamples),
    [baseAvgData, allSamples]
  );

  const crops: string[] = useMemo(
    () => Array.from(new Set(allSamples.map((s) => s.label))),
    [allSamples]
  );

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
    pieData,
    avgData,
    crops,
    allSamples,

    totalCrops,
    uniqueCrops,
    avgTemperature,
    avgPH: avgPHValue,
    avgRain,
  };
}

export default useDashboardData;
