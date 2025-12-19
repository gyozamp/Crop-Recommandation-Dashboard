export const SCATTER_COLORS = [
  "#E60049", "#009E73", "#0072B2", "#F0E442", "#D55E00",
  "#CC79A7", "#00C3DA", "#6A3D9A", "#FF7F00", "#B2DF8A",
  "#33A02C", "#1F78B4", "#FDBF6F", "#E31A1C", "#CAB2D6",
  "#6A3E2A", "#FB9A99", "#999999", "#B15928", "#00A896",
  "#2C5F2D", "#C96567",
];

export function getColor(label: string, labels: string[]) {
  const index = labels.indexOf(label);
  return SCATTER_COLORS[index % SCATTER_COLORS.length];
}
