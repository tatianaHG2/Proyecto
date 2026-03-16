import { useState, useEffect } from "react"; // 1. Importamos useEffect
import "./App.css";
import CardForm from "./pages/formulario";
import Lista from "./pages/lista";
import { Route, Routes } from "react-router-dom";

// Definición de tipos
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


const API_URL = "https://educapi-v2.onrender.com";
const API_KEY = "Tati669906NA";

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga opcional

  // 2. Función para obtener las cartas de la API
  const fetchCards = async () => {
    try {
      const response = await fetch(API_URL+"/card", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          usersecretpasskey: API_KEY,
        },
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const result = await response.json();

      // 3. Mapeo de datos: Convertimos lo que viene de la API a nuestro formato de "Card"
      // Asumimos que la API devuelve campos como 'name', 'attack', etc.
      const mappedCards: Card[] = result.data.map((item: any) => ({
        Numero: item.id || Date.now(), // Usamos el ID de la DB no se como es esto capaz ya la db le da el numero automaticamente
        Nombre: item.name,
        Tipo: item.attributes?.tipo || "Desconocido",
        Ataque: item.attack,
        Defensa: item.defense,
        Descripcion: item.description,
        Imagen: item.pictureUrl,
        // Agrega aquí los campos restantes si la API los necesita
      }));

      setCards(mappedCards);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setLoading(false);
    }
  };

  // 4. useEffect para cargar los datos al iniciar
  // esto es lo que te dije que tenias que poner tati
  useEffect(() => {
    fetchCards();
  }, []);

  // Función para manejar el envío del formulario (POST)
  const handleFormSubmit = async (newCardData: NewCard) => {
    // Aquí podrías hacer el POST a la API para guardar en DB
    // Por ahora, lo agregamos localmente para feedback inmediato
    const newCard: Card = { Numero: Date.now(), ...newCardData };
    setCards([...cards, newCard]);

    // Opcional: Llamar a la función de crear en la API aquí
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-red-900 to-black text-white font-['Inter'] relative overflow-x-hidden">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          Cargando cartas...
        </div>
      ) : (
        <Routes>
          <Route
            path="/inicio"
            element={<Lista cards={cards} setCards={setCards} />}
          />
          <Route
            path="/crearCarta"
            element={<CardForm onSubmit={handleFormSubmit} />}
          />
          {/* Redirección por defecto opcional */}
          <Route
            path="/"
            element={<Lista cards={cards} setCards={setCards} />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
