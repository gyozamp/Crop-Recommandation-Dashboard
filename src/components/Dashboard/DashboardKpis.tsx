import type { KpiItem } from "../../types/kpi";
import KpiGrid from "../../components/Card/KpiGrid";

import {
  CircleStackIcon,
  TagIcon,
  SunIcon,
  BeakerIcon,
  CloudIcon,
} from "@heroicons/react/24/solid";

type DashboardKpisProps = {
  totalCrops: number;
  uniqueCrops: number;
  avgTemperature: string;
  avgPH: string;
  avgRain: string;
};

export default function DashboardKpis({
  totalCrops,
  uniqueCrops,
  avgTemperature,
  avgPH,
  avgRain,
}: DashboardKpisProps) {
  const items: KpiItem[] = [
    {
      title: "Campioni totali",
      value: totalCrops,
      icon: <CircleStackIcon />,
      color: "emerald",
    },
    {
      title: "Colture uniche",
      value: uniqueCrops,
      icon: <TagIcon />,
      color: "indigo",
    },
    {
      title: "Temp. media (°C)",
      value: avgTemperature,
      icon: <SunIcon />,
      color: "orange",
    },
    {
      title: "pH medio",
      value: avgPH,
      icon: <BeakerIcon />,
      color: "purple",
    },
    {
      title: "Pioggia media (mm)",
      value: avgRain,
      icon: <CloudIcon />,
      color: "blue",
    },
  ];

  return <KpiGrid items={items} />;
}
