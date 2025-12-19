import React from "react";
import type { ReactElement } from "react";

type IconLabelProps = {
  icon: ReactElement<{ className?: string }>;
  label: string;
  active?: boolean;
  expanded?: boolean;
  className?: string;
};

export default function IconLabel({
  icon,
  label,
  active = false,
  expanded = true,
  className = "",
}: IconLabelProps) {
  const baseClasses = active
    ? "bg-indigo-50 text-indigo-600"
    : "text-gray-500 hover:bg-gray-50 hover:text-indigo-600";

  const textClasses = expanded
    ? "w-auto opacity-100 ml-2"
    : "w-0 opacity-0";

  return (
    <div
      className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative ${baseClasses} ${expanded ? "" : "justify-center"} ${className}`}
    >
      {React.cloneElement(icon, {
        className:
          "h-6 w-6 min-w-[24px] transition-transform group-hover:scale-110",
      })}

      <span
        className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${textClasses}`}
      >
        {label}
      </span>
    </div>
  );
}
