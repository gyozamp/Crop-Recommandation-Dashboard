import Card from "../Card/Card";
import type { KpiItem } from "../../types/kpi";

type KpiGridProps = {
  items: KpiItem[];
};

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
