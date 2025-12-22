import type { ReactNode } from "react";

export type KpiColor =
  | "indigo"
  | "emerald"
  | "blue"
  | "orange"
  | "purple"
  | "red";

export type KpiItem = {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: KpiColor;
};
