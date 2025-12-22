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
        <div className="pb-3 mb-4 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4">
            {/* Title + Subtitle */}
            <div>
              {title && (
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Right-side content */}
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
