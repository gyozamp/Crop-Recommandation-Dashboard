//import React from "react";

type LoadingIndicatorProps = {
  /** Messaggio opzionale da mostrare accanto allo spinner */
  text?: string;
  /** Classi CSS aggiuntive (opzionale) */
  className?: string;
};

/**
 * Componente che visualizza uno spinner animato con un testo opzionale.
 * Utilizza le classi Tailwind per lo styling.
 */
export default function LoadingIndicator({
  text = "Caricamento dati...",
  className = "",
}: LoadingIndicatorProps) {
  return (
    <div
      className={`flex items-center justify-center p-4 text-gray-500 ${className}`}
    >
      <svg
        className="animate-spin h-6 w-6 mr-3 text-indigo-500"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {text}
    </div>
  );
}
