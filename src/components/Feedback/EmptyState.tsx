import type { ReactNode } from "react";

type EmptyStateProps = {
  /** Messaggio da visualizzare quando non ci sono dati */
  message: string;
  /** Icona opzionale da mostrare sopra il messaggio */
  icon?: ReactNode;
  /** Classi CSS aggiuntive (opzionale) */
  className?: string;
};

/**
 * Componente riutilizzabile per indicare assenza di dati.
 * Può essere arricchito con un'icona passata come prop.
 */
export default function EmptyState({
  message,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`p-12 text-center text-gray-500 flex flex-col items-center ${className}`}
    >
      {icon && <div className="mb-4">{icon}</div>}
      <p>{message}</p>
    </div>
  );
}
