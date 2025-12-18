// src/utils/calculateAvgData.ts
import type { CropSample } from "../types/crop";

/**
 * Definiamo i tipi per i dati medi, analoghi a quelli usati nella Dashboard.
 * Se hai già questi tipi dichiarati altrove (ad esempio in `useDashboardData.ts`),
 * puoi importarli invece di ridefinirli.
 */
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
 * Calcola il set completo dei valori medi (inclusi pH e pioggia) unendo
 * i dati di base con le medie calcolate sui campioni grezzi.
 *
 * @param baseAvgData  Array di medie base per ogni coltura (N, P, K, Temp)
 * @param allSamples   Array di campioni grezzi, da cui calcolare pH e pioggia medi
 * @returns            Array di `AvgDataEntry` completi, con campi pH e rain
 */
export default function calculateAvgData(
  baseAvgData: BaseAvgDataEntry[],
  allSamples: CropSample[]
): AvgDataEntry[] {
  // Se mancano dati di base o campioni, restituiamo i dati di base con valori nulli per pH e pioggia
  if (!allSamples.length || !baseAvgData.length) {
    return baseAvgData.map((d) => ({
      ...d,
      avgPH: 0,
      avgRain: 0,
    }));
  }

  // Mappa per aggregare pH e pioggia per etichetta (coltura)
  const aggregateMap = new Map<
    string,
    { ph: number; rainfall: number; count: number }
  >();

  allSamples.forEach((sample) => {
    const entry =
      aggregateMap.get(sample.label) ?? { ph: 0, rainfall: 0, count: 0 };
    entry.ph += sample.ph;
    entry.rainfall += sample.rainfall;
    entry.count += 1;
    aggregateMap.set(sample.label, entry);
  });

  // Uniamo i dati aggregati con le medie di base, calcolando pH e pioggia medi
  return baseAvgData.map((d) => {
    const aggregated = aggregateMap.get(d.label);
    if (aggregated) {
      return {
        ...d,
        avgPH: +(aggregated.ph / aggregated.count).toFixed(2),
        avgRain: +(aggregated.rainfall / aggregated.count).toFixed(1),
      };
    }
    // Se non abbiamo campioni per una coltura specifica, manteniamo 0 per pH e pioggia
    return { ...d, avgPH: 0, avgRain: 0 };
  });
}
