import { useState } from "react";
import CardDetail from "../components/cartaProyecto";
import { Link } from "react-router";
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
{selected&& <Modal Numero={selected.Numero} Nombre={selected.Nombre} Tipo={selected.Tipo} Ataque={selected.Ataque} Defensa={selected.Defensa} Descripcion={selected.Descripcion} Imagen={selected.Imagen} Debilidad={selected.Debilidad} Rareza={selected.Rareza} vida={selected.vida} onClose={closeModal} onDelete={() => onDelete(selected.Numero)} />}
 
      <div className="flex justify-center mb-8">
        <Link 
          to='/crearCarta' 
          className="group relative inline-flex items-center justify-center px-8 py-4 
           from-purple-600 to-blue-600 
            text-white font-bold text-lg rounded-xl
            shadow-lg hover:shadow-2xl 
            transform transition-all duration-300 
            hover:scale-105 hover:from-purple-700 hover:to-blue-700
            focus:outline-none focus:ring-4 focus:ring-purple-300
            overflow-hidden"
        >
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
            transition-opacity duration-300"></span>
          <span className="relative flex items-center gap-2">
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
            Crear Nueva Carta
          </span>
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