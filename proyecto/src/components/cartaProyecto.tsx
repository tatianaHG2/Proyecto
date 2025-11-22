type Props = {
    Numero: number;
    Nombre: string;
    Tipo: string;
    Ataque: number;
    Defensa: number;
    Descripcion: string;
    Imagen: string;
    Debilidad?: string;
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

}: Props) {
    return (
        <div className="border-dotted border-blue-400 border-2 p-4 w-60" >
            <h3 >
                {Nombre}(#{Numero})
            </h3>
            <img src={Imagen} alt={Nombre} />
            <p>Tipo: {Tipo}</p>
            <p>Ataque: {Ataque}</p>
            <p>Defensa:{Defensa}</p>
            <p> {Descripcion}</p>
            <p> Debilidad:
                {Debilidad}</p>
        </div>
    );
}
export default CardDetail;
