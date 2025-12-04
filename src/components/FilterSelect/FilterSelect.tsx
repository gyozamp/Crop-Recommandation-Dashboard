import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/24/outline";

type Props = {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string; // Opzionale: testo personalizzato per l'opzione vuota
};

export default function FilterSelect({ 
  label, 
  options, 
  value, 
  onChange,
  placeholder = "Tutte" 
}: Props) {
  return (
    <div className="w-full max-w-xs">
      {/* Label con icona */}
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <FunnelIcon className="h-4 w-4 text-gray-500" />
        {label}
      </label>
      
      <div className="relative mt-1">
        <select
          className="appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2.5 pl-4 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200 cursor-pointer hover:border-gray-400"
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          <option value="" className="text-gray-500 font-medium">
            {placeholder}
          </option>
          {options.map(opt => (
            <option key={opt} value={opt} className="text-gray-900 py-1">
              {opt}
            </option>
          ))}
        </select>
        
        {/* Icona personalizzata a destra (pointer-events-none permette di cliccare "attraverso" l'icona) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}