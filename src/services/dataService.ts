import type { CropSample } from "../types/crop";
import rawData from "../data/Crop_recommendation.json";

const data: CropSample[] = (rawData as unknown as Record<string, string>[]).map(d => ({
  N: Number(d.N),
  P: Number(d.P),
  K: Number(d.K),
  temperature: Number(d.temperature),
  humidity: Number(d.humidity),
  ph: Number(d.ph),
  rainfall: Number(d.rainfall),
  label: d.label
}));


export function getSamples(): Promise<CropSample[]> {
  return Promise.resolve(data);
}

export function getCropDistribution(): Promise<{ label: string; count: number }[]> {
  const map = new Map<string, number>();
  data.forEach(d => map.set(d.label, (map.get(d.label) ?? 0) + 1));
  return Promise.resolve(Array.from(map.entries()).map(([label, count]) => ({ label, count })));
}

export function getAveragesByCrop(): Promise<
  { label: string; avgN: number; avgP: number; avgK: number; avgTemp: number }[]
> {
  const sums = new Map<string, { N: number; P: number; K: number; temperature: number; count: number }>();
  data.forEach(d => {
    const s = sums.get(d.label) ?? { N: 0, P: 0, K: 0, temperature: 0, count: 0 };
    s.N += d.N;
    s.P += d.P;
    s.K += d.K;
    s.temperature += d.temperature;
    s.count += 1;
    sums.set(d.label, s);
  });

  return Promise.resolve(
    Array.from(sums.entries()).map(([label, s]) => ({
      label,
      avgN: +(s.N / s.count).toFixed(2),
      avgP: +(s.P / s.count).toFixed(2),
      avgK: +(s.K / s.count).toFixed(2),
      avgTemp: +(s.temperature / s.count).toFixed(2),
    }))
  );
}
