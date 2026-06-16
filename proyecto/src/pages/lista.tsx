import { useState } from "react";
import CardDetail from "../components/cartaProyecto";
import { Link } from "react-router-dom";
import type { Card } from "../util/interface";
import Modal from "../components/Modal";
function Lista({cards, onDelete}:{cards: Card[], onDelete: (id: number) => Promise<void>}) {
const [selected, setSelected] = useState<Card | null>(null);
const [searchTerm] = useState("");
const openCard = (card: Card) => setSelected(card);
const closeModal = () => setSelected(null);
const filteredCards = cards.filter((card: { Nombre: string; }) =>
    card.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

return (
<>
{selected&& <Modal Numero={selected.Numero} Nombre={selected.Nombre} Tipo={selected.Tipo} Ataque={selected.Ataque} Defensa={selected.Defensa} Descripcion={selected.Descripcion} Imagen={selected.Imagen} Debilidad={selected.Debilidad} Rareza={selected.Rareza} onClose={closeModal} onDelete={() => onDelete(selected.Numero)} />}

  <header className="w-full py-8 text-center">
    <h1 className="text-4xl font-extrabold">Rebelde Way</h1>
    <p className="text-sm text-gray-300 mt-2">Crea y explora tus cartas desde aquí</p>
  </header>

  <div className="flex justify-center mb-8 gap-4">
        <Link
          to="/crearCarta"
          className="group relative inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 overflow-hidden"
        >
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          <span className="relative flex items-center gap-2">Crear Nueva Carta</span>
        </Link>

        <Link
          to="/seleccionar-carta"
          className="group relative inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-amber-400 to-orange-500 text-slate-950 font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-300 overflow-hidden"
        >
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          <span className="relative flex items-center gap-2">Batalla</span>
        </Link>
      </div>


    {/* Cards grid */}
    <div className="flex flex-wrap justify-center gap-8 mt-6">
      {filteredCards.map((carta) => (
        <div 
          key={carta.Numero} 
          className="transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer"

        >
          <CardDetail
            Nombre={carta.Nombre}
            Ataque={carta.Ataque}
            Defensa={carta.Defensa}
            Descripcion={carta.Descripcion}
            Imagen={carta.Imagen!}
            Tipo={carta.Tipo}
            Debilidad={carta.Debilidad}
            vida={carta.vida}
            onOpen={() => openCard(carta)}
          />
        </div>
      ))}
    </div>
    
    </>
)};

export default Lista