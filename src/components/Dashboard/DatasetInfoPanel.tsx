import FilterPanel from "../../components/FilterSelect/FilterPanel";

type DatasetInfoPanelProps = {
  samplesCount: number;
};

const FEATURES = [
  "Azoto (N)",
  "Fosforo (P)",
  "Potassio (K)",
  "Temperatura (°C)",
  "Umidità (%)",
  "pH",
  "Pioggia (mm)",
];

export default function DatasetInfoPanel({
  samplesCount,
}: DatasetInfoPanelProps) {
  return (
    <FilterPanel
      title="Informazioni sul Dataset"
      subtitle="Dettagli e caratteristiche principali del dataset utilizzato"
      className="flex flex-col h-full"
    >
      <div className="space-y-4 flex flex-col flex-1">
        {/* Riepilogo */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-xs text-indigo-700 font-medium">
              Record processati
            </p>
            <p className="text-2xl font-bold text-indigo-900">
              {samplesCount}
            </p>
          </div>

          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-xs text-indigo-700 font-medium">
              Numero feature
            </p>
            <p className="text-2xl font-bold text-indigo-900">
              {FEATURES.length}
            </p>
          </div>
        </div>

        {/* Feature */}
        <div className="p-5 bg-white rounded-xl border border-gray-200 space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Feature Dataset
            </p>
            <ul className="grid grid-cols-2 gap-2 text-xs text-gray-700">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Target */}
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Variabile target
            </p>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">
              Coltura (label)
            </div>
          </div>
        </div>

        {/* Descrizione */}
        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <h4 className="font-semibold text-indigo-900 mb-1 text-sm">
            Descrizione
          </h4>
          <p className="text-xs text-indigo-700 leading-relaxed">
            Il dataset raccoglie misurazioni agronomiche e ambientali utilizzate
            per l’analisi e la raccomandazione delle colture. Ogni record
            rappresenta un campione osservato in condizioni specifiche di suolo
            e clima.
          </p>
        </div>
      </div>
    </FilterPanel>
  );
}
