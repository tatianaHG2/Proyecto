import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardDetail from "../../components/cartaProyecto";
import type { Card } from "../../util/interface";

type SmokeType = "music" | "normal";
type BattleStatus = "idle" | "running" | "finished";

function CampoDeBatalla() {
  const { id1, id2 } = useParams<{ id1: string; id2: string }>();
  const [card1, setCard1] = useState<Card | null>(null);
  const [card2, setCard2] = useState<Card | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [ronda, setRonda] = useState(1);
  const [battleLogs, setBattleLogs] = useState<string[]>([]);
  const [battleWinner, setBattleWinner] = useState<string | null>(null);
  const [battleStatus, setBattleStatus] = useState<BattleStatus>("idle");

  // Audio eliminado: la batalla ya no reproducirá sonido automáticamente.

  const handleSelectCard = (id: string) => {
    setSelectedCardId((prev) => (prev === id ? null : id));
  };

  const renderSmokeOverlay = (type: SmokeType) => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className={`smoke-cloud ${type === "music" ? "smoke-music" : "smoke-normal"}`} />
      {type === "music" && (
        <div className="smoke-notes">
          <span className="smoke-note">♪</span>
          <span className="smoke-note">♫</span>
          <span className="smoke-note">♪</span>
        </div>
      )}
    </div>
  );
  const getLocalCardById = (id: string): Card | null => {
    try {
      const stored = localStorage.getItem('rebelde_way_cards');
      if (!stored) return null;
      const list = JSON.parse(stored) as Card[];
      return list.find((card) => String(card.Numero) === id) ?? null;
    } catch (error) {
      console.warn('Error leyendo carta local:', error);
      return null;
    }
  };

  const getCarta = async (id: string): Promise<Card> => {
    const urlApi = `https://educapi-v2.onrender.com/card/${id}`;
    try {
      const respuesta = await fetch(urlApi, {
        method: "GET",
        headers: {
          usersecretpasskey: "Tati669906NA",
        },
      });

      if (respuesta.ok) {
        const objeto = await respuesta.json();
        const carta = objeto.data?.[0];

        if (carta) {
          return carta;
        }
      }
    } catch (error) {
      console.log(`No se pudo obtener la carta ${id} desde el servidor:`, error);
    }

    const cartaLocal = getLocalCardById(id);
    if (cartaLocal) {
      return cartaLocal;
    }

    throw new Error(`No se pudo cargar la carta ${id}`);
  };

  useEffect(() => {
    if (!id1 || !id2) {
      setError("Faltan los identificadores de las cartas.");
      return;
    }

    setLoading(true);
    setError(null);
    setBattleLogs([]);
    setBattleWinner(null);
    setBattleStatus("idle");
    setRonda(1);

    Promise.all([getCarta(id1), getCarta(id2)])
      .then(([firstCard, secondCard]) => {
        setCard1(firstCard);
        setCard2(secondCard);
      })
      .catch((fetchError) => {
        setError(fetchError instanceof Error ? fetchError.message : String(fetchError));
      })
      .finally(() => setLoading(false));
  }, [id1, id2]);

  const calcularDanio = (ataque: number, defensa: number): number => {
    return Math.max(0, ataque - defensa);
  };

  const simularRonda = () => {
    if (!card1 || !card2) {
      return;
    }

    setBattleStatus("running");
    setBattleWinner(null);
    setBattleLogs([
      `Ronda 1: ${card1.Nombre} ataca a ${card2.Nombre}`,
    ]);

  


  
    }

 

  return (
    <div className="min-h-screen bg-slate-950 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">Campo de batalla</h1>
          <p className="mt-2 text-gray-300">
            La batalla empieza al cargar las cartas y continúa ronda por ronda.
          </p>
          <p className="mt-3 text-lg text-rose-200">Ronda actual: {ronda}</p>
        </header>

        {loading && <p className="text-center text-lg text-gray-200">Cargando cartas...</p>}

        {!loading && error && <p className="text-center text-lg text-red-400">{error}</p>}

        {!loading && !error && (!card1 || !card2) && (
          <p className="text-center text-lg text-gray-200">No se pudieron cargar ambas cartas.</p>
        )}

        {!loading && !error && card1 && card2 && (
          <>
            <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-center lg:items-start">
              <div className="relative group" onClick={() => handleSelectCard(String(card1.Numero))}>
                {selectedCardId === String(card1.Numero) && renderSmokeOverlay("music")}
                <CardDetail
                  Nombre={card1.Nombre}
                  Tipo={card1.Tipo}
                  Ataque={card1.Ataque}
                  Defensa={card1.Defensa}
                  Descripcion={card1.Descripcion}
                  Imagen={card1.Imagen}
                  Debilidad={card1.Debilidad}
                  Rareza={card1.Rareza}
                  vida={card1.vida}
                  className="cursor-default w-64 hover:scale-105 transition-transform duration-300 saturate-150 shadow-[0_0_35px_rgba(248,113,113,0.55)] ring-2 ring-fuchsia-500/20"
                />
              </div>

              <div className="flex flex-col items-center gap-4 text-center">
                <div className="text-5xl font-black text-rose-300">VS</div>
                <div className="rounded-2xl border border-rose-500/40 bg-black/40 px-5 py-3 text-sm text-rose-100">
                  {battleWinner
                    ? `Ganador: ${battleWinner}`
                    : battleStatus === "running"
                      ? "Batalla en curso"
                      : "Esperando combate"}
                </div>
              </div>

              <div className="relative group" onClick={() => handleSelectCard(String(card2.Numero))}>
                {selectedCardId === String(card2.Numero) && renderSmokeOverlay("normal")}
                <CardDetail
                  Nombre={card2.Nombre}
                  Tipo={card2.Tipo}
                  Ataque={card2.Ataque}
                  Defensa={card2.Defensa}
                  Descripcion={card2.Descripcion}
                  Imagen={card2.Imagen}
                  Debilidad={card2.Debilidad}
                  Rareza={card2.Rareza}
                  vida={card2.vida}
                  className="cursor-default w-64 hover:scale-105 transition-transform duration-300 saturate-150 shadow-[0_0_35px_rgba(248,113,113,0.55)] ring-2 ring-fuchsia-500/20"
                />
              </div>
            </div>

            <div className="mt-10 max-w-3xl mx-auto rounded-2xl border border-rose-500/30 bg-black/40 p-5">
              <h2 className="text-xl font-bold text-rose-200 mb-3">Registro de combate</h2>
              <ul className="space-y-2 text-sm text-gray-100">
                {battleLogs.map((mensaje, index) => (
                  <li key={`${mensaje}-${index}`} className="border-b border-white/5 pb-2">
                    {mensaje}
                  </li>
                ))}
                {battleLogs.length === 0 && (
                  <li className="text-gray-400">La batalla aún no ha iniciado.</li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CampoDeBatalla;
