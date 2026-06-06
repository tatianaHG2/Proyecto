
type Props = {
    Nombre: string;
    Tipo: string;
    Ataque: number;
    Defensa: number;
    Descripcion: string;
    Imagen: string;
    Debilidad?: string;
    Rareza?: string;
    vida?: number;
    onOpen?: () => void;
    className?: string;
}

function CardDetail({
    Ataque,
    Defensa,
    Imagen,
    Nombre,
    Tipo,
    Descripcion,
    Debilidad,
    Rareza = "",
    vida = 0,
    onOpen,
    className = "",
}: Props) {

    const getRarezaColor = (rareza: string) => {
        switch(rareza.toLowerCase()) {
            case "mítica":
                return "bg-gradient-to-r from-purple-600 to-yellow-500";
            case "legendaria":
                return "bg-gradient-to-r from-orange-600 to-yellow-500";
            case "épica":
                return "bg-gradient-to-r from-purple-600 to-pink-500";
            case "común":
                return "bg-gradient-to-r from-gray-500 to-gray-400";
            default:
                return "bg-red-600";
        }
    };

    const getTipoColor = (tipo: string) => {
        const tipoLower = tipo.toLowerCase();
        if (tipoLower.includes("líder") || tipoLower.includes("lider")) return "from-red-900 to-red-700";
        if (tipoLower.includes("político") || tipoLower.includes("politico")) return "from-blue-900 to-blue-700";
        if (tipoLower.includes("social")) return "from-green-900 to-green-700";
        if (tipoLower.includes("vengativo")) return "from-purple-900 to-purple-700";
        if (tipoLower.includes("guitarrista")) return "from-yellow-900 to-yellow-700";
        if (tipoLower.includes("rapera")) return "from-orange-900 to-orange-700";
        if (tipoLower.includes("apoyo")) return "from-pink-900 to-pink-700";
        if (tipoLower.includes("matón") || tipoLower.includes("maton")) return "from-gray-900 to-gray-700";
        if (tipoLower.includes("empresario")) return "from-indigo-900 to-indigo-700";
        return "from-red-900 to-red-700";
    };

    return (
        <div 
            className={`
                relative w-72 rounded-xl overflow-hidden cursor-pointer
                transform transition-all duration-300 hover:scale-105 hover:-translate-y-2
                 ${getTipoColor(Tipo)}
                border-2 border-red-600 shadow-[0_0_20px_rgba(139,0,0,0.3)]
                hover:shadow-[0_0_30px_rgba(139,0,0,0.6)] hover:border-yellow-600
                group
                ${className}
            `} 
            onClick={() => onOpen && onOpen()}
        >
            <div className="absolute top-0 left-0 w-full h-1  from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {Rareza && (
                <span className={`
                    absolute top-3 right-3 z-20
                    ${getRarezaColor(Rareza)} text-white 
                    px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
                    shadow-lg border border-white/30
                    transform rotate-2 hover:rotate-0 transition-transform
                `}>
                    {Rareza}
                </span>
            )}

            <div className="absolute top-3 left-3 z-20 text-4xl font-black text-white/20 select-none">
                #
            </div>

            <div className="relative m-4 mb-2">
                <div className="absolute -inset-2  from-yellow-600 to-red-600 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="absolute -inset-1 bg-black rounded-lg transform scale-[1.02] group-hover:scale-[1.03] transition-transform"></div>
                
                <div className="relative z-10 p-1.5  from-amber-800 to-amber-600 rounded-lg shadow-xl">
                
                    <div className="absolute inset-0 rounded-lg border-2 border-amber-400/30 pointer-events-none"></div>
                    
            
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-400 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-400 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-400 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-400 rounded-br-lg"></div>
                    

                    <img 
                        src={Imagen} 
                        alt={Nombre} 
                        className="relative z-10 w-full h-56 object-contain rounded-md bg-black/40"
                        onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
                        }}
                    />
          
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-400/30 rounded-full blur-sm"></div>
                        <div className="absolute bottom-1 right-1 w-3 h-3 bg-orange-500/30 rounded-full blur-md"></div>
                    </div>
                </div>
            </div>


            <div className="p-4 pt-2 relative">

                <h3 className="text-white font-['Black_Ops_One',cursive] text-xl mb-1 text-center 
                    drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wider">
                    {Nombre}
                </h3>


                <p className="text-center text-sm text-gray-300 mb-3 italic border-b border-red-600/50 pb-2">
                    {Tipo}
                </p>


                <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-black/60 rounded-lg p-2 border border-red-600/50">
                        <span className="block text-xs text-gray-400 uppercase">Ataque</span>
                        <span className="text-lg font-bold text-red-500">{Ataque}</span>
                    </div>
                    <div className="bg-black/60 rounded-lg p-2 border border-blue-600/50">
                        <span className="block text-xs text-gray-400 uppercase">Defensa</span>
                        <span className="text-lg font-bold text-blue-500">{Defensa}</span>
                    </div>
                    <div className="bg-black/60 rounded-lg p-2 border border-green-600/50">
                        <span className="block text-xs text-gray-400 uppercase">Vida</span>
                        <span className="text-lg font-bold text-green-500">{vida}</span>
                    </div>
                </div>

                <div className="absolute left-0 right-0 bottom-full mb-2 mx-4 p-3 
                    bg-black/95 text-white text-xs rounded-lg border border-red-600
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    pointer-events-none z-30 backdrop-blur-sm
                    shadow-xl max-h-32 overflow-y-auto">
                    <p className="leading-relaxed">{Descripcion}</p>
                    {Debilidad && (
                        <p className="mt-2 text-red-400 font-semibold">
                            <span className="text-yellow-500">⚡</span> Debilidad: {Debilidad}
                        </p>
                    )}
                </div>

                <div className="absolute bottom-2 right-2 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            <div className="absolute bottom-0 right-0 w-12 h-12  from-black/50 to-transparent transform rotate-45 translate-x-6 translate-y-6"></div>
        </div>
    );
}

export default CardDetail;