import { useState } from "react";

interface SearchAndDeleteProps {
  onSearch: (searchTerm: string) => void;
  onDeleteAll: () => void;
  cardsCount: number;
  filteredCount: number;
  searchTerm: string;
}

const SearchAndDelete = ({ 
  onSearch, 
  onDeleteAll, 
  cardsCount, 
  filteredCount,
  searchTerm 
}: SearchAndDeleteProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };

  const handleClear = () => {
    setLocalSearchTerm("");
    onSearch("");
  };

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    onDeleteAll();
    setShowConfirmDelete(false);
    setLocalSearchTerm(""); 
  };

  return (
    <div className="space-y-4 mb-8">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            placeholder="Buscar carta por nombre..."
            className="w-full px-4 py-3 bg-black/50 border-2 border-red-800 rounded-lg 
              text-white placeholder-red-300/50 focus:outline-none focus:border-red-500
              transition-colors pr-24"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 text-sm">
            {filteredCount} / {cardsCount}
          </span>
        </div>
        
        <button
          type="submit"
          className="px-6 py-3 bg-red-800 text-white rounded-lg font-bold
            hover:bg-red-700 transition-all transform hover:scale-105
            border border-red-500 shadow-[0_0_10px_rgba(139,0,0,0.3)]
            min-w-[100px]"
        >
          Buscar
        </button>

        {localSearchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-3 bg-gray-800 text-white rounded-lg font-bold
              hover:bg-gray-700 transition-all border border-gray-600
              min-w-[100px]"
          >
            Limpiar
          </button>
        )}
      </form>

      <div className="flex justify-between items-center bg-black/30 p-4 rounded-lg border border-red-900/30">
        <div className="text-white">
          <span className="text-red-400 font-bold">{filteredCount}</span> cartas mostradas 
          {searchTerm && <span className="text-gray-400"> (filtradas por "{searchTerm}")</span>}
        </div>

        <div className="relative">
          <button
            onClick={handleDeleteClick}
            disabled={filteredCount === 0}
            className={`px-6 py-2 rounded-lg font-bold flex items-center gap-2
              transition-all transform hover:scale-105
              ${filteredCount > 0 
                ? 'bg-red-700 hover:bg-red-600 text-white border border-red-500 shadow-[0_0_10px_rgba(255,0,0,0.3)]' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'}`}
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
              />
            </svg>
            Eliminar {filteredCount > 0 && `(${filteredCount})`}
          </button>

          {showConfirmDelete && (
            <div className="absolute top-full right-0 mt-2 bg-black/95 border-2 border-red-600 
              rounded-lg p-5 z-50 min-w-[320px] shadow-[0_0_30px_rgba(139,0,0,0.7)]
              backdrop-blur-sm">
              <h3 className="text-white text-lg font-bold mb-3 flex items-center gap-2">
                <span className="text-red-500 text-2xl">⚠️</span>
                Confirmar eliminación
              </h3>
              <p className="text-gray-300 mb-4">
                ¿Estás seguro que deseas eliminar <span className="text-red-400 font-bold">{filteredCount}</span> carta(s)?
                {searchTerm && <span className="block text-sm mt-1 text-gray-400">
                  (Filtradas por: "{searchTerm}")
                </span>}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2.5 bg-red-700 text-white font-bold rounded
                    hover:bg-red-600 transition-colors border border-red-500
                    shadow-[0_0_10px_rgba(255,0,0,0.3)]"
                >
                  Sí, eliminar
                </button>
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-800 text-white font-bold rounded
                    hover:bg-gray-700 transition-colors border border-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {filteredCount === 0 && cardsCount > 0 && (
        <div className="text-center py-8 bg-red-900/20 rounded-lg border border-red-800">
          <p className="text-red-400 text-xl font-bold mb-2">
            😢 No se encontraron cartas
          </p>
          <p className="text-gray-400">
            No hay cartas que coincidan con "{searchTerm}"
          </p>
          <button
            onClick={handleClear}
            className="mt-4 px-6 py-2 bg-red-800 text-white rounded-lg
              hover:bg-red-700 transition-colors inline-block"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchAndDelete;