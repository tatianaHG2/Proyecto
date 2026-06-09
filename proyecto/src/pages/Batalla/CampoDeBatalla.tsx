import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardDetail from "../../components/cartaProyecto";
import type { Card } from "../../util/interface";

type BattleLog = {
  turno: number;
  atacante: string;
  defensor: string;
  danio: number;
  vidaP1: number;
  vidaP2: number;
};

type Winner = "P1" | "P2" | "Empate";

// Fondo de estrellas y brillitos
function StarsAndSparkles() {
  const stars = useMemo(
    () =>
      Array.from({ length: 120 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 3,
        duration: 1.5 + Math.random() * 3,
        delay: Math.random() * 5,
        opacity: 0.3 + Math.random() * 0.7,
      })),
    []
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 40 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 6,
        duration: 3 + Math.random() * 5,
        delay: Math.random() * 8,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s infinite alternate`,
            animationDelay: `${star.delay}s`,
            boxShadow: `0 0 ${star.size * 1.5}px rgba(255, 255, 255, 0.8)`,
          }}
        />
      ))}
      {sparkles.map((spark, i) => (
        <div
          key={`spark-${i}`}
          className="absolute"
          style={{
            left: `${spark.left}%`,
            top: `${spark.top}%`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            animation: `floatSparkle ${spark.duration}s infinite ease-in-out`,
            animationDelay: `${spark.delay}s`,
          }}
        >
          <div
            className="w-full h-full bg-amber-200 rounded-full"
            style={{
              boxShadow: "0 0 8px rgba(255, 215, 0, 0.7), 0 0 12px rgba(255, 100, 0, 0.5)",
              transform: "rotate(45deg)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

// Componente de mensaje de victoria
function VictoryMessage({ winnerName, onComplete }: { winnerName: string; onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="animate-bounceIn text-center">
        <h1 className="text-8xl md:text-9xl font-extrabold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-orange-500 to-fuchsia-400 drop-shadow-[0_0_28px_rgba(255,180,0,0.7)]">
          ¡VICTORIA!
        </h1>
        <p className="text-3xl md:text-4xl font-black uppercase text-white mt-4 bg-black/60 backdrop-blur-sm px-8 py-3 rounded-full inline-block tracking-[0.15em] shadow-[0_0_30px_rgba(255,255,255,0.18)]">
          {winnerName} es el campeón
        </p>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-5%`,
              backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
              animation: `confettiFall ${1 + Math.random() * 2}s linear forwards`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function CampoDeBatalla() {
  const { id1, id2 } = useParams<{ id1: string; id2: string }>();
  const navigate = useNavigate();
  const [card1, setCard1] = useState<Card | null>(null);
  const [card2, setCard2] = useState<Card | null>(null);
  const [health1, setHealth1] = useState<number>(0);
  const [health2, setHealth2] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [turno, setTurno] = useState<number>(1);
  const [battleLogs, setBattleLogs] = useState<BattleLog[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<Winner | null>(null);
  const [autoBattle, setAutoBattle] = useState<boolean>(false);
  const [showVictory, setShowVictory] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(true);
  const timeoutRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- Música de fondo ---
  useEffect(() => {
    const audio = new Audio("/Rebelde.mp3"); // Cambia esta ruta a tu música
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    // Intentar reproducir automáticamente
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn("Autoplay bloqueado por el navegador. El usuario debe interactuar.", error);
        setIsMusicPlaying(false);
        // Opcional: mostrar un botón para iniciar la música manualmente
      });
    }

    // Limpiar al desmontar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []); // Solo se ejecuta al montar el componente

  // Función para alternar la música
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.warn("Error al reproducir:", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };
  // --- Fin música ---

  const clearTimeoutRef = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const getLocalCardById = (id: string): Card | null => {
    try {
      const stored = localStorage.getItem("rebelde_way_cards");
      if (!stored) return null;
      const list = JSON.parse(stored) as Card[];
      return list.find((card) => String(card.Numero) === id) ?? null;
    } catch (error) {
      console.warn("Error leyendo carta local:", error);
      return null;
    }
  };

  const getCarta = async (id: string): Promise<Card> => {
    const cartaLocal = getLocalCardById(id);
    if (cartaLocal) return cartaLocal;

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
        if (carta) return carta;
      }
    } catch (error) {
      console.warn(`No se pudo obtener la carta ${id} desde el servidor:`, error);
    }

    throw new Error(`No se pudo cargar la carta ${id}`);
  };

  useEffect(() => {
    if (!id1 || !id2) {
      setError("Faltan los identificadores de las cartas en la ruta.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setBattleLogs([]);
    setTurno(1);
    setGameOver(false);
    setWinner(null);
    setAutoBattle(false);
    setShowVictory(false);

    Promise.all([getCarta(id1), getCarta(id2)])
      .then(([firstCard, secondCard]) => {
        setCard1(firstCard);
        setCard2(secondCard);
        setHealth1(firstCard.vida ?? 0);
        setHealth2(secondCard.vida ?? 0);
      })
      .catch((fetchError) => {
        setError(fetchError instanceof Error ? fetchError.message : String(fetchError));
      })
      .finally(() => setLoading(false));

    return clearTimeoutRef;
  }, [id1, id2]);

  useEffect(() => {
    if (gameOver && winner && winner !== "Empate") {
      setShowVictory(true);
    } else {
      setShowVictory(false);
    }
  }, [gameOver, winner]);

  const calcularDanio = (atacante: Card, defensor: Card): number => {
    return Math.max(atacante.Ataque - defensor.Defensa, 0);
  };

  const realizarAtaque = () => {
    if (!card1 || !card2 || gameOver) return;

    const esTurnoP1 = turno % 2 === 1;
    const atacante = esTurnoP1 ? card1 : card2;
    const defensor = esTurnoP1 ? card2 : card1;
    const vidaDefensor = esTurnoP1 ? health2 : health1;
    const danio = calcularDanio(atacante, defensor);
    const vidaRestante = Math.max(vidaDefensor - danio, 0);

    if (esTurnoP1) {
      setHealth2(vidaRestante);
    } else {
      setHealth1(vidaRestante);
    }

    setBattleLogs((prev) => [
      ...prev,
      {
        turno,
        atacante: atacante.Nombre,
        defensor: defensor.Nombre,
        danio,
        vidaP1: esTurnoP1 ? health1 : vidaRestante,
        vidaP2: esTurnoP1 ? vidaRestante : health2,
      },
    ]);

    if (vidaRestante <= 0) {
      setGameOver(true);
      setWinner(esTurnoP1 ? "P1" : "P2");
      setAutoBattle(false);
      return;
    }

    setTurno((current) => current + 1);
  };

  useEffect(() => {
    if (!autoBattle || gameOver) return undefined;
    clearTimeoutRef();
    timeoutRef.current = window.setTimeout(() => {
      realizarAtaque();
    }, 900);
    return clearTimeoutRef;
  }, [autoBattle, turno, gameOver, health1, health2, card1, card2]);

  const iniciarBatalla = () => {
    if (gameOver || !card1 || !card2) return;
    realizarAtaque();
  };

  const atacarConCarta = (atacanteCarta: 1 | 2) => {
    if (!card1 || !card2 || gameOver) return;

    const atacante = atacanteCarta === 1 ? card1 : card2;
    const defensor = atacanteCarta === 1 ? card2 : card1;
    const vidaDefensor = atacanteCarta === 1 ? health2 : health1;
    const danio = calcularDanio(atacante, defensor);
    const vidaRestante = Math.max(vidaDefensor - danio, 0);

    if (atacanteCarta === 1) {
      setHealth2(vidaRestante);
    } else {
      setHealth1(vidaRestante);
    }

    setBattleLogs((prev) => [
      ...prev,
      {
        turno,
        atacante: atacante.Nombre,
        defensor: defensor.Nombre,
        danio,
        vidaP1: atacanteCarta === 1 ? health1 : vidaRestante,
        vidaP2: atacanteCarta === 1 ? vidaRestante : health2,
      },
    ]);

    if (vidaRestante <= 0) {
      setGameOver(true);
      setWinner(atacanteCarta === 1 ? "P1" : "P2");
      setAutoBattle(false);
      return;
    }

    setTurno((current) => current + 1);
  };

  const toggleAutoBattle = () => {
    if (gameOver) return;
    setAutoBattle((active) => !active);
  };

  const reiniciarBatalla = () => {
    if (!card1 || !card2) return;
    clearTimeoutRef();
    setHealth1(card1.vida ?? 0);
    setHealth2(card2.vida ?? 0);
    setTurno(1);
    setBattleLogs([]);
    setGameOver(false);
    setWinner(null);
    setAutoBattle(false);
    setShowVictory(false);
  };

  const estadoActual = gameOver
    ? winner === "Empate"
      ? "Empate técnico"
      : winner === "P1"
      ? `${card1?.Nombre} gana`
      : `${card2?.Nombre} gana`
    : `Turno ${turno} - ${turno % 2 === 1 ? "P1 ataca" : "P2 ataca"}`;

  const winnerName = winner === "P1" ? card1?.Nombre : winner === "P2" ? card2?.Nombre : "";

  return (
    <div className="relative min-h-screen bg-slate-950 text-white py-8 px-4 overflow-hidden">
      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.2; transform: scale(1); }
            100% { opacity: 1; transform: scale(1.2); }
          }
          @keyframes floatSparkle {
            0% {
              transform: translate(0, 0) rotate(0deg);
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            80% {
              opacity: 1;
            }
            100% {
              transform: translate(var(--tx, 20px), var(--ty, -20px)) rotate(360deg);
              opacity: 0;
            }
          }
          @keyframes cardWinGlow {
            0% {
              box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7), 0 0 0 0 rgba(255, 100, 0, 0.5);
              border-color: rgba(255, 215, 0, 0.5);
            }
            50% {
              box-shadow: 0 0 20px 10px rgba(255, 215, 0, 0.8), 0 0 30px 15px rgba(255, 100, 0, 0.6);
              border-color: rgba(255, 215, 0, 1);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7), 0 0 0 0 rgba(255, 100, 0, 0.5);
              border-color: rgba(255, 215, 0, 0.5);
            }
          }
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.3);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes confettiFall {
            0% {
              transform: translateY(-20vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
          .animate-bounceIn {
            animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          }
          .card-glow {
            animation: cardWinGlow 1.2s infinite alternate;
            border-radius: 1rem;
            transition: all 0.2s;
          }
        `}
      </style>

      <StarsAndSparkles />

      {showVictory && winnerName && (
        <VictoryMessage winnerName={winnerName} onComplete={() => setShowVictory(false)} />
      )}

      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-[0.35em] text-transparent bg-clip-text bg-linear-to-r from-fuchsia-400 via-violet-300 to-amber-200 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
            Campo de batalla
          </h1>
          <p className="mt-2 text-gray-300 text-lg md:text-xl tracking-widest uppercase">
            El duelo se decide por turnos, ataque a ataque.
          </p>
          <p className="mt-3 text-lg md:text-xl text-rose-200 font-semibold tracking-[0.15em] uppercase">
            {estadoActual}
          </p>
        </header>

        {loading && (
          <p className="text-center text-lg text-gray-200">Cargando cartas...</p>
        )}

        {!loading && error && (
          <div className="text-center text-lg text-red-400">{error}</div>
        )}

        {!loading && !error && (!card1 || !card2) && (
          <p className="text-center text-lg text-gray-200">
            No se pudieron cargar ambas cartas.
          </p>
        )}

        {!loading && !error && card1 && card2 && (
          <>
            <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-center lg:items-start">
              {/* Carta 1 con brillo si gana */}
              <div
                className={`relative w-full lg:w-1/3 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl ${
                  gameOver && winner === "P1" ? "card-glow" : ""
                }`}
                style={{ borderRadius: "1rem" }}
              >
                <div onClick={() => atacarConCarta(1)}>
                  <CardDetail
                    Nombre={card1.Nombre}
                    Tipo={card1.Tipo}
                    Ataque={card1.Ataque}
                    Defensa={card1.Defensa}
                    Descripcion={card1.Descripcion}
                    Imagen={card1.Imagen}
                    Debilidad={card1.Debilidad}
                    Rareza={card1.Rareza}
                    vida={health1}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 text-center">
                <div className="text-6xl font-black text-rose-300">VS</div>
                <div className="rounded-2xl border border-rose-500/40 bg-black/40 px-6 py-4 text-sm text-rose-100 shadow-lg backdrop-blur-sm">
                  <p className="font-semibold mb-2">{estadoActual}</p>
                  <button
                    type="button"
                    onClick={iniciarBatalla}
                    disabled={gameOver}
                    className="mb-2 inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-gray-600"
                  >
                    Atacar turno
                  </button>
                  <button
                    type="button"
                    onClick={toggleAutoBattle}
                    className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition ${
                      gameOver
                        ? "bg-gray-600 text-white cursor-not-allowed"
                        : autoBattle
                        ? "bg-emerald-600 text-white hover:bg-emerald-500"
                        : "bg-amber-500 text-black hover:bg-amber-400"
                    }`}
                    disabled={gameOver}
                  >
                    {autoBattle ? "Detener auto" : "Auto batalla"}
                  </button>
                  <button
                    type="button"
                    onClick={reiniciarBatalla}
                    className="mt-3 inline-flex items-center justify-center rounded-full bg-slate-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
                  >
                    Reiniciar batalla
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/seleccionar-carta")}
                    className="mt-3 inline-flex items-center justify-center rounded-full border border-rose-500 bg-black/40 px-5 py-3 text-sm font-bold text-rose-200 transition hover:bg-rose-500/10"
                  >
                    Cambiar cartas
                  </button>
                </div>
              </div>

              {/* Carta 2 con brillo si gana */}
              <div
                className={`relative w-full lg:w-1/3 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl ${
                  gameOver && winner === "P2" ? "card-glow" : ""
                }`}
                style={{ borderRadius: "1rem" }}
              >
                <div onClick={() => atacarConCarta(2)}>
                  <CardDetail
                    Nombre={card2.Nombre}
                    Tipo={card2.Tipo}
                    Ataque={card2.Ataque}
                    Defensa={card2.Defensa}
                    Descripcion={card2.Descripcion}
                    Imagen={card2.Imagen}
                    Debilidad={card2.Debilidad}
                    Rareza={card2.Rareza}
                    vida={health2}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Control de música */}
            <div className="fixed bottom-4 right-4 z-20 bg-black/60 backdrop-blur-sm rounded-full p-2">
              <button
                onClick={toggleMusic}
                className="text-white text-sm px-3 py-1 rounded-full bg-rose-500/50 hover:bg-rose-500 transition"
              >
                {isMusicPlaying ? "🔊 Música" : "🔇 Música"}
              </button>
            </div>

            <div className="mt-10 rounded-2xl border border-rose-500/30 bg-black/40 p-5 shadow-xl backdrop-blur-sm">
              <h2 className="text-xl font-bold text-rose-200 mb-4">Registro de combate</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3 text-sm text-gray-100">
                  {battleLogs.length === 0 ? (
                    <p className="text-gray-400">La batalla aún no ha iniciado.</p>
                  ) : (
                    battleLogs.map((log, index) => (
                      <div key={`${log.turno}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="font-semibold text-rose-200">Turno {log.turno}</p>
                        <p>
                          {log.atacante} atacó a {log.defensor} y causó {log.danio} de daño.
                        </p>
                        <p className="text-sm text-gray-300">
                          Vida P1: {log.vidaP1} · Vida P2: {log.vidaP2}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CampoDeBatalla;