import type { ReactNode } from "react";

type FilterPanelProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Contenitore riutilizzabile per le sezioni di filtro.
 * Accetta un titolo e qualsiasi contenuto come children (filtri, note, etc.).
 */
export default function FilterPanel({
  title,
  subtitle,
  children,
  className = "",
}: FilterPanelProps) {
  return (
    <div
      className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full ${className}`}
    >
      {/* HEADER */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>

      {/* BODY */}
      <div className="flex flex-col flex-1">
        {children}
      </div>
    </div>
  );
}
