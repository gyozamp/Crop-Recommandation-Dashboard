export type BadgeColor =
  | "emerald"
  | "indigo"
  | "orange"
  | "red"
  | "blue"
  | "purple"
  | "cyan";

export const BADGE_COLORS: Record<
  BadgeColor,
  { min: string; max: string }
> = {
  emerald: {
    min: "px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium",
    max: "px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium",
  },
  indigo: {
    min: "px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium",
    max: "px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 font-medium",
  },
  orange: {
    min: "px-2 py-1 rounded-full bg-orange-50 text-orange-700 font-medium",
    max: "px-2 py-1 rounded-full bg-orange-100 text-orange-800 font-medium",
  },
  red: {
    min: "px-2 py-1 rounded-full bg-red-50 text-red-700 font-medium",
    max: "px-2 py-1 rounded-full bg-red-100 text-red-800 font-medium",
  },
  blue: {
    min: "px-2 py-1 rounded-full bg-blue-50 text-blue-700 font-medium",
    max: "px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-medium",
  },
  purple: {
    min: "px-2 py-1 rounded-full bg-purple-50 text-purple-700 font-medium",
    max: "px-2 py-1 rounded-full bg-purple-100 text-purple-800 font-medium",
  },
  cyan: {
    min: "px-2 py-1 rounded-full bg-cyan-50 text-cyan-700 font-medium",
    max: "px-2 py-1 rounded-full bg-cyan-100 text-cyan-800 font-medium",
  },
};
