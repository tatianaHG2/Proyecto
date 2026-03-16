import { useState } from "react";
import { Link } from "react-router";

type NewCard = {
  Nombre: string;
  Tipo: string;
  Ataque: number;
  Defensa: number;
  Descripcion: string;
  Debilidad?: string;
  Rareza?: string;
  Imagen?: string;
};

interface CardFormProps {
  onSubmit: (newCard: NewCard) => void;
}

const validateField = (field: keyof NewCard, value: any): string => {
  switch (field) {
    case "Nombre":
      if (!value || String(value).trim().length < 3) return "El nombre es obligatorio (mínimo 3 caracteres).";
      return "";
    case "Tipo":
      if (!value || String(value).trim().length === 0) return "El tipo es obligatorio.";
      return "";
    case "Ataque":
      if (value === "" || value === null || isNaN(Number(value))) return "Ataque debe ser un número.";
      if (Number(value) < 0) return "Ataque no puede ser negativo.";
      return "";
    case "Defensa":
      if (value === "" || value === null || isNaN(Number(value))) return "Defensa debe ser un número.";
      if (Number(value) < 0) return "Defensa no puede ser negativo.";
      return "";
    case "Descripcion":
      if (!value || String(value).trim().length < 10) return "Descripción mínima 10 caracteres.";
      return "";
    default:
      return "";
  }
};

const validateAll = (values: NewCard) => {
  const newErrors: Partial<Record<keyof NewCard, string>> = {};
  (Object.keys(values) as Array<keyof NewCard>).forEach((key) => {
    const err = validateField(key, values[key]);
    if (err) newErrors[key] = err;
  });
  return newErrors;
};

const CardPreview = ({ card }: { card: NewCard }) => {
  const getRarezaColor = (rareza: string) => {
    switch(rareza?.toLowerCase()) {
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
    const tipoLower = tipo?.toLowerCase() || "";
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
        relative w-72 rounded-xl overflow-hidden
        bg-gradient-to-b ${getTipoColor(card.Tipo)}
        border-2 border-red-600 shadow-[0_0_20px_rgba(139,0,0,0.3)]
        group
      `}
    >
      {card.Rareza && (
        <span className={`
          absolute top-3 right-3 z-20
          ${getRarezaColor(card.Rareza)} text-white 
          px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
          shadow-lg border border-white/30
          transform rotate-2
        `}>
          {card.Rareza}
        </span>
      )}
      <div className="absolute top-3 left-3 z-20 text-4xl font-black text-white/20 select-none">
        #
      </div>

      <div className="relative m-4 mb-2">
        <div className="absolute -inset-2 bg-gradient-to-r from-yellow-600 to-red-600 rounded-lg blur-sm opacity-50"></div>
        <div className="absolute -inset-1 bg-black rounded-lg transform scale-[1.02]"></div>
                <div className="relative z-10 p-1.5 bg-gradient-to-br from-amber-800 to-amber-600 rounded-lg shadow-xl">
          <div className="absolute inset-0 rounded-lg border-2 border-amber-400/30 pointer-events-none"></div>
          
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-400 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-400 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-400 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-400 rounded-br-lg"></div>
          
          {card.Imagen ? (
            <img 
              src={card.Imagen} 
              alt={card.Nombre || "Vista previa"} 
              className="relative z-10 w-full h-40 object-contain rounded-md bg-black/40"
            />
          ) : (
            <div className="w-full h-40 bg-black/60 rounded-md flex items-center justify-center">
              <span className="text-gray-500 text-sm">Sin imagen</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 pt-2">
        <h3 className="text-white font-['Black_Ops_One',cursive] text-xl mb-1 text-center 
          drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wider">
          {card.Nombre || "Nombre de la carta"}
        </h3>

        <p className="text-center text-sm text-gray-300 mb-3 italic border-b border-red-600/50 pb-2">
          {card.Tipo || "Tipo de carta"}
        </p>

        <div className="flex justify-between gap-2">
          <div className="flex-1 bg-black/60 rounded-lg p-2 border border-red-600/50">
            <span className="block text-xs text-gray-400 uppercase">Ataque</span>
            <span className="text-lg font-bold text-red-500">{card.Ataque}</span>
          </div>
          <div className="flex-1 bg-black/60 rounded-lg p-2 border border-blue-600/50">
            <span className="block text-xs text-gray-400 uppercase">Defensa</span>
            <span className="text-lg font-bold text-blue-500">{card.Defensa}</span>
          </div>
        </div>

        {card.Descripcion && (
          <div className="mt-3 p-2 bg-black/40 rounded-lg border border-red-700/30">
            <p className="text-gray-300 text-xs italic line-clamp-2">
              "{card.Descripcion}"
            </p>
          </div>
        )}

        {card.Debilidad && (
          <div className="mt-2 flex items-center gap-1.5 p-1.5 bg-red-900/20 rounded-lg border border-red-700/30">
            <span className="text-yellow-500 text-base">⚡</span>
            <p className="text-gray-300 text-xs truncate">
              <span className="font-semibold text-red-400">Debilidad:</span> {card.Debilidad}
            </p>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-black/50 to-transparent transform rotate-45 translate-x-6 translate-y-6"></div>
    </div>
  );
};

const CardForm = ({ onSubmit }: CardFormProps) => {
  const [card, setCard] = useState<NewCard>({
    Nombre: "",
    Tipo: "",
    Ataque: 0,
    Defensa: 0,
    Descripcion: "",
    Debilidad: "",
    Rareza: "",
    Imagen: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof NewCard, string>>>({});

  const handleChange = <K extends keyof NewCard>(field: K, value: NewCard[K]) => {
    setCard((prev) => ({ ...prev, [field]: value }));
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateAll(card);
    const hasErrors = Object.values(validation).some((v) => v && v.length > 0);
    if (hasErrors) {
      setErrors(validation);
      return;
    }
    onSubmit(card);
    setCard({
      Nombre: "",
      Tipo: "",
      Ataque: 0,
      Defensa: 0,
      Descripcion: "",
      Debilidad: "",
      Rareza: "",
      Imagen: "",
    });
    setErrors({});
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 justify-center items-start p-4">
      <form onSubmit={handleSubmit} 
        className="w-full lg:w-[500px] p-6 
        bg-gradient-to-br from-black/90 via-red-950/90 to-black/90 
        border-2 border-red-700 rounded-2xl
        shadow-[0_0_30px_rgba(139,0,0,0.3)] 
        backdrop-blur-sm relative overflow-hidden">
        
        <div className="absolute -top-10 -right-10 text-9xl font-black text-red-900/20 rotate-12 select-none">
          REBELDE
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>

        <h2 className="text-white font-['Black_Ops_One',cursive] text-2xl mb-6 pb-2 border-b-2 border-red-700
          drop-shadow-[0_0_10px_rgba(139,0,0,0.5)]">
          CREAR CARTA
        </h2>

        <div className="flex flex-col gap-4 relative z-10">
          <div>
            <label className="text-gray-300 font-semibold uppercase text-sm tracking-wider mb-2 block">
              Nombre
            </label>
            <input 
              value={card.Nombre} 
              onChange={(e) => handleChange("Nombre", e.target.value)} 
              placeholder="Ej. Mia Colucci" 
              className="w-full p-3 bg-black/80 border border-red-700 rounded-lg text-white
                focus:border-yellow-600 focus:ring-2 focus:ring-red-700/50 focus:scale-[1.02] 
                transition-all duration-300 placeholder:text-gray-500"
            />
            {errors.Nombre && (
              <span className="text-red-500 text-sm mt-1 block border-l-2 border-red-700 pl-2">
                {errors.Nombre}
              </span>
            )}
          </div>

          <div>
            <label className="text-gray-300 font-semibold uppercase text-sm tracking-wider mb-2 block">
              Tipo
            </label>
            <input 
              value={card.Tipo} 
              onChange={(e) => handleChange("Tipo", e.target.value)} 
              placeholder="Ej. Líder Rebelde" 
              className="w-full p-3 bg-black/80 border border-red-700 rounded-lg text-white
                focus:border-yellow-600 focus:ring-2 focus:ring-red-700/50 focus:scale-[1.02] 
                transition-all duration-300 placeholder:text-gray-500"
            />
            {errors.Tipo && (
              <span className="text-red-500 text-sm mt-1 block border-l-2 border-red-700 pl-2">
                {errors.Tipo}
              </span>
            )}
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-gray-300 font-semibold uppercase text-sm tracking-wider mb-2 block">
                Ataque
              </label>
              <input 
                type="number" 
                min={0} 
                value={card.Ataque} 
                onChange={(e) => handleChange("Ataque", Number(e.target.value))} 
                className="w-full p-3 bg-black/80 border border-red-700 rounded-lg text-white
                  focus:border-yellow-600 focus:ring-2 focus:ring-red-700/50 focus:scale-[1.02] 
                  transition-all duration-300"
              />
              {errors.Ataque && (
                <span className="text-red-500 text-sm mt-1 block border-l-2 border-red-700 pl-2">
                  {errors.Ataque}
                </span>
              )}
            </div>
            <div className="flex-1">
              <label className="text-gray-300 font-semibold uppercase text-sm tracking-wider mb-2 block">
                Defensa
              </label>
              <input 
                type="number" 
                min={0} 
                value={card.Defensa} 
                onChange={(e) => handleChange("Defensa", Number(e.target.value))} 
                className="w-full p-3 bg-black/80 border border-red-700 rounded-lg text-white
                  focus:border-yellow-600 focus:ring-2 focus:ring-red-700/50 focus:scale-[1.02] 
                  transition-all duration-300"
              />
              {errors.Defensa && (
                <span className="text-red-500 text-sm mt-1 block border-l-2 border-red-700 pl-2">
                  {errors.Defensa}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="text-gray-300 font-semibold uppercase text-sm tracking-wider mb-2 block">
              Descripción
            </label>
            <textarea 
              value={card.Descripcion} 
              onChange={(e) => handleChange("Descripcion", e.target.value)} 
              placeholder="Descripción (mínimo 10 caracteres)" 
              className="w-full p-3 bg-black/80 border border-red-700 rounded-lg text-white
                focus:border-yellow-600 focus:ring-2 focus:ring-red-700/50 focus:scale-[1.02] 
                transition-all duration-300 placeholder:text-gray-500 resize-none min-h-[100px]"
            />
            {errors.Descripcion && (
              <span className="text-red-500 text-sm mt-1 block border-l-2 border-red-700 pl-2">
                {errors.Descripcion}
              </span>
            )}
          </div>
          <div>
            <label className="text-gray-300 font-semibold uppercase text-sm tracking-wider mb-2 block">
              Debilidad
            </label>
            <input 
              value={card.Debilidad} 
              onChange={(e) => handleChange("Debilidad", e.target.value)} 
              className="w-full p-3 bg-black/80 border border-red-700 rounded-lg text-white
                focus:border-yellow-600 focus:ring-2 focus:ring-red-700/50 focus:scale-[1.02] 
                transition-all duration-300 placeholder:text-gray-500"
            />
          </div>
          <div>
            <label className="text-gray-300 font-semibold uppercase text-sm tracking-wider mb-2 block">
              Rareza
            </label>
            <input 
              value={card.Rareza} 
              onChange={(e) => handleChange("Rareza", e.target.value)} 
              className="w-full p-3 bg-black/80 border border-red-700 rounded-lg text-white
                focus:border-yellow-600 focus:ring-2 focus:ring-red-700/50 focus:scale-[1.02] 
                transition-all duration-300 placeholder:text-gray-500"
            />
          </div>
          <div>
            <label className="text-gray-300 font-semibold uppercase text-sm tracking-wider mb-2 block">
              Imagen (URL)
            </label>
            <input 
              value={card.Imagen} 
              onChange={(e) => handleChange("Imagen", e.target.value)} 
              className="w-full p-3 bg-black/80 border border-red-700 rounded-lg text-white
                focus:border-yellow-600 focus:ring-2 focus:ring-red-700/50 focus:scale-[1.02] 
                transition-all duration-300 placeholder:text-gray-500"
            />
          </div>
          <button 
            type="submit" 
            disabled={Object.values(errors).some((v) => v && v.length > 0)}
            className="mt-4 bg-gradient-to-r from-black to-red-800 text-white 
              font-['Black_Ops_One',cursive] uppercase tracking-wider
              py-3 px-6 rounded-full border-2 border-red-700
              hover:border-yellow-600 hover:shadow-[0_5px_20px_rgba(139,0,0,0.5)]
              hover:-translate-y-1 transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
              disabled:hover:shadow-none disabled:hover:border-red-700
              relative overflow-hidden group">
              <span className="relative z-10">Crear carta</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
          </button>
        </div>
      </form>

      <div className="w-full lg:w-auto flex flex-col items-center">
        <div className="mb-4 text-center">
          <h3 className="text-white font-['Black_Ops_One',cursive] text-xl 
            border-b-2 border-red-700 pb-2 inline-block px-6">
            VISTA PREVIA
          </h3>
        </div>
        <CardPreview card={card} />
        <p className="text-gray-400 text-sm mt-4 text-center max-w-xs">
          Vista en tiempo real de cómo se verá tu carta
        </p>
      </div>
         <div className="flex justify-center mb-8"></div>
                  <Link to= '/inicio'  className="group relative inline-flex items-center justify-center px-8 py-4 
          from-purple-600 to-blue-600 
            text-white font-bold text-lg rounded-xl
            shadow-lg hover:shadow-2xl 
            transform transition-all duration-300 
            hover:scale-105 hover:from-purple-700 hover:to-blue-700
            focus:outline-none focus:ring-4 focus:ring-purple-300
            overflow-hidden"

        >  
          
              
        Ver Cartas</Link>
    </div>
  );
};

export default CardForm;