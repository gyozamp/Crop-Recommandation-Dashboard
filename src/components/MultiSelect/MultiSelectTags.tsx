//import React from "react";

type MultiSelectTagsProps = {
  options: string[];
  /** Lista degli elementi attualmente selezionati */
  selected: string[];
  /** Funzione chiamata quando si clicca su un tag per selezionarlo/deselezionarlo */
  onToggle: (value: string) => void;
  /** Funzione chiamata per azzerare la selezione (es. pulsante "Tutte") */
  onClear: () => void;
  /** Funzione che restituisce il colore da assegnare a ciascun tag */
  getColor: (label: string, allLabels: string[]) => string;
  /** Classi CSS aggiuntive (opzionale) per personalizzare contenitore/tags */
  className?: string;
};

/**
 * Componente riutilizzabile per selezionare più elementi tramite “tag”.
 * Mostra un pulsante "Tutte" per azzerare la selezione e un pulsante
 * per ogni opzione, colorato quando selezionato.
 */
export default function MultiSelectTags({
  options,
  selected,
  onToggle,
  onClear,
  getColor,
  className = "",
}: MultiSelectTagsProps) {
  return (
    <div
      className={`flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1 ${className}`}
    >
      {/* Pulsante "Tutte" */}
      <button
        onClick={onClear}
        className={`px-3 py-1 text-xs rounded-full font-semibold transition-colors ${
          selected.length === 0
            ? "bg-indigo-600 text-white shadow-md"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        Tutte
      </button>

      {/* Tag per ogni opzione */}
      {options.map((option) => {
        const isSelected = selected.includes(option);
        const color = getColor(option, options);
        return (
          <button
            key={option}
            onClick={() => onToggle(option)}
            style={{
              backgroundColor: isSelected ? color : "#f7f8f9",
              color: isSelected ? "white" : "#4b5563",
              border: `1px solid ${isSelected ? color : "#e5e7eb"}`,
            }}
            className="px-3 py-1 text-xs rounded-full font-medium transition-all duration-150 shadow-sm hover:shadow-md"
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
