import type { ReactNode } from "react";

type FilterPanelProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * Contenitore riutilizzabile per le sezioni di filtro.
 * Accetta un titolo e qualsiasi contenuto come children (filtri, note, etc.).
 */
export default function FilterPanel({
  title,
  children,
  className = "",
}: FilterPanelProps) {
  return (
    <div
      className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full ${className}`}
    >
      <h3 className="text-lg font-bold text-gray-800 mb-6">{title}</h3>
      {children}
    </div>
  );
}
