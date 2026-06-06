import { useEffect, useState } from "react";
import "./App.css";
import CardForm from "./pages/formulario"; 
import Lista from "./pages/lista";
import SeleccionarCartas from "./pages/Batalla/SeleccionarCartas"
import CampoDeBatalla from "./pages/Batalla/CampoDeBatalla";
import { Route, Routes } from "react-router-dom";
import type { ApiCard, Card } from "./util/interface";
import { fromApiCard, toApiCardCreate, toApiUpdateCartaMap } from "./util/mapper";
import { createCard as apiCreateCard, updateCard as apiUpdateCard } from './components/api.ts';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [iscreating, setIsCreating] = useState(false);
  const STORAGE_KEY = 'rebelde_way_cards';
  const DELETED_KEY = 'rebelde_way_deleted_ids';

  const getDeletedIds = (): number[] => {
    try {
      const raw = localStorage.getItem(DELETED_KEY);
      return raw ? (JSON.parse(raw) as number[]) : [];
    } catch (err) {
      console.warn('Error leyendo deleted ids:', err);
      return [];
    }
  };

  const saveDeletedIds = (ids: number[]) => {
    try {
      localStorage.setItem(DELETED_KEY, JSON.stringify(ids));
    } catch (err) {
      console.warn('Error guardando deleted ids:', err);
    }
  };

  const addDeletedId = (id: number) => {
    const ids = new Set(getDeletedIds());
    ids.add(id);
    saveDeletedIds(Array.from(ids));
  };

  const removeDeletedId = (id: number) => {
    const ids = new Set(getDeletedIds());
    ids.delete(id);
    saveDeletedIds(Array.from(ids));
  };

  const saveCardsToLocalStorage = (cardsToSave: Card[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cardsToSave));
    } catch (error) {
      console.warn('No se pudo guardar en localStorage:', error);
    }
  };

  const loadCardsFromLocalStorage = (): Card[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const list = stored ? (JSON.parse(stored) as Card[]) : [];
      const deleted = new Set(getDeletedIds());
      return list.filter((c) => !deleted.has(c.Numero));
    } catch (error) {
      console.warn('No se pudo leer localStorage:', error);
      return [];
    }
  };

  const fetchCards = async () => {
    try {
      const response = await fetch(`${API_URL}/card`, {
        headers: { usersecretpasskey: 'Tati669906NA' }
      });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const result = await response.json() as {data: ApiCard[]};
      const serverCards = result.data.map((card) => fromApiCard(card));
      const deleted = new Set(getDeletedIds());
      // Filtrar cartas marcadas como eliminadas
      const serverFiltered = serverCards.filter((c) => !deleted.has(c.Numero));

      // Cargar cartas locales y mantener aquellas que no estén en el servidor
      const localCards = loadCardsFromLocalStorage();
      const localOnly = localCards.filter((lc) => !serverFiltered.some((sc) => sc.Numero === lc.Numero) && !deleted.has(lc.Numero));

      // Fusionar servidor + locales (locales se añaden al final)
      const merged = [...serverFiltered, ...localOnly];

      setCards(merged);
      saveCardsToLocalStorage(merged);
    } catch (error) {
      console.warn('Error al obtener los datos del servidor, cargando cartas locales:', error);
      const localCards = loadCardsFromLocalStorage();
      setCards(localCards);
    }
  };

  useEffect(() => { fetchCards(); }, []);

  const createCard = async (newCardData: Card) => {
    setIsCreating(true);
    const newId = Math.max(...cards.map((c) => c.Numero), 0) + 1;
    const newCard: Card = { ...newCardData, Numero: newId, idCard: newId };

    try {
      await apiCreateCard(toApiCardCreate(newCardData) as any);
      // If the new ID was previously deleted, remove it from deleted list
      removeDeletedId(newCard.Numero);
      const nextCards = [...cards, newCard];
      setCards(nextCards);
      saveCardsToLocalStorage(nextCards);
    } catch (error) {
      console.warn('No se pudo crear la carta en la API, guardando localmente:', error);
      removeDeletedId(newCard.Numero);
      const nextCards = [...cards, newCard];
      setCards(nextCards);
      saveCardsToLocalStorage(nextCards);
    } finally {
      setIsCreating(false);
    }
  };

  const updateCard = async (cardData: Card, id?: number) => {
    if (!id) return;
    setIsCreating(true);
    setCards((prev) => {
      const next = prev.map((c) => (c.Numero === id ? cardData : c));
      saveCardsToLocalStorage(next);
      return next;
    });
    try {
      await apiUpdateCard(id, toApiUpdateCartaMap(cardData));
      await fetchCards();
    } catch (error) {
      console.log('Update error:', error);
    } finally {
      setIsCreating(false);
    }
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
        setCards((prevCards) => {
          const next = prevCards.filter((card) => card.Numero !== id);
          saveCardsToLocalStorage(next);
          // ensure deletion persists
          addDeletedId(id);
          return next;
        });
        console.log(`Carta ${id} eliminada con éxito`);
      } else {
        
        addDeletedId(id);
        setCards((prevCards) => {
          const next = prevCards.filter((card) => card.Numero !== id);
          saveCardsToLocalStorage(next);
          return next;
        });
      }
    } catch (error) {
      console.error("Error en la petición DELETE:", error);
      // En caso de error de red, persiste la eliminación localmente
      addDeletedId(id);
      setCards((prevCards) => {
        const next = prevCards.filter((card) => card.Numero !== id);
        saveCardsToLocalStorage(next);
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-400 via-red-900 to-black text-white font-['Inter'] relative overflow-x-hidden">
      <Routes>
        <Route path='/' element={<Lista cards={cards} onDelete={deleteCard} />} />
        <Route path='/crearCarta' element={<CardForm onSubmit={createCard} iscreating={iscreating} isEditing={false} />} />
        <Route path='/actualizar/:id' element={<CardForm onSubmit={updateCard} iscreating={iscreating} isEditing={true} />} />
        <Route path='/campo-de-batalla/:id1/:id2' element={<CampoDeBatalla />} />
        <Route path='/seleccionar-carta' element={<SeleccionarCartas mazo={cards} loading={iscreating} />} />
      </Routes>
    </div>
  );
}

export default App;