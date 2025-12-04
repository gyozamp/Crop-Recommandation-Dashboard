import { ReactNode } from "react";

type CardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: "indigo" | "emerald" | "blue" | "orange" | "purple" | "red"; // Tipi di colore supportati
};

export default function Card({ title, value, icon, color = "indigo" }: CardProps) {
  
  // Mappa dei colori per gestire sfondi (bg) e testi (text) dinamicamente
  const colorVariants = {
    indigo: { bg: "bg-indigo-100", text: "text-indigo-600" },
    emerald: { bg: "bg-emerald-100", text: "text-emerald-600" },
    blue:   { bg: "bg-blue-100",   text: "text-blue-600" },
    orange: { bg: "bg-orange-100", text: "text-orange-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600" },
    red:    { bg: "bg-red-100",    text: "text-red-600" },
  };

  const theme = colorVariants[color];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
      {/* Icon Wrapper */}
      <div className={`p-3 rounded-xl ${theme.bg} ${theme.text}`}>
        <div className="w-6 h-6">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
}