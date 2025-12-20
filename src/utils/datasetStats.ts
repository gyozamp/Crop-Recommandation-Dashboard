import type { CropSample } from "../types/crop";

type MinMax = {
  min: { value: number; label: string };
  max: { value: number; label: string };
};

type DatasetStats = {
  N: MinMax;
  P: MinMax;
  K: MinMax;
  temperature: MinMax;
  humidity: MinMax;
  ph: MinMax;
  rainfall: MinMax;
};

const computeMinMax = (
  samples: CropSample[],
  key: keyof CropSample
): MinMax => {
  const sorted = [...samples].sort((a, b) => {
    const av = a[key] as number;
    const bv = b[key] as number;
    return av - bv;
  });

  const minSample = sorted[0];
  const maxSample = sorted[sorted.length - 1];

  return {
    min: {
      value: minSample[key] as number,
      label: minSample.label,
    },
    max: {
      value: maxSample[key] as number,
      label: maxSample.label,
    },
  };
};

export const getDatasetStats = (samples: CropSample[]): DatasetStats => ({
  N: computeMinMax(samples, "N"),
  P: computeMinMax(samples, "P"),
  K: computeMinMax(samples, "K"),
  temperature: computeMinMax(samples, "temperature"),
  humidity: computeMinMax(samples, "humidity"),
  ph: computeMinMax(samples, "ph"),
  rainfall: computeMinMax(samples, "rainfall"),
});
