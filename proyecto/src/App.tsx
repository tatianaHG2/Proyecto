import { useState } from "react";
import "./App.css";
import CardDetail from "./components/cartaProyecto";
import Modal from "./components/Modal";
import CardForm from "./pages/formulario";
import SearchAndDelete from "./components/button"
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
import Lista from "./pages/lista";
import { Route , Routes} from "react-router-dom";

export type Card = {
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

// PETICION A LA API


//const fetchCards = async () => {
//  try {
//    const response = await fetch(url, {
//      method: 'GET',
//      headers: {
//        'Content-Type': 'application/json',
//        'usersecretpasskey': 'Tati669906NA'
//      }
//    });
//
//    if (!response.ok) {
//      throw new Error(`Error HTTP: ${response.status}`);
//    }
//
//    const result = await response.json();
//
//    // Accedemos a "data" que es donde está el array de cartas
//    
//    return (result.data)
//
//    // También imprimimos la info de paginación
//    console.log(`Total de cartas: ${result.total} | Página: ${result.page}`);
//
//  } catch (error) {
//    console.error('Error al obtener los datos:', error);
//  }
//};


// CREAR CARTA

//const createCard = async () => {
//  const nuevaCarta = {
//  name: "Pablo",
//    description: "Corrupcion",
//    attack: 2000,
//    defense: 1500,
//    lifePoints: 2500,
//    pictureUrl: "https://example.com/image.jpg",
//    attributes: { tipo: "Mago" }
//  };
//
//  try {
//    const response = await fetch(url, {
//      method: 'POST', // Cambiamos el método
//      headers: {
//        'Content-Type': 'application/json', // Indispensable para enviar JSON
//        'usersecretpasskey': 'Tati669906NA'
//      },
//      body: JSON.stringify(nuevaCarta) // Convertimos el objeto a texto JSON
//    });
//
//    const result = await response.json();
//
//    if (response.ok) {
//      console.log('✅ Carta creada con éxito:');
//      console.log(result);
//    } else {
//      console.error('❌ Error al crear la carta:', result);
//    }
//
//  } catch (error) {
//    console.error('Error de red o conexión:', error);
//  }
//};




// Cear una funcion que use useEffect para remplazar lo que esta abajo por una peticion a la api con todas las catas y que se creen con la funcion creada para mostrarlas en el html


const defaultCards: Card[] = [
  
  
];

function App() {
  const [cards, setCards] = useState<Card[]>(defaultCards);


  const handleFormSubmit = (newCardData: NewCard) => {
    const newCard: Card = { Numero: Date.now(), ...newCardData } as Card;
    setCards([...cards, newCard]);
  };
 

  return (
        
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-red-900 to-black text-white font-['Inter'] relative overflow-x-hidden">

     <Routes>
      <Route path='/inicio' element={<Lista cards={cards} setCards={setCards}/>}/>
      <Route path='/crearCarta' element={<CardForm onSubmit={handleFormSubmit}/>}/>
    

    </Routes>
    </div>
  );
}

export default App;
