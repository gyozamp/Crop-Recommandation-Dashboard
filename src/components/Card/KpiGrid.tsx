//import React from "react";
import Card from "../Card/Card";
import type { ReactNode } from "react";

type KpiItem = {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: "indigo" | "emerald" | "blue" | "orange" | "purple" | "red";
};

type KpiGridProps = {
  items: KpiItem[];
};

/**
 * Componente che riceve un array di definizioni KPI e
 * renderizza le Card corrispondenti in una griglia responsive.
 */
export default function KpiGrid({ items }: KpiGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
      {items.map((item, idx) => (
        <Card
          key={idx}
          title={item.title}
          value={item.value}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>
  );
}
