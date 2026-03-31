import { useNavigate } from 'react-router-dom';

type props = {
  Numero: number;
  Nombre: string;
  Tipo: string;
  Ataque: number;
  Defensa: number;
  Descripcion: string;
  Debilidad?: string;
  Rareza?: string;
  Imagen?: string;
  onClose: () => void;
  onDelete?: () => void;
};

function Modal({
  Ataque,
  Tipo,
  Defensa,
  Descripcion,
  Nombre,
  Numero,
  Debilidad = "",
  Rareza = "",
  Imagen = "",
  onClose,
  onDelete,
}: props) {
  const navigate = useNavigate();
  
  const getRarezaColor = (rareza: string) => {
    switch(rareza.toLowerCase()) {
      case "mítica":
        return {
          border: "border-purple-600",
          bg: "from-purple-900 to-purple-700",
          text: "text-purple-400",
          glow: "shadow-purple-600/50"
        };
      case "legendaria":
        return {
          border: "border-orange-600",
          bg: "from-orange-900 to-orange-700",
          text: "text-orange-400",
          glow: "shadow-orange-600/50"
        };
      case "épica":
        return {
          border: "border-pink-600",
          bg: "from-pink-900 to-pink-700",
          text: "text-pink-400",
          glow: "shadow-pink-600/50"
        };
      case "común":
        return {
          border: "border-gray-600",
          bg: "from-gray-900 to-gray-700",
          text: "text-gray-400",
          glow: "shadow-gray-600/50"
        };
      default:
        return {
          border: "border-red-600",
          bg: "from-red-900 to-red-700",
          text: "text-red-400",
          glow: "shadow-red-600/50"
        };
    }
  };

  const handleEdit = () => {

    navigate(`/actualizar/${Numero}`, {
      state: {
        Numero,
        Nombre,
        Tipo,
        Ataque,
        Defensa,
        Descripcion,
        Debilidad,
        Rareza,
        Imagen
      }
    });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar a ${Nombre}?`)) {
      if (onDelete) {
        onDelete();
      }
      onClose();
    }
  };

  const rarezaStyle = getRarezaColor(Rareza);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_15px,rgba(139,0,0,0.08)_15px,rgba(139,0,0,0.08)_30px)]"></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-black text-red-900/10 rotate-12 select-none whitespace-nowrap">
          REBELDE
        </div>
        <div className="absolute bottom-5 right-5 text-5xl font-black text-red-900/10 -rotate-12 select-none">
          WAY
        </div>
      </div>

      <div 
        className={`
          relative w-80 max-w-full
          from-black via-red-950 to-black
          border-2 ${rarezaStyle.border}
          rounded-xl p-1
          shadow-[0_0_25px_rgba(139,0,0,0.5)] ${rarezaStyle.glow}
          animate-[modalAppear_0.3s_ease-out]
          z-10
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 w-full h-0.5 from-transparent via-yellow-400 to-transparent"></div>
        
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-600 rounded-tl-xl"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-600 rounded-tr-xl"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-600 rounded-bl-xl"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-600 rounded-br-xl"></div>

        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 relative overflow-hidden">
          
          <div className="absolute -right-4 -top-4 text-6xl font-black text-red-900/20 select-none">
            #{Numero}
          </div>

          <div className="flex justify-between items-start mb-3 relative z-10">
            <div className="pr-2">
              <h3 className="font-['Black_Ops_One',cursive] text-lg text-white drop-shadow-[0_1px_1px_rgba(139,0,0,0.5)] truncate max-w-[150px]">
                {Nombre}
              </h3>
              <p className={`text-xs ${rarezaStyle.text} uppercase tracking-wider`}>
                #{Numero} • {Tipo}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-red-900/50 border border-red-700
                text-white text-lg hover:bg-red-800 hover:border-yellow-600
                transition-all duration-300 hover:rotate-90 hover:scale-110
                flex items-center justify-center "
            >
              ✕
            </button>
          </div>

          {Imagen && (
            <div className="relative mb-3 group">
              <div className="absolute -inset-2  from-red-600 to-yellow-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="absolute -inset-1 bg-black rounded-lg transform scale-[1.02]"></div>
              
              <div className="relative z-10 p-1  from-amber-800 to-amber-600 rounded-lg shadow-lg">
                <div className="absolute inset-0 rounded-lg border-2 border-amber-400/30 pointer-events-none"></div>
                
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-400 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-400 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-400 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-400 rounded-br-lg"></div>
                
                <img 
                  src={Imagen} 
                  alt={Nombre} 
                  className="w-full h-40 object-contain rounded-md bg-black/40"
                />
              </div>
              
              {Rareza && (
                <span className={`
                  absolute -top-1 -right-1 z-20
                 ${rarezaStyle.bg} text-white
                  px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                  border border-white/30 shadow-lg
                  transform rotate-3
                `}>
                  {Rareza}
                </span>
              )}
              
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-400/30 rounded-full blur-sm"></div>
                <div className="absolute bottom-1 right-1 w-3 h-3 bg-orange-500/30 rounded-full blur-md"></div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-black/60 rounded-lg p-2 border border-red-700/50">
              <p className="text-[10px] text-gray-400 uppercase">Ataque</p>
              <p className="text-lg font-bold text-red-500">{Ataque}</p>
              <div className="w-full h-0.5 bg-red-900/50 mt-1">
                <div className="h-full bg-red-500" style={{width: `${(Ataque/150)*100}%`}}></div>
              </div>
            </div>
            <div className="bg-black/60 rounded-lg p-2 border border-blue-700/50">
              <p className="text-[10px] text-gray-400 uppercase">Defensa</p>
              <p className="text-lg font-bold text-blue-500">{Defensa}</p>
              <div className="w-full h-0.5 bg-blue-900/50 mt-1">
                <div className="h-full bg-blue-500" style={{width: `${(Defensa/150)*100}%`}}></div>
              </div>
            </div>
          </div>

          <div className="mb-3 p-2 bg-black/40 rounded-lg border border-red-700/30 relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-red-700/30"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-red-700/30"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-red-700/30"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-red-700/30"></div>
            <p className="text-gray-300 text-xs leading-relaxed italic line-clamp-3">
              "{Descripcion}"
            </p>
          </div>

          {Debilidad && (
            <div className="flex items-center gap-1.5 p-1.5 bg-red-900/20 rounded-lg border border-red-700/30">
              <span className="text-yellow-500 text-base">⚡</span>
              <p className="text-gray-300 text-xs truncate">
                <span className="font-semibold text-red-400">Debilidad:</span> {Debilidad}
              </p>
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-3 w-full py-1.5 bg-gradient-to-r from-red-900 to-red-800
              text-white font-['Black_Ops_One',cursive] uppercase tracking-wider text-sm
              rounded-lg border border-red-700 hover:border-yellow-600
              transition-all duration-300 hover:-translate-y-0.5
              block md:hidden"
          >
            Cerrar
          </button>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={handleEdit}
              className="py-1.5 bg-gray-800 text-white font-['Black_Ops_One',cursive] uppercase tracking-wider text-sm
                rounded-lg border border-gray-600 hover:border-gray-400 hover:bg-gray-700
                transition-all duration-300 hover:-translate-y-0.5
                shadow-lg"
            >
              ✏️ Editar
            </button>

            <button
              onClick={handleDelete}
              className="py-1.5 bg-gray-900 text-white font-['Black_Ops_One',cursive] uppercase tracking-wider text-sm
                rounded-lg border border-red-800 hover:border-red-600 hover:bg-red-950
                transition-all duration-300 hover:-translate-y-0.5
                shadow-lg"
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;