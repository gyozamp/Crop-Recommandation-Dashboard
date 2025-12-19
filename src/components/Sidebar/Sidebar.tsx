import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  PresentationChartLineIcon,
  CircleStackIcon,
  BoltIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

import IconLabel from "../Label/IconLabel";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const navItems = [
    { path: "/", label: "Overview", icon: HomeIcon },
    { path: "/analytics", label: "Analytics", icon: PresentationChartLineIcon },
    { path: "/dataset", label: "Dataset", icon: CircleStackIcon },
    // { path: "/settings", label: "Setting", icon: CogIcon },
  ];

  return (
    <aside
      className={`h-screen bg-white border-r border-gray-100 p-4 flex flex-col justify-between transition-all duration-300 ease-in-out shadow-[4px_0_24px_rgba(0,0,0,0.02)] ${
        isExpanded ? "w-72" : "w-20"
      } hidden md:flex relative`}
    >
      {/* --- 1. Toggle Button --- */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-9 bg-white border border-gray-200 text-gray-500 rounded-full p-1.5 hover:text-indigo-600 hover:border-indigo-300 shadow-sm transition-all z-50"
      >
        {isExpanded ? (
          <ChevronLeftIcon className="h-3 w-3" />
        ) : (
          <ChevronRightIcon className="h-3 w-3" />
        )}
      </button>

      {/* --- 2. Logo Section --- */}
      <div
        className={`flex items-center gap-3 mb-8 px-2 ${
          isExpanded ? "" : "justify-center"
        }`}
      >
        <div className="text-indigo-600 min-w-fit">
          <BoltIcon className="h-8 w-8" />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "w-40 opacity-100" : "w-0 opacity-0"
          }`}
        >
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900 whitespace-nowrap">
            IoT Dash
          </h1>
        </div>
      </div>

      {/* --- 3. Navigation --- */}
      <nav className="flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="relative group"
          >
            {({ isActive }) => (
              <>
                <IconLabel
                  icon={<item.icon />}
                  label={item.label}
                  active={isActive}
                  expanded={isExpanded}
                />
                {!isExpanded && (
                  <div className="absolute left-full ml-2 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* --- 4. Footer / Logout Section --- */}
      <div
        className={`mt-4 border-t border-gray-100 pt-4 ${
          isExpanded ? "" : "flex justify-center"
        }`}
      >
        <button className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors w-full p-2 rounded-lg hover:bg-red-50 group">
          <ArrowRightOnRectangleIcon className="h-6 w-6 min-w-[24px]" />

          <span
            className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"
            }`}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
