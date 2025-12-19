import type { ReactNode } from "react";

type ChartCardProps = {
  title?: string;
  subtitle?: string;
  headerRight?: ReactNode;
  children: ReactNode;
};

export default function ChartCard({
  title,
  subtitle,
  headerRight,
  children,
}: ChartCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      {(title || headerRight) && (
        <div className="mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4">
            {/* Title + Subtitle */}
            <div className="flex flex-col gap-1">
              {title && (
                <h2 className="text-xl font-bold text-gray-800 leading-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 max-w-xl">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Right-side content (MetricSelector, buttons, ecc.) */}
            {headerRight && (
              <div className="shrink-0">{headerRight}</div>
            )}
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
