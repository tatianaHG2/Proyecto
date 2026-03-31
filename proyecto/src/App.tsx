import { useEffect, useState } from "react";
import "./App.css";
import CardForm from "./pages/formulario"; 
import Lista from "./pages/lista";
import { Route , Routes} from "react-router-dom";
import type { ApiCard, Card } from "./util/interface";
import { fromApiCard, toApiCardCreate, toApiUpdateCartaMap } from "./util/mapper";
import { updateCard as apiUpdateCard } from './components/api.ts';

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
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      const responseText = await response.text();
      console.log('Response body:', responseText);
      if (response.ok) {
        // Agregar la carta localmente con imagen
        const newId = Math.max(...cards.map(c => c.Numero), 0) + 1;
        const newCard: Card = { ...newCardData, Numero: newId };
        setCards(prev => [...prev, newCard]);
      }
    } finally { setIsCreating(false); }
  };

  const updateCard = async (cardData: Card, id?: number) => {
    if (!id) return;
    setIsCreating(true);
    // Actualizar localmente primero
    setCards(prev => prev.map(c => c.Numero === id ? cardData : c));
    try {
      const response = await apiUpdateCard(id, toApiUpdateCartaMap(cardData));
      console.log('Update Response status:', response.status);
      console.log('Update Response ok:', response.ok);
      const responseText = await response.text();
      console.log('Update Response body:', responseText);
      // Si la API funciona, refrescar para sincronizar
      await fetchCards();
    } catch (error) {
      console.log('Update error:', error);
      // Si falla, la actualización local queda
    } finally { setIsCreating(false); }
  };

  //ELIMInar
  const deleteCard = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/card/${id}`, {
      method: 'DELETE',
      headers: { 
        'usersecretpasskey': 'Tati669906NA' 
      }
    });

    if (response.ok) {
   
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