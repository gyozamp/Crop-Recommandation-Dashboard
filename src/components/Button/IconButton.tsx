import React from "react";
import type { ReactElement } from "react";

type IconButtonProps = {
  icon: ReactElement<{ className?: string }>;
  ariaLabel?: string;
  onClick?: () => void;
  badge?: boolean | number;
  className?: string;
};

export default function IconButton({
  icon,
  ariaLabel,
  onClick,
  badge,
  className = "",
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`relative p-2 text-gray-400 hover:text-indigo-600 transition-colors ${className}`}
    >
      {/* Cloniamo l’icona per garantirle dimensioni e classe coerenti */}
      {React.cloneElement(icon, { className: "h-6 w-6" })}

      {/* Badge: puntino rosso o numero */}
      {badge && (
        typeof badge === "number" ? (
          <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">
            {badge}
          </span>
        ) : (
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        )
      )}
    </button>
  );
}
