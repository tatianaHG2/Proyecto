type props = {
  Numero: number;
  Nombre: string;
  Tipo: string;
  Ataque: number;
  Defensa: number;
  Descripcion: string;
  Debilidad?: string;
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
  onClose,
}: props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-40 backdrop-blur-sm z-50">
      <div className="bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl p-8 w-96 max-w-full mx-4 shadow-2xl transform scale-100 transition-transform duration-300">
        <div className="bg-white bg-opacity-95 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">
              {Nombre} (#{Numero})
            </h3>
            <button
              onClick={() => onClose && onClose()}
              className="text-2xl font-bold text-gray-600 hover:text-red-500 transition-colors duration-300"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-600 mb-2">
            Tipo: <span className="font-semibold">{Tipo}</span>
          </p>
          <div className="flex justify-between text-sm mb-4">
            <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full">
              Ataque: {Ataque}
            </span>
            <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full">
              Defensa: {Defensa}
            </span>
          </div>
          <p className="text-gray-700 mb-4">{Descripcion}</p>
          <p className="text-gray-600">
            Debilidad: <span className="font-semibold">{Debilidad}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Modal;
