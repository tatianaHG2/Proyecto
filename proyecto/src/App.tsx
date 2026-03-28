import { useEffect, useState } from "react";
import "./App.css";
import CardForm from "./pages/formulario"; 
import Lista from "./pages/lista";
import { Route , Routes} from "react-router-dom";
import type { ApiCard, Card } from "./util/interface";
import { fromApiCard, toApiCard, toApiCardCreate } from "./util/mapper";


type NewCard = Omit<Card, "Numero">;
const API_URL = import.meta.env.VITE_API_URL
const defaultCards: Card[] = [
  
  
];

function App() {
  const [cards, setCards] = useState<Card[]>(defaultCards);
  const [iscreating,setIsCreating] = useState(false)

 

const fetchCards = async () => {
  try {
    console.log('fetchig cartas from backend')
    console.log(API_URL)
    const response = await fetch(`${API_URL}/card`,{headers: {
        usersecretpasskey: 'Tati669906NA'
      }});

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json() as {data :ApiCard[]}
    console.log("ressult",result)
    setCards(result.data.map((card)=>fromApiCard(card)))



  } catch (error) {
    console.error('Error al obtener los datos:', error);
}
};

 useEffect(()=>{
    fetchCards()

  },[])


// CREAR CARTA

const createCard = async (newCardData: Card) => {
console.log(API_URL)
setIsCreating(true)
 try {
    const response = await fetch(`${API_URL}/card`, {
  method: 'POST', headers: {
        usersecretpasskey: 'Tati669906NA'
      },
      body: JSON.stringify(toApiCardCreate(newCardData)) 
  });

    const result = await response.json();
    if (response.ok) {
      console.log('✅ Carta creada con éxito:');
      console.log(result);
   } else {
     console.error('❌ Error al crear la carta:', result);
    }

  } catch (error) {
    console.error('Error de red o conexión:', error);
  }finally{
    setIsCreating(false)
  }
};




const deleteCard = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/card/${id}`, {
        method: "DELETE",
        headers: { usersecretpasskey: "" },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la carta");
      }

      await fetchCards(); 
      return { success: true };
    } catch (e) {
      console.error("Error deleting carta:", e);
      return { success: false, error: e };


    }
  };
 

  return (
        

        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-red-900 to-black text-white font-['Inter'] relative overflow-x-hidden">


     <Routes>
      <Route path='/' element={<Lista cards={cards} setCards={setCards}/>}/>
      <Route path='/crearCarta' element={<CardForm onSubmit={createCard}  iscreating={iscreating}/>}/>
      <Route path='/actualizar:id' element={<CardForm onSubmit={createCard}  iscreating={iscreating}/>}/>
    

    </Routes>
    </div>
  );
}

export default App;