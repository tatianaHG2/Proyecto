import { useState } from "react";
import "./App.css";
import CardDetail from "./components/cartaProyecto";
import MiaImg from "./assets/Mia.jpeg";
import PabloImg from "./assets/Pablo.jpeg";
import ManuelImg from "./assets/Manuel.jpeg";
import MarizzaImg from "./assets/Marizza.jpeg";
import VicoImg from "./assets/vico.jpg";
import FelicitasImg from "./assets/felicitas.jpeg";
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
        Descripcion="Mia Colucci es la líder carismática del grupo Rebelde Way, una cantante talentosa que lucha por sus ideales y enfrenta conflictos amorosos y familiares en el Elite Way School."
        Imagen={MiaImg}
        Numero={37}
        Tipo="Líder Rebelde"
        Debilidad="Celosa"
        Rareza="Legendaria"
        onOpen={() =>
          openCard({
            Numero: 37,
            Nombre: "Mia Colucci",
            Tipo: "Líder Rebelde",
            Ataque: 100,
            Defensa: 50,
            Descripcion: "Mia Colucci es la líder carismática del grupo Rebelde Way, una cantante talentosa que lucha por sus ideales y enfrenta conflictos amorosos y familiares en el Elite Way School.",
            Debilidad: "Celosa",
            Rareza: "Legendaria",
            Imagen: MiaImg,
          })
        }
      />

      <CardDetail
        Ataque={90}
        Nombre="Marizza Pia Spirito"
        Defensa={80}
        Descripcion="Marizza Pia Spirito es una activista punk apasionada por la justicia social, forma parte de la banda Rebelde Way y desafía las normas establecidas en la escuela."
        Imagen={MarizzaImg}
        Numero={38}
        Tipo="Activista Punk"
        Debilidad="Impulsiva"
        Rareza="Épica"
        onOpen={() =>
          openCard({
            Numero: 38,
            Nombre: "Marizza Pia Spirito",
            Tipo: "Activista Punk",
            Ataque: 90,
            Defensa: 80,
            Descripcion: "Marizza Pia Spirito es una activista punk apasionada por la justicia social, forma parte de la banda Rebelde Way y desafía las normas establecidas en la escuela.",
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
        Descripcion="Manuel Aguirre, un estudiante becado inteligente y estratega, planea vengarse de aquellos que lo han humillado, mostrando su lado oscuro en el Elite Way School."
        Imagen={ManuelImg}
        Numero={39}
        Tipo="Becado Vengativo"
        Debilidad="Obsesivo"
        Rareza="Mítica"
        onOpen={() =>
          openCard({
            Numero: 39,
            Nombre: "Manuel Aguirre",
            Tipo: "Becado Vengativo",
            Ataque: 120,
            Defensa: 60,
            Descripcion: "Manuel Aguirre, un estudiante becado inteligente y estratega, planea vengarse de aquellos que lo han humillado, mostrando su lado oscuro en el Elite Way School.",
            Debilidad: "Obsesivo",
            Rareza: "Mítica",
            Imagen: ManuelImg,
          })
        }
      />

      <CardDetail
        Ataque={70}
        Nombre="Pablo Bustamante"
        Defensa={90}
        Descripcion="Pablo Bustamante, hijo de un político influyente, manipula situaciones para su beneficio, pero lucha con su inseguridad interna en el Elite Way School."
        Imagen={PabloImg}
        Numero={12}
        Tipo="Político Manipulador"
        Debilidad="Inseguro"
        Rareza="Rara"
        onOpen={() =>
          openCard({
            Numero: 12,
            Nombre: "Pablo Bustamante",
            Tipo: "Político Manipulador",
            Ataque: 70,
            Defensa: 90,
            Descripcion: "Pablo Bustamante, hijo de un político influyente, manipula situaciones para su beneficio, pero lucha con su inseguridad interna en el Elite Way School.",
            Debilidad: "Inseguro",
            Rareza: "Rara",
            Imagen: PabloImg,
          })
        }
      />

      <CardDetail
        Ataque={85}
        Nombre="Victoria Paz"
        Defensa={75}
        Descripcion="Victoria Paz, conocida como Vico C, es una rapera arrogante y talentosa que compite con Mia por el liderazgo del grupo Rebelde Way en la escuela."
        Imagen={VicoImg}
        Numero={40}
        Tipo="Rapera Arrogante"
        Debilidad="Arrogante"
        Rareza="Épica"
        onOpen={() =>
          openCard({
            Numero: 40,
            Nombre: "Vico C",
            Tipo: "Rapera Arrogante",
            Ataque: 85,
            Defensa: 75,
            Descripcion: "Victoria Paz, conocida como Vico , es una rapera arrogante y talentosa que compite con Mia por el liderazgo del grupo Rebelde Way en la escuela.",
            Debilidad: "Arrogante",
            Rareza: "Épica",
            Imagen: VicoImg,
          })
        }
      />

      <CardDetail
        Ataque={95}
        Nombre="Felicitas"
        Defensa={85}
        Descripcion="Felicitas es una artista plástica sensible y perfeccionista, que expresa sus emociones a través de sus obras y enfrenta inseguridades en el Elite Way School."
        Imagen={FelicitasImg}
        Numero={41}
        Tipo="Artista Plástica"
        Debilidad="Insegura"
        Rareza="Legendaria"
        onOpen={() =>
          openCard({
            Numero: 41,
            Nombre: "Felicitas",
            Tipo: "Artista Plástica",
            Ataque: 95,
            Defensa: 85,
            Descripcion: "Felicitas es una artista plástica sensible y perfeccionista, que expresa sus emociones a través de sus obras y enfrenta inseguridades en el Elite Way School.",
            Debilidad: "Insegura",
            Rareza: "Legendaria",
            Imagen: FelicitasImg,
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
