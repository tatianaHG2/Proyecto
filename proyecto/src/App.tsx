import { useEffect, useState } from "react";
import "./App.css";
import CardForm from "./pages/formulario"; 
import Lista from "./pages/lista";
import { Route , Routes} from "react-router-dom";
import type { ApiCard, Card } from "./util/interface";
import { fromApiCard, toApiCardCreate, toApiCard } from "./util/mapper";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [iscreating, setIsCreating] = useState(false);

  const fetchCards = async () => {
    try {
      const response = await fetch(`${API_URL}/card`, {
        headers: { usersecretpasskey: 'Tati669906NA' }
      });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const result = await response.json() as {data: ApiCard[]};
      setCards(result.data.map((card) => fromApiCard(card)));
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => { fetchCards(); }, []);

  const createCard = async (newCardData: Card) => {
    setIsCreating(true);
    try {
      const response = await fetch(`${API_URL}/card`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', usersecretpasskey: 'Tati669906NA' },
        body: JSON.stringify(toApiCardCreate(newCardData)) 
      });
      if (response.ok) await fetchCards();
    } finally { setIsCreating(false); }
  };

  const updateCard = async (cardData: Card, id?: number) => {
    if (!id) return;
    setIsCreating(true);
    try {
      const response = await fetch(`${API_URL}/card/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', usersecretpasskey: 'Tati669906NA' },
        body: JSON.stringify(toApiCard(cardData))
      });
      if (response.ok) await fetchCards();
    } finally { setIsCreating(false); }
  };

  //ELIMInar
  const deleteCard = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/card/${id}`, {
      method: 'DELETE',
      headers: { 
        'usersecretpasskey': 'Tati669906NA' // Tu clave
      }
    });

    if (response.ok) {
      // Esto borra la carta de la pantalla inmediatamente sin recargar
      setCards(prevCards => prevCards.filter(card => card.Numero !== id));
      console.log(`Carta ${id} eliminada con éxito`);
    } else {
      alert("No se pudo eliminar la carta de la base de datos.");
    }
  } catch (error) {
    console.error("Error en la petición DELETE:", error);
  }
};

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-400 via-red-900 to-black text-white font-['Inter'] relative overflow-x-hidden">
      <Routes>
        <Route path='/' element={<Lista cards={cards} onDelete={deleteCard}/>}/>
        <Route path='/crearCarta' element={<CardForm onSubmit={createCard} iscreating={iscreating} isEditing={false}/>}/>
        <Route path='/actualizar/:id' element={<CardForm onSubmit={updateCard} iscreating={iscreating} isEditing={true}/>}/>
      </Routes>
    </div>
  );
}

export default App;