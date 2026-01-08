import { useState } from "react";
import "./App.css";
import CardDetail from "./components/cartaProyecto";
import MiaImg from "./assets/Mia.jpeg";
import PabloImg from "./assets/Pablo.jpeg";
import ManuelImg from "./assets/Manuel.jpeg";
import MarizzaImg from "./assets/Marizza.jpeg";
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

function App() {
  const [selected, setSelected] = useState<Card | null>(null);

  const openCard = (card: Card) => setSelected(card);
  const closeModal = () => setSelected(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 p-8">
      <h1 className="font-serif text-3xl font-bold italic text-red-600 text-center mb-8">
        Rebelde Way
      </h1>

      <div className="flex flex-wrap justify-center gap-6">

      <CardDetail
        Ataque={100}
        Nombre="Mia Colucci"
        Defensa={50}
        Descripcion="Manipula a sus enemigos con su mirada"
        Imagen={MiaImg}
        Numero={37}
        Tipo="Cantante de Rock"
        Debilidad="Dramatica"
        Rareza="Legendaria"
        onOpen={() =>
          openCard({
            Numero: 37,
            Nombre: "Mia Colucci",
            Tipo: "Cantante de Rock",
            Ataque: 100,
            Defensa: 50,
            Descripcion: "Manipula a sus enemigos con su mirada",
            Debilidad: "Dramatica",
            Rareza: "Legendaria",
            Imagen: MiaImg,
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
        Rareza="Épica"
        onOpen={() =>
          openCard({
            Numero: 38,
            Nombre: "Marizza Pia Spirito",
            Tipo: "Activista y Músico Underground",
            Ataque: 90,
            Defensa: 80,
            Descripcion: "Desafía la Autoridad y Consigue Aliados",
            Debilidad: "Impulsiva",
            Rareza: "Épica",
            Imagen: MarizzaImg,
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
        Rareza="Mítica"
        onOpen={() =>
          openCard({
            Numero: 39,
            Nombre: "Manuel Aguirre",
            Tipo: "Estratega y Becado",
            Ataque: 120,
            Defensa: 60,
            Descripcion: "Planea su Venganza en Secreto",
            Debilidad: "Sentimental",
            Rareza: "Mítica",
            Imagen: ManuelImg,
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
        Rareza="Rara"
        onOpen={() =>
          openCard({
            Numero: 12,
            Nombre: "Pablo Bustamante",
            Tipo: "Político en Formación",
            Ataque: 70,
            Defensa: 90,
            Descripcion: "Controla el Entorno y las Relaciones",
            Debilidad: "Cobarde",
            Rareza: "Rara",
            Imagen: PabloImg,
          })
        }
      />

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
