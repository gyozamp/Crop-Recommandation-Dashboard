import FilterPanel from "../FilterSelect/FilterPanel";
import MultiSelectTags from "../MultiSelect/MultiSelectTags";
import RangeSlider from "../Slider/RangeSlider";

type AnalyticsFiltersProps = {
  cropLabels: string[];
  selectedCrops: string[];
  onToggleCrop: (crop: string) => void;
  onClearCrops: () => void;

  tempRange: number[];
  onTempChange: (value: number[]) => void;

  phRange: number[];
  onPhChange: (value: number[]) => void;

  humidityRange: number[];
  onHumidityChange: (value: number[]) => void;
};

export default function AnalyticsFilters({
  cropLabels,
  selectedCrops,
  onToggleCrop,
  onClearCrops,
  tempRange,
  onTempChange,
  phRange,
  //onPhChange,
  humidityRange,
  //onHumidityChange,
}: AnalyticsFiltersProps) {
  return (
    <FilterPanel
      title="Opzioni e Controlli"
      className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 h-full"
    >
      {/* Selezione Colture */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Seleziona Colture ({selectedCrops.length} attive)
        </h3>

        <MultiSelectTags
          options={cropLabels}
          selected={selectedCrops}
          onToggle={onToggleCrop}
          onClear={onClearCrops}
        />
      </div>

      {/* Sliders */}
      <div className="border-t border-gray-100 pt-6 mt-6">
        <h3 className="text-lg font-bold mb-4 text-gray-700">
          Range Dati Ambientali
        </h3>

        <RangeSlider
          label="Temperatura"
          value={tempRange}
          onChange={(v) => Array.isArray(v) && onTempChange(v)}
          min={0}
          max={45}
          step={0.1}
          unit="°C"
        />

        <RangeSlider
          label="Livello pH"
          value={phRange}
          onChange={(v) => Array.isArray(v) && onTempChange(v)}
          min={0}
          max={15}
          step={0.1}
        />

        <RangeSlider
          label="Umidità"
          value={humidityRange}
          onChange={(v) => Array.isArray(v) && onTempChange(v)}
          min={0}
          max={100}
          step={1}
          unit="%"
        />
      </div>

      {/* Note */}
      <div className="p-4 mt-8 bg-indigo-50 text-indigo-800 text-sm rounded-xl border border-indigo-200">
        <p className="font-bold">Note</p>
        <p className="text-xs mt-1">
          L'analisi mostra come la Temperatura (X) e l'Umidità (Y)
          influenzano la distribuzione delle colture.
        </p>
      </div>
    </FilterPanel>
  );
}
