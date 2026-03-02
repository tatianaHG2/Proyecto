import { useState } from "react";
import "./App.css";
import CardDetail from "./components/cartaProyecto";
import Modal from "./components/Modal";
import CardForm from "./components/formulario";
import SearchAndDelete from "./components/button";
import MiaImg from "./assets/Mia.jpeg";
import PabloImg from "./assets/Pablo.jpeg";
import ManuelImg from "./assets/Manuel.jpeg";
import MarizzaImg from "./assets/Marizza.jpeg";
import MarcosImg from "./assets/marcos.jpg";
import VicoImg from "./assets/vico.jpg";
import FelicitasImg from "./assets/felicitas.jpeg";
import SergioImg from "./assets/sergioB.jpg";
import BlasImg from "./assets/blas.webp";
import LujanImg from "./assets/lujan.jpg";
import SoniaImg from "./assets/sonia.jpg";
import FrancoImg from "./assets/franco.jpg";

type Card = {
  Numero: number;
  Nombre: string;
  Tipo: string;
  Ataque: number;
  Defensa: number;
  Descripcion: string;
  Debilidad?: string;
  Rareza?: string;
  Imagen?: string;
};

type NewCard = Omit<Card, "Numero">;

const defaultCards: Card[] = [
  {
    Ataque: 100,
    Nombre: "Mia Colucci",
    Defensa: 60,
    Descripcion: "Mia Colucci es la líder carismática del grupo Rebelde Way, una cantante talentosa que lucha por sus ideales y enfrenta conflictos amorosos y familiares en el Elite Way School.",
    Imagen: MiaImg,
    Tipo: "Líder Rebelde",
    Debilidad: "Celosa",
    Rareza: "Mítica",
    Numero: 1
  },

  {
    Ataque: 90,
    Nombre: "Marizza Pia Spirito",
    Defensa: 80,
    Descripcion: "Marizza Pia Spirito es una activista punk apasionada por la justicia social, forma parte de la banda Rebelde Way y desafía las normas establecidas en la escuela.",
    Imagen: MarizzaImg,
    Tipo: "Lider social",
    Debilidad: "Impulsiva",
    Rareza: "Mitica",
    Numero: 2
  },
  {
    Ataque: 70,
    Nombre: "Pablo Bustamante",
    Defensa: 90,
    Descripcion: "Pablo Bustamante es un joven de la oposición política que lucha contra el corrupto gobierno de su padre Sergio, perteneciente al partido opuesto, logrando mandarlo preso por lavado de dinero en el Elite Way School.",
    Imagen: PabloImg,
    Tipo: "Opositor Político",
    Debilidad: "Inseguro",
    Rareza: "Mítica",
    Numero: 3
  },
  {
    Ataque: 120,
    Nombre: "Manuel Aguirre",
    Defensa: 60,
    Descripcion: "Manuel Aguirre, un estudiante becado inteligente y estratega, planea vengarse de aquellos que lo han humillado, mostrando su lado oscuro en el Elite Way School.",
    Imagen: ManuelImg,
    Tipo: "Becado Vengativo",
    Debilidad: "Obsesivo",
    Rareza: "Mítica",
    Numero: 4
  },
  {
    Ataque: 88,
    Nombre: "Marcos Aguilar",
    Defensa: 72,
    Descripcion: "Marcos Aguilar es un talentoso guitarrista y compositor del grupo, conocido por su creatividad y lealtad al equipo.",
    Imagen: MarcosImg,
    Tipo: "Guitarrista Creativo",
    Debilidad: "Introvertido",
    Rareza: "Épica",
    Numero: 5
  },
  {
    Ataque: 85,
    Nombre: "Victoria Paz",
    Defensa: 75,
    Descripcion: "Victoria Paz, conocida como Vico, es una rapera arrogante y talentosa que compite con Mia por el liderazgo del grupo Rebelde Way en la escuela.",
    Imagen: VicoImg,
    Tipo: "Rapera Arrogante",
    Debilidad: "Arrogante",
    Rareza: "Épica",
    Numero: 6
  },
  {
    Ataque: 95,
    Nombre: "Felicitas Mitre",
    Defensa: 85,
    Descripcion: "Felicitas es sensible y perfeccionista, que expresa sus emociones a través de sus obras y enfrenta inseguridades en el Elite Way School.",
    Imagen: FelicitasImg,
    Tipo: "Apoyo emocional",
    Debilidad: "Insegura",
    Rareza: "Legendaria",
    Numero: 7
  },
  {
    Ataque: 75,
    Nombre: "Lujan Linares",
    Defensa: 85,
    Descripcion: "Lujan es una amiga fiel y divertida, conocido por su personalidad extrovertida y su apoyo incondicional a sus amigos en Rebelde Way.",
    Imagen: LujanImg,
    Tipo: "Amiga Leal",
    Debilidad: "Demasiado Confiada",
    Rareza: "Épica",
    Numero: 8
  },
  {
    Ataque: 110,
    Nombre: "Blas Heredia",
    Defensa: 60,
    Descripcion: "Blas es un matón agresivo que intimida a los estudiantes más débiles, buscando imponer su autoridad en la escuela.",
    Imagen: BlasImg,
    Tipo: "Matón Escolar",
    Debilidad: "Violento",
    Rareza: "Común",
    Numero: 9
  },
  {
    Ataque: 80,
    Nombre: "Sergio Bustamante",
    Defensa: 70,
    Descripcion: "Sergio Bustamante es padre de Pablo, un joven arrogante y heredero de una fortuna, que usa su posición para manipular a los demás en el Elite Way School.",
    Imagen: SergioImg,
    Tipo: "Politico corrupto",
    Debilidad: "Arrogante",
    Rareza: "Épica",
    Numero: 10
  },
  {
    Ataque: 85,
    Nombre: "Sonia Rey",
    Defensa: 90,
    Descripcion: "Madre de Marizza, vedette extravagante y dedicada, figura maternal para Mia.",
    Imagen: SoniaImg,
    Tipo: "Vedette Extravagante",
    Debilidad: "Exagerada",
    Rareza: "Legendaria",
    Numero: 11
  },
  {
    Ataque: 95,
    Nombre: "Franco Colucci",
    Defensa: 85,
    Descripcion: "Empresario de moda millonario y padre sobreprotector de Mia, con perfil autoritario y pasado complejo.",
    Imagen: FrancoImg,
    Tipo: "Empresario de Moda",
    Debilidad: "Sobreprotector",
    Rareza: "Legendaria",
    Numero: 12
  }
];

function App() {
  const [selected, setSelected] = useState<Card | null>(null);
  const [cards, setCards] = useState<Card[]>(defaultCards);
  const [searchTerm, setSearchTerm] = useState("");

  const openCard = (card: Card) => setSelected(card);
  const closeModal = () => setSelected(null);

  const handleFormSubmit = (newCardData: NewCard) => {
    const newCard: Card = { Numero: Date.now(), ...newCardData } as Card;
    setCards([...cards, newCard]);
  };

  const handleDeleteFiltered = () => {
        setCards(cards.filter(card => 
      !card.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    ));
    
    if (selected && selected.Nombre.toLowerCase().includes(searchTerm.toLowerCase())) {
      closeModal();
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredCards = cards.filter(card =>
    card.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black p-8 relative overflow-x-hidden">
      <div className="fixed top-20 right-0 text-9xl font-black text-red-900/10 rotate-12 select-none pointer-events-none z-0">
        REBELDE
      </div>
      <div className="fixed bottom-20 left-0 text-9xl font-black text-red-900/10 -rotate-12 select-none pointer-events-none z-0">
        WAY
      </div>
      
      <div className="fixed inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(139,0,0,0.03)_10px,rgba(139,0,0,0.03)_20px)] pointer-events-none z-0"></div>

      <div className="relative z-10">
        <h1 className="font-['Black_Ops_One',cursive] text-6xl md:text-7xl text-center mb-8
          bg-gradient-to-r from-white via-red-400 to-white bg-clip-text text-transparent
          drop-shadow-[0_0_10px_rgba(139,0,0,0.5)] 
          [text-shadow:2px_2px_0_#8b0000,-2px_-2px_0_#000]
          animate-[flicker_3s_ease-in-out_infinite]">
          REBELDE WAY
        </h1>

        <CardForm onSubmit={handleFormSubmit} />
        
        <SearchAndDelete 
          onSearch={handleSearch}
          onDeleteAll={handleDeleteFiltered}
          cardsCount={cards.length}
          filteredCount={filteredCards.length}
          searchTerm={searchTerm}
        />

        <div className="flex flex-wrap justify-center gap-8 mt-6">
          {filteredCards.map((carta) => (
            <div 
              key={carta.Numero} 
              className="transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer"
              onClick={() => openCard(carta)}
            >
              <CardDetail
                Nombre={carta.Nombre}
                Ataque={carta.Ataque}
                Defensa={carta.Defensa}
                Descripcion={carta.Descripcion}
                Imagen={carta.Imagen!}
                Tipo={carta.Tipo}
                Debilidad={carta.Debilidad}
                onOpen={() => openCard(carta)}
              />
            </div>
          ))}
        </div>

        {selected && (
          <Modal
            Ataque={selected.Ataque}
            Descripcion={selected.Descripcion}
            Defensa={selected.Defensa}
            Nombre={selected.Nombre}
            Numero={selected.Numero}
            Tipo={selected.Tipo}
            Debilidad={selected.Debilidad}
            Rareza={selected.Rareza}
            Imagen={selected.Imagen}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}

export default App;