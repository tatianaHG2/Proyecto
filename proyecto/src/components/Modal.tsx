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
  onClose?: () => void;
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
}: props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gradient-to-br from-black to-pink-500 rounded-2xl p-8 w-96 max-w-full mx-4 shadow-2xl border-2 border-pink-500">
        <div className="bg-black bg-opacity-95 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-white">
              {Nombre} (#{Numero})
            </h3>
            <button
              onClick={() => onClose && onClose()}
              className="text-2xl font-bold text-gray-400 hover:text-pink-500"
            >
              ✕
            </button>
          </div>
          {Imagen && (
            <img src={Imagen} alt={Nombre} className="w-full h-40 object-contain rounded-lg mb-4 shadow-md" />
          )}
          <p className="text-gray-300 mb-2">
            Tipo: <span className="font-semibold text-pink-400">{Tipo}</span>
          </p>
          {Rareza && (
            <p className="text-gray-300 mb-2">
              Rareza: <span className="font-semibold text-pink-400">{Rareza}</span>
            </p>
          )}
          <div className="flex justify-between text-sm mb-4">
            <span className="bg-pink-600 text-white px-3 py-1 rounded-full">
              Ataque: {Ataque}
            </span>
            <span className="bg-pink-700 text-white px-3 py-1 rounded-full">
              Defensa: {Defensa}
            </span>
          </div>
          <p className="text-gray-200 mb-4">{Descripcion}</p>
          <p className="text-gray-300">
            Debilidad: <span className="font-semibold text-pink-400">{Debilidad}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Modal;
