type Props = {
    Numero: number;
    Nombre: string;
    Tipo: string;
    Ataque: number;
    Defensa: number;
    Descripcion: string;
    Imagen: string;
    Debilidad?: string;
    onOpen?: () => void;
    className?: string;
}
function CardDetail({
    Ataque,
    Defensa,
    Descripcion,
    Imagen,
    Nombre,
    Numero,
    Tipo,
    Debilidad = "",
    onOpen,
    className = "",

}: Props) {

    return (
        <div className={`border border-gray-300 rounded-lg p-4 w-64 cursor-pointer hover:shadow-md transition-shadow ${className}`} onClick={() => onOpen && onOpen()}>
            <img src={Imagen} alt={Nombre} className="w-full h-32 object-contain rounded mb-2" />
            <h3 className="text-blue-600 font-bold text-lg mb-1">{Nombre} (#{Numero})</h3>
            <p className="text-gray-700 text-sm mb-1">Tipo: {Tipo}</p>
            <div className="flex justify-between text-xs mb-2">
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Ataque: {Ataque}</span>
                <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">Defensa: {Defensa}</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">{Descripcion}</p>
            <p className="text-gray-500 text-xs">Debilidad: {Debilidad}</p>
        </div>
    );
}
export default CardDetail;
