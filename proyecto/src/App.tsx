import { useState } from "react";
import "./App.css";
import CardDetail from "./components/cartaProyecto";
import MiaImg from "./assets/Mia.jpeg";
import PabloImg from "./assets/WhatsApp Image 2026-01-05 at 8.57.44 PM.jpeg";
import ManuelImg from "./assets/WhatsApp Image 2026-01-05 at 8.57.44 PM (1).jpeg";
import MarizzaImg from "./assets/WhatsApp Image 2026-01-05 at 8.57.45 PM.jpeg";
import Modal from "./components/Modal";

type Card = {
  Numero: number;
  Nombre: string;
  Tipo: string;
  Ataque: number;
  Defensa: number;
  Descripcion: string;
  Debilidad?: string;
};

function App() {
  const [selected, setSelected] = useState<Card | null>(null);

  const openCard = (card: Card) => setSelected(card);
  const closeModal = () => setSelected(null);

  return (
    <div className="flex gap-x-4">
      <h1 className="font-serif text-xl font-bold italic text-red-600">
        Heroes
      </h1>

      <CardDetail
        Ataque={100}
        Nombre="Mia Colucci"
        Defensa={50}
        Descripcion="Manipula a sus enemigos con su mirada"
        Imagen={MiaImg}
        Numero={37}
        Tipo="Cantante de Rock"
        Debilidad="Dramatica"
        onOpen={() =>
          openCard({
            Numero: 37,
            Nombre: "Mia Colucci",
            Tipo: "Cantante de Rock",
            Ataque: 100,
            Defensa: 50,
            Descripcion: "Manipula a sus enemigos con su mirada",
            Debilidad: "Dramatica",
          })
        }
      />

      <CardDetail
        Ataque={90}
        Nombre="Marizza Pia Spirito"
        Defensa={80}
        Descripcion="Desafía la Autoridad y Consigue Aliados"
        Imagen={MarizzaImg}
        Numero={38}
        Tipo="Activista y Músico Underground"
        Debilidad="Impulsiva"
        onOpen={() =>
          openCard({
            Numero: 38,
            Nombre: "Marizza Pia Spirito",
            Tipo: "Activista y Músico Underground",
            Ataque: 90,
            Defensa: 80,
            Descripcion: "Desafía la Autoridad y Consigue Aliados",
            Debilidad: "Impulsiva",
          })
        }
      />

      <CardDetail
        Ataque={120}
        Nombre="Manuel Aguirre"
        Defensa={60}
        Descripcion="Planea su Venganza en Secreto"
        Imagen={ManuelImg}
        Numero={39}
        Tipo="Estratega y Becado"
        Debilidad="Sentimental"
        onOpen={() =>
          openCard({
            Numero: 39,
            Nombre: "Manuel Aguirre",
            Tipo: "Estratega y Becado",
            Ataque: 120,
            Defensa: 60,
            Descripcion: "Planea su Venganza en Secreto",
            Debilidad: "Sentimental",
          })
        }
      />

      <CardDetail
        Ataque={70}
        Nombre="Pablo Bustamante"
        Defensa={90}
        Descripcion="Controla el Entorno y las Relaciones"
        Imagen={PabloImg}
        Numero={12}
        Tipo="Político en Formación"
        Debilidad="Cobarde"
        onOpen={() =>
          openCard({
            Numero: 12,
            Nombre: "Pablo Bustamante",
            Tipo: "Político en Formación",
            Ataque: 70,
            Defensa: 90,
            Descripcion: "Controla el Entorno y las Relaciones",
            Debilidad: "Cobarde",
          })
        }
      />

      {selected && (
        <Modal
          Ataque={selected.Ataque}
          Descripcion={selected.Descripcion}
          Defensa={selected.Defensa}
          Nombre={selected.Nombre}
          Numero={selected.Numero}
          Tipo={selected.Tipo}
          Debilidad={selected.Debilidad}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
