import React, { useEffect, useState, useMemo } from "react";
import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender,
  getPaginationRowModel, // Per la paginazione
  getFilteredRowModel,   // Per il filtro globale
  getSortedRowModel,    // Per l'ordinamento
} from "@tanstack/react-table";
import type { ColumnDef, SortingState } from "@tanstack/react-table"; // Aggiunto SortingState
import type { CropSample } from "../types/crop";
import { getSamples } from "../services/dataService";
import { MagnifyingGlassIcon, ChevronUpDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Devices() {
  const [data, setData] = useState<CropSample[]>([]);
  const [loading, setLoading] = useState(true); // Stato di caricamento
  const [globalFilter, setGlobalFilter] = useState(""); // Stato per il filtro globale
  const [sorting, setSorting] = useState<SortingState>([]); // Stato per l'ordinamento

  useEffect(() => {
    setLoading(true);
    getSamples()
      .then(samples => {
        setData(samples);
        setLoading(false);
      })
      .catch(error => {
        console.error("Errore nel recupero dei campioni:", error);
        setLoading(false);
      });
  }, []);

  const columns = useMemo<ColumnDef<CropSample>[]>(
    () => [
      { 
        accessorKey: "label", 
        header: "Coltura",
        cell: info => <span className="font-medium text-gray-800">{info.getValue() as string}</span>,
      },
      { accessorKey: "N", header: "N", meta: { type: "number" } },
      { accessorKey: "P", header: "P", meta: { type: "number" } },
      { accessorKey: "K", header: "K", meta: { type: "number" } },
      { accessorKey: "temperature", header: "Temp (°C)", meta: { type: "number" } },
      { accessorKey: "humidity", header: "Umidità (%)", meta: { type: "number" } },
      { accessorKey: "ph", header: "pH", meta: { type: "number" } },
      { accessorKey: "rainfall", header: "Pioggia (mm)", meta: { type: "number" } },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Abilita paginazione
    getFilteredRowModel: getFilteredRowModel(),     // Abilita filtro
    getSortedRowModel: getSortedRowModel(),         // Abilita ordinamento
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    state: {
      globalFilter,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 10, // Imposta un numero di righe per pagina predefinito
      },
    },
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Crop Recommendation Dataset</h2>

      {/* Toolbar: Search and potentially other actions */}
      <div className="flex items-center justify-between mb-6">
        {/* Search Input */}
        <div className="relative flex items-center w-full max-w-xs">
          <MagnifyingGlassIcon className="absolute left-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={globalFilter ?? ""}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Cerca in tutte le colonne..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
        {/* Altri bottoni o filtri qui (es. Export, Add New) */}
        {/* <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <PlusIcon className="h-5 w-5"/> Aggiungi Dati
        </button> */}
      </div>

      <div className="overflow-x-auto relative rounded-lg border border-gray-200">
        {loading ? (
          <div className="flex items-center justify-center p-12 text-gray-500">
            <svg className="animate-spin h-6 w-6 mr-3 text-indigo-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Caricamento dati...
          </div>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10"> {/* Header sticky per scroll */}
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()} // Abilita l'ordinamento
                    >
                      <div className="flex items-center gap-2 group">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {/* Indicatore di ordinamento */}
                        {header.column.getCanSort() && (
                            <ChevronUpDownIcon className={`h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors ${
                                header.column.getIsSorted() === 'asc' ? 'text-indigo-500 rotate-180' : 
                                header.column.getIsSorted() === 'desc' ? 'text-indigo-500' : ''
                            }`}/>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-gray-100">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="bg-white hover:bg-indigo-50 transition-colors group">
                  {row.getVisibleCells().map(cell => (
                    <td 
                      key={cell.id} 
                      className="p-4 text-sm text-gray-700 group-hover:text-gray-900"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && data.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            Nessun dato trovato.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && data.length > 0 && (
        <div className="flex items-center justify-between mt-6 p-4 border-t border-gray-100 bg-white rounded-b-xl">
          <div className="text-sm text-gray-600">
            Pagina{" "}
            <span className="font-semibold">
              {table.getState().pagination.pageIndex + 1} di {table.getPageCount()}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <ChevronLeftIcon className="h-4 w-4 mr-1" /> Precedente
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              Successiva <ChevronRightIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}