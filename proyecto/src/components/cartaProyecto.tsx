type Props = {
    Nombre: string;
    Tipo: string;
    Ataque: number;
    Defensa: number;
    Descripcion: string;
    Imagen: string;
    Debilidad?: string;
    Rareza?: string;
    onOpen?: () => void;
    className?: string;
}
function CardDetail({
    Ataque,
    Defensa,
    Imagen,
    Nombre,
    Rareza = "",
    onOpen,
    className = "",

}: Props) {

    return (
        <div className={`bg-black border-2 border-pink-500 rounded-2xl p-6 w-72 cursor-pointer relative ${className}`} onClick={() => onOpen && onOpen()}>
            {Rareza && (
                <span className="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {Rareza}
                </span>
            )}
            <img src={Imagen} alt={Nombre} className="w-full h-56 object-contain rounded-lg mb-4 shadow-md" />
            <h3 className="text-white font-bold text-xl mb-2 text-center">{Nombre}</h3>
            <div className="flex justify-between text-sm">
                <span className="bg-pink-600 text-white px-3 py-2 rounded-full font-semibold shadow-sm">Ataque: {Ataque}</span>
                <span className="bg-pink-700 text-white px-3 py-2 rounded-full font-semibold shadow-sm">Defensa: {Defensa}</span>
            </div>
        </div>
    );
}
export default CardDetail;
