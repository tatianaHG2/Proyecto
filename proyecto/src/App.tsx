import { useState } from "react";
import "./App.css";
import CardDetail from "./components/cartaProyecto";
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
import Modal from "./components/Modal";

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


const defaultCards:Card[] = [{
      Ataque:100,
        Nombre:"Mia Colucci",
        Defensa: 60,
        Descripcion:"Mia Colucci es la líder carismática del grupo Rebelde Way, una cantante talentosa que lucha por sus ideales y enfrenta conflictos amorosos y familiares en el Elite Way School.",
        Imagen:MiaImg,
        Tipo:"Líder Rebelde",
        Debilidad:"Celosa",
        Rareza:"Mítica",
        Numero:1
      },
      {
        Ataque:90,
        Nombre:"Marizza Pia Spirito",
        Defensa :80,
        Descripcion:"Marizza Pia Spirito es una activista punk apasionada por la justicia social, forma parte de la banda Rebelde Way y desafía las normas establecidas en la escuela.",
        Imagen:MarizzaImg,
        Tipo:"Lider social",
        Debilidad:"Impulsiva",
        Rareza:"Legendaria",
        Numero:2

      },
      {
            Ataque:70,
        Nombre:"Pablo Bustamante",
        Defensa:90,
        Descripcion:"Pablo Bustamante es un joven de la oposición política que lucha contra el corrupto gobierno de su padre Sergio, perteneciente al partido opuesto, logrando mandarlo preso por lavado de dinero en el Elite Way School.",
        Imagen:PabloImg,
        Tipo:"Opositor Político",
        Debilidad:"Inseguro",
        Rareza:"Mítica",
        Numero:3
      },
      {
              Ataque:120,
        Nombre:"Manuel Aguirre",
        Defensa:60,
        Descripcion:"Manuel Aguirre, un estudiante becado inteligente y estratega, planea vengarse de aquellos que lo han humillado, mostrando su lado oscuro en el Elite Way School.",
        Imagen:ManuelImg,
        Tipo:"Becado Vengativo",
        Debilidad:"Obsesivo",
        Rareza:"Mítica",
        Numero:4
      },
 {
          Ataque:88,
        Nombre:"Marcos Aguilar",
        Defensa:72,
        Descripcion:"Marcos Aguilar es un talentoso guitarrista y compositor del grupo, conocido por su creatividad y lealtad al equipo.",
        Imagen:MarcosImg,
        Tipo:"Guitarrista Creativo",
        Debilidad:"Introvertido",
        Rareza:"Épica",
        Numero:5
 },
 {
         Ataque:85,
        Nombre:"Victoria Paz",
        Defensa:75,
        Descripcion:"Victoria Paz, conocida como Vico C, es una rapera arrogante y talentosa que compite con Mia por el liderazgo del grupo Rebelde Way en la escuela.",
        Imagen:VicoImg,
        Tipo:"Rapera Arrogante",
        Debilidad:"Arrogante",
        Rareza:"Épica",
        Numero:6
 },
 {
         Ataque:95,
        Nombre:"Felicitas Mitre",
        Defensa:85,
        Descripcion:"Felicitas es sensible y perfeccionista, que expresa sus emociones a través de sus obras y enfrenta inseguridades en el Elite Way School.",
        Imagen:FelicitasImg,
        Tipo:"Apoyo emocional",
        Debilidad:"Insegura",
        Rareza:"Legendaria",
        Numero:7
 },
{
      Ataque:75,
        Nombre:"Lujan Linares",
        Defensa:85,
        Descripcion:"Lujan es una amiga fiel y divertida, conocido por su personalidad extrovertida y su apoyo incondicional a sus amigos en Rebelde Way.",
        Imagen:LujanImg,
        Tipo:"Amiga Leal",
        Debilidad:"Demasiado Confiada",
        Rareza:"Épica",
        Numero:8
},
{
        Ataque:110,
        Nombre:"Blas Heredia",
        Defensa:60,
        Descripcion:"Blas es un matón agresivo que intimida a los estudiantes más débiles, buscando imponer su autoridad en la escuela.",
        Imagen:BlasImg,
        Tipo:"Matón Escolar",
        Debilidad:"Violento",
        Rareza:"Común",
        Numero:9
},
{
      Ataque:80,
        Nombre:"Sergio Bustamante",
        Defensa:70,
        Descripcion:"Sergio Bustamante es padre de Pablo, un joven arrogante y heredero de una fortuna, que usa su posición para manipular a los demás en el Elite Way School.",
        Imagen:SergioImg,
        Tipo:"Politico corrupto",
        Debilidad:"Arrogante",
        Rareza:"Épica",
        Numero:10
      },
      {
            Ataque:85,
        Nombre:"Sonia Rey",
        Defensa:90,
        Descripcion:"Madre de Marizza, vedette extravagante y dedicada, figura maternal para Mia.",
        Imagen:SoniaImg,
        Tipo:"Vedette Extravagante",
        Debilidad:"Exagerada",
        Rareza:"Legendaria",
        Numero:11
      },
      {
                Ataque:95,
        Nombre:"Franco Colucci",
        Defensa:85,
        Descripcion:"Empresario de moda millonario y padre sobreprotector de Mia, con perfil autoritario y pasado complejo.",
        Imagen:FrancoImg,
        Tipo:"Empresario de Moda",
        Debilidad:"Sobreprotector",
        Rareza:"Legendaria",
        Numero:12
      }
]

function App() {
  const [selected, setSelected] = useState<Card | null>(null);
  const [cards,setCards] = useState<Card[]>(defaultCards)
  type NewCard = Omit<Card, "Numero">;
  console.log(cards)

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

  const numeros = [1,2,3,4,5,]

  const numnerosPorDos =  numeros.map((numero)=>{return {
    valor:numero
  }})

  console.log("lista 2",numnerosPorDos)
  
  const openCard = (card: Card) => setSelected(card);
  const closeModal = () => setSelected(null);

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
    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = <K extends keyof NewCard>(field: K, value: NewCard[K]) => {
    setCard((prev) => ({ ...prev, [field]: value }));
    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateAll(card);
    const hasErrors = Object.values(validation).some((v) => v && v.length > 0);
    if (hasErrors) return;
    const newCard: Card = { Numero: Date.now(), ...card } as Card;
    //openCard(newCard);
    setCards([...cards,newCard]);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-700 to-blue-900 p-8">
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Rebelde Way
      </h1>
      <form onSubmit={handleSubmit} className="w-[90%] max-w-lg mx-auto my-6 p-4 bg-white text-black border border-black rounded-md">
        <h2 className="text-black text-xl mb-3">Crear carta</h2>

        <div className="flex flex-col gap-3">
          <label className="text-black">Nombre</label>
          <input value={card.Nombre} onChange={(e) => handleChange("Nombre", e.target.value)} placeholder="Ej. Mia Colucci" className="w-full p-2 border border-black bg-white text-black" />
          {errors.Nombre && <span className="text-black text-sm">{errors.Nombre}</span>}

          <label className="text-black">Tipo</label>
          <input value={card.Tipo} onChange={(e) => handleChange("Tipo", e.target.value)} placeholder="Ej. Líder Rebelde" className="w-full p-2 border border-black bg-white text-black" />
          {errors.Tipo && <span className="text-black text-sm">{errors.Tipo}</span>}

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-black">Ataque</label>
              <input type="number" min={0} value={card.Ataque} onChange={(e) => handleChange("Ataque", Number(e.target.value))} className="w-full p-2 border border-black bg-white text-black" />
              {errors.Ataque && <span className="text-black text-sm">{errors.Ataque}</span>}
            </div>
            <div className="flex-1">
              <label className="text-black">Defensa</label>
              <input type="number" min={0} value={card.Defensa} onChange={(e) => handleChange("Defensa", Number(e.target.value))} className="w-full p-2 border border-black bg-white text-black" />
              {errors.Defensa && <span className="text-black text-sm">{errors.Defensa}</span>}
            </div>
          </div>

          <label className="text-black">Descripción</label>
          <textarea value={card.Descripcion} onChange={(e) => handleChange("Descripcion", e.target.value)} placeholder="Descripción (mínimo 10 caracteres)" className="w-full p-2 border border-black bg-white text-black resize-none" />
          {errors.Descripcion && <span className="text-black text-sm">{errors.Descripcion}</span>}

          <label className="text-black">Debilidad</label>
          <input value={card.Debilidad} onChange={(e) => handleChange("Debilidad", e.target.value)} className="w-full p-2 border border-black bg-white text-black" />

          <label className="text-black">Rareza</label>
          <input value={card.Rareza} onChange={(e) => handleChange("Rareza", e.target.value)} className="w-full p-2 border border-black bg-white text-black" />

          <label className="text-black">Imagen (URL)</label>
          <input value={card.Imagen} onChange={(e) => handleChange("Imagen", e.target.value)} className="w-full p-2 border border-black bg-white text-black" />

          <button type="submit" className="mt-3 bg-black text-white p-2 rounded border border-black" disabled={Object.values(errors).some((v) => v && v.length > 0)}>
            Crear carta
          </button>
        </div>
      </form>

      <div className="w-[90%] max-w-md mx-auto my-4 p-4 bg-white text-black border border-black rounded-md">
        <h3 className="text-lg font-semibold mb-2 text-black">Vista previa</h3>
        <div className="rounded-md overflow-hidden bg-white">
          {card.Imagen ? (
            <img src={card.Imagen} alt={card.Nombre || 'Imagen carta'} className="w-full h-40 object-cover" />
          ) : (
            <div className="w-full h-40 flex items-center justify-center bg-gray-200 text-black">Sin imagen</div>
          )}

          <div className="p-3">
            <h4 className="font-semibold text-black">{card.Nombre || 'Nombre'}</h4>
            <p className="text-sm text-black">{card.Tipo || 'Tipo'}</p>
            <p className="mt-2 text-sm text-black">{card.Descripcion || 'Descripción breve...'}</p>

            <div className="mt-2 text-sm text-black">
              <p><strong>Debilidad:</strong> {card.Debilidad || '-'}</p>
              <p><strong>Rareza:</strong> {card.Rareza || '-'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
          {
            cards.map((carta)=>{return <CardDetail
              Nombre={carta.Nombre}
              Ataque={carta.Ataque}
              Defensa={carta.Defensa}
              Descripcion={carta.Descripcion}
              Imagen={carta.Imagen!}
              Tipo={carta.Tipo}
              Debilidad={carta.Debilidad}
              onOpen={()=>openCard(carta)}              
            />})
          }
 
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
  );
}

export default App;
