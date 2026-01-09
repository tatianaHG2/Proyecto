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

function App() {
  const [selected, setSelected] = useState<Card | null>(null);

  const openCard = (card: Card) => setSelected(card);
  const closeModal = () => setSelected(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900 p-8">
      <h1 className="font-serif text-3xl font-bold italic text-white text-center mb-8">
        Rebelde Way
      </h1>

      <div className="flex flex-wrap justify-center gap-6">

      <CardDetail
        Ataque={100}
        Nombre="Mia Colucci"
        Defensa={50}
        Descripcion="Mia Colucci es la líder carismática del grupo Rebelde Way, una cantante talentosa que lucha por sus ideales y enfrenta conflictos amorosos y familiares en el Elite Way School."
        Imagen={MiaImg}
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
        Tipo="Lider social"
        Debilidad="Impulsiva"
        Rareza="Épica"
        onOpen={() =>
          openCard({
            Numero: 38,
            Nombre: "Marizza Pia Spirito",
            Tipo: "Lider social",
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
        Ataque={88}
        Nombre="Marcos Aguilar"
        Defensa={72}
        Descripcion="Marcos Aguilar es un talentoso guitarrista y compositor del grupo, conocido por su creatividad y lealtad al equipo."
        Imagen={MarcosImg}
        Tipo="Guitarrista Creativo"
        Debilidad="Introvertido"
        Rareza="Rara"
        onOpen={() =>
          openCard({
            Numero: 42,
            Nombre: "Marcos Aguilar",
            Tipo: "Cerebrito",
            Ataque: 88,
            Defensa: 72,
            Descripcion: "Marcos Aguilar es un talentoso guitarrista y compositor del grupo, conocido por su creatividad y lealtad al equipo.",
            Debilidad: "Introvertido",
            Rareza: "Rara",
            Imagen: MarcosImg,
          })
        }
      />

      <CardDetail
        Ataque={120}
        Nombre="Manuel Aguirre"
        Defensa={60}
        Descripcion="Manuel Aguirre, un estudiante becado inteligente y estratega, planea vengarse de aquellos que lo han humillado, mostrando su lado oscuro en el Elite Way School."
        Imagen={ManuelImg}
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
        Nombre="Felicitas Mitre"
        Defensa={85}
        Descripcion="Felicitas es sensible y perfeccionista, que expresa sus emociones a través de sus obras y enfrenta inseguridades en el Elite Way School."
        Imagen={FelicitasImg}
        Tipo="Apoyo emocional"
        Debilidad="Insegura"
        Rareza="Legendaria"
        onOpen={() =>
          openCard({
            Numero: 41,
            Nombre: "Felicitas Mitre",
            Tipo: "Apoyo emocional",
            Ataque: 95,
            Defensa: 85,
            Descripcion: "Felicitas es  sensible y perfeccionista, que expresa sus emociones a través de sus obras y enfrenta inseguridades en el Elite Way School.",
            Debilidad: "Insegura",
            Rareza: "Legendaria",
            Imagen: FelicitasImg,
          })
        }
      />

      <CardDetail
        Ataque={80}
        Nombre="Sergio Bustamante"
        Defensa={70}
        Descripcion="Sergio Bustamante es padre de Pablo, un joven arrogante y heredero de una fortuna, que usa su posición para manipular a los demás en el Elite Way School."
        Imagen={SergioImg}
        Tipo="Politico corrupto"
        Debilidad="Arrogante"
        Rareza="Rara"
        onOpen={() =>
          openCard({
            Numero: 43,
            Nombre: "Sergio Bustamante",
            Tipo: "Politico corrupto",
            Ataque: 80,
            Defensa: 70,
            Descripcion: "Sergio Bustamante es el padre de Pablo, un joven arrogante y heredero de una fortuna, que usa su posición para manipular a los demás en el Elite Way School.",
            Debilidad: "Arrogante",
            Rareza: "Rara",
            Imagen: SergioImg,
          })
        }
      />

      <CardDetail
        Ataque={110}
        Nombre="Blas Heredia"
        Defensa={60}
        Descripcion="Blas es un matón agresivo que intimida a los estudiantes más débiles, buscando imponer su autoridad en la escuela."
        Imagen={BlasImg}
        Tipo="Matón Escolar"
        Debilidad="Violento"
        Rareza="Común"
        onOpen={() =>
          openCard({
            Numero: 44,
            Nombre: "Blas Heredia",
            Tipo: "Matón Escolar",
            Ataque: 110,
            Defensa: 60,
            Descripcion: "Blas es un matón agresivo que intimida a los estudiantes más débiles, buscando imponer su autoridad en la escuela.",
            Debilidad: "Violento",
            Rareza: "Común",
            Imagen: BlasImg,
          })
        }
      />

      <CardDetail
        Ataque={75}
        Nombre="Lujan Linares"
        Defensa={85}
        Descripcion="Lujan es una amiga fiel y divertia, conocido por su personalidad extrovertida y su apoyo incondicional a sus amigos en Rebelde Way."
        Imagen={LujanImg}
        Tipo="Amiga Leal"
        Debilidad="Demasiado Confiada"
        Rareza="Épica"
        onOpen={() =>
          openCard({
            Numero: 45,
            Nombre: "Lujan Linares",
            Tipo: "Amiga Leal",
            Ataque: 75,
            Defensa: 85,
            Descripcion: "Lujan es una amiga fiel y divertia, conocido por su personalidad extrovertida y su apoyo incondicional a sus amigos en Rebelde Way.",
            Debilidad: "Demasiado Confiada",
            Rareza: "Épica",
            Imagen: LujanImg,
          })
        }
      />

      <CardDetail
        Ataque={85}
        Nombre="Sonia Rey"
        Defensa={90}
        Descripcion="Madre de Marizza, vedette extravagante y dedicada, figura maternal para Mia."
        Imagen={SoniaImg}
        Tipo="Vedette Extravagante"
        Debilidad="Exagerada"
        Rareza="Legendaria"
        onOpen={() =>
          openCard({
            Numero: 46,
            Nombre: "Sonia Rey",
            Tipo: "Vedette Extravagante",
            Ataque: 85,
            Defensa: 90,
            Descripcion: "Madre de Marizza, vedette extravagante y dedicada, figura maternal para Mia.",
            Debilidad: "Exagerada",
            Rareza: "Legendaria",
            Imagen: SoniaImg,
          })
        }
      />

      <CardDetail
        Ataque={95}
        Nombre="Franco Colucci"
        Defensa={85}
        Descripcion="Empresario de moda millonario y padre sobreprotector de Mia, con perfil autoritario y pasado complejo."
        Imagen={FrancoImg}
        Tipo="Empresario de Moda"
        Debilidad="Sobreprotector"
        Rareza="Legendaria"
        onOpen={() =>
          openCard({
            Numero: 47,
            Nombre: "Franco Colucci",
            Tipo: "Empresario de Moda",
            Ataque: 95,
            Defensa: 85,
            Descripcion: "Empresario de moda millonario y padre sobreprotector de Mia, con perfil autoritario y pasado complejo.",
            Debilidad: "Sobreprotector",
            Rareza: "Legendaria",
            Imagen: FrancoImg,
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
