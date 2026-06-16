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

// Fondo de partículas neón
function NeonParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 60 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 4,
        duration: 3 + Math.random() * 8,
        delay: Math.random() * 5,
        color: `hsl(${Math.random() * 60 + 280}, 80%, 65%)`,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animation: `floatNeon ${p.duration}s infinite alternate ease-in-out`,
            animationDelay: `${p.delay}s`,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
}

// Overlay de hielo que aumenta con la vida perdida
const IceOverlay = ({ currentHealth, maxHealth }: { currentHealth: number; maxHealth: number }) => {
  const lossPercent = 1 - currentHealth / maxHealth;
  const intensity = Math.min(0.8, Math.max(0, lossPercent * 1.2));

  if (intensity <= 0.05) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none rounded-2xl transition-all duration-500"
      style={{
        backgroundColor: `rgba(100, 180, 250, ${intensity * 0.6})`,
        boxShadow: `inset 0 0 30px rgba(0, 150, 255, ${intensity * 0.8})`,
        backdropFilter: `blur(${intensity * 3}px)`,
        border: `2px solid rgba(120, 200, 255, ${intensity * 0.9})`,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%2380c0ff' fill-opacity='${intensity * 0.4}' d='M2 0L0 3h4L2 0z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '8px 10px',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {intensity > 0.4 && (
          <span className="text-white/50 text-6xl font-black animate-pulse">❄️</span>
        )}
      </div>
    </div>
  );
};

// Mensaje de victoria (animado que desaparece)
function VictoryMessage({ winnerName, onComplete }: { winnerName: string; onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="animate-bounceIn text-center">
        <h1 className="text-8xl md:text-9xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-300 drop-shadow-[0_0_35px_rgba(0,255,255,0.8)]">

        </h1>

      
      </div>
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-5%`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`,
              animation: `confettiFall ${1 + Math.random() * 2}s linear forwards`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const TieMessage = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="animate-bounceIn text-center">
        <h1 className="text-7xl md:text-8xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          ¡EMPATE!
        </h1>
        <p className="text-xl md:text-2xl font-mono font-bold uppercase text-gray-200 mt-4 bg-black/70 backdrop-blur-md px-8 py-3 rounded-full inline-block border border-white/30">
          Ninguno puede hacer daño
        </p>
      </div>
    </div>
  );
};

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

  // Música de fondo
  useEffect(() => {
    const audio = new Audio("/Rebelde.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => setIsMusicPlaying(false));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.warn);
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

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
    } catch {
      return null;
    }
  };

  const getCarta = async (id: string): Promise<Card> => {
    const cartaLocal = getLocalCardById(id);
    if (cartaLocal) return cartaLocal;

    const urlApi = `https://educapi-v2.onrender.com/card/${id}`;
    const respuesta = await fetch(urlApi, {
      method: "GET",
      headers: { usersecretpasskey: "Tati669906NA" },
    });

    if (respuesta.ok) {
      const objeto = await respuesta.json();
      const carta = objeto.data?.[0];
      if (carta) return carta;
    }
    throw new Error(`No se pudo cargar la carta ${id}`);
  };

  const getHealthPercentage = (current: number, max: number) =>
    Math.max(0, Math.min(100, Math.round((current / max) * 100)));

  const HealthBar = ({ label, current, max, color }: { label: string; current: number; max: number; color: string }) => {
    const percentage = getHealthPercentage(current, max);
    return (
      <div className="space-y-1">
        <div className="flex justify-between text-xs font-mono font-bold uppercase tracking-wider">
          <span className="text-cyan-300">{label}</span>
          <span className="text-white/80">{current} / {max}</span>
        </div>
        <div className="h-3 w-full rounded-full bg-black/60 border border-white/10 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${color}`}
            style={{ width: `${percentage}%`, boxShadow: `0 0 8px ${color.includes('cyan') ? '#06b6d4' : '#d946ef'}` }}
          />
        </div>
      </div>
    );
  };

  // Verifica si ambos combatientes son incapaces de hacerse daño mutuamente
  const ambosNoPuedenHacerseDanio = (): boolean => {
    if (!card1 || !card2) return false;
    const ataque1VsDefensa2 = card1.Ataque <= card2.Defensa;
    const ataque2VsDefensa1 = card2.Ataque <= card1.Defensa;
    return ataque1VsDefensa2 && ataque2VsDefensa1;
  };

  useEffect(() => {
    if (!id1 || !id2) {
      setError("Faltan los identificadores.");
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
      .catch((fetchError) => setError(fetchError instanceof Error ? fetchError.message : String(fetchError)))
      .finally(() => setLoading(false));

    return clearTimeoutRef;
  }, [id1, id2]);

  useEffect(() => {
    if (gameOver && winner) setShowVictory(true);
    else setShowVictory(false);
  }, [gameOver, winner]);

  const calcularDanio = (atacante: Card, defensor: Card): number => {
    return Math.max(atacante.Ataque - defensor.Defensa, 0);
  };

  const realizarAtaque = () => {
    if (!card1 || !card2 || gameOver) return;

    if (ambosNoPuedenHacerseDanio()) {
      setGameOver(true);
      setWinner("Empate");
      setAutoBattle(false);
      return;
    }

    const esTurnoP1 = turno % 2 === 1;
    const atacante = esTurnoP1 ? card1 : card2;
    const defensor = esTurnoP1 ? card2 : card1;
    const vidaDefensor = esTurnoP1 ? health2 : health1;
    const danio = calcularDanio(atacante, defensor);
    const vidaRestante = Math.max(vidaDefensor - danio, 0);

    const newHealth1 = esTurnoP1 ? health1 : vidaRestante;
    const newHealth2 = esTurnoP1 ? vidaRestante : health2;

    if (esTurnoP1) setHealth2(vidaRestante);
    else setHealth1(vidaRestante);

    setBattleLogs((prev) => [
      ...prev,
      { turno, atacante: atacante.Nombre, defensor: defensor.Nombre, danio, vidaP1: newHealth1, vidaP2: newHealth2 },
    ]);

    if (ambosNoPuedenHacerseDanio() && danio === 0) {
      setGameOver(true);
      setWinner("Empate");
      setAutoBattle(false);
      return;
    }

    if (newHealth1 <= 0 && newHealth2 <= 0) {
      setGameOver(true);
      setWinner("Empate");
      setAutoBattle(false);
      return;
    }
    if (newHealth2 <= 0) {
      setGameOver(true);
      setWinner(esTurnoP1 ? "P1" : "P2");
      setAutoBattle(false);
      return;
    }
    if (newHealth1 <= 0) {
      setGameOver(true);
      setWinner(esTurnoP1 ? "P1" : "P2");
      setAutoBattle(false);
      return;
    }

    setTurno((current) => current + 1);
  };

  useEffect(() => {
    if (!autoBattle || gameOver) return;
    clearTimeoutRef();
    timeoutRef.current = window.setTimeout(realizarAtaque, 800);
    return clearTimeoutRef;
  }, [autoBattle, turno, gameOver, health1, health2, card1, card2]);

  const iniciarBatalla = () => {
    if (gameOver || !card1 || !card2) return;
    realizarAtaque();
  };

  const atacarConCarta = (atacanteCarta: 1 | 2) => {
    if (!card1 || !card2 || gameOver) return;

    if (ambosNoPuedenHacerseDanio()) {
      setGameOver(true);
      setWinner("Empate");
      setAutoBattle(false);
      return;
    }

    const atacante = atacanteCarta === 1 ? card1 : card2;
    const defensor = atacanteCarta === 1 ? card2 : card1;
    const vidaDefensor = atacanteCarta === 1 ? health2 : health1;
    const danio = calcularDanio(atacante, defensor);
    const vidaRestante = Math.max(vidaDefensor - danio, 0);

    const newHealth1 = atacanteCarta === 1 ? health1 : vidaRestante;
    const newHealth2 = atacanteCarta === 1 ? vidaRestante : health2;

    if (atacanteCarta === 1) setHealth2(vidaRestante);
    else setHealth1(vidaRestante);

    setBattleLogs((prev) => [
      ...prev,
      { turno, atacante: atacante.Nombre, defensor: defensor.Nombre, danio, vidaP1: newHealth1, vidaP2: newHealth2 },
    ]);

    if (ambosNoPuedenHacerseDanio() && danio === 0) {
      setGameOver(true);
      setWinner("Empate");
      setAutoBattle(false);
      return;
    }

    if (newHealth1 <= 0 && newHealth2 <= 0) {
      setGameOver(true);
      setWinner("Empate");
      setAutoBattle(false);
      return;
    }
    if (newHealth2 <= 0) {
      setGameOver(true);
      setWinner(atacanteCarta === 1 ? "P1" : "P2");
      setAutoBattle(false);
      return;
    }
    if (newHealth1 <= 0) {
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

  const atacanteActual = () => {
    if (gameOver) return "Batalla terminada";
    return turno % 2 === 1 ? card1?.Nombre || "P1" : card2?.Nombre || "P2";
  };

  const estadoActual = gameOver
    ? winner === "Empate"
      ? "Empate técnico - Sin daño posible"
      : winner === "P1"
      ? `${card1?.Nombre} gana`
      : `${card2?.Nombre} gana`
    : `⚔️ Turno ${turno} - Ataca: ${atacanteActual()} ⚔️`;

  const winnerName = winner === "P1" ? card1?.Nombre : winner === "P2" ? card2?.Nombre : "";
  const maxHealth1 = card1?.vida ?? 1;
  const maxHealth2 = card2?.vida ?? 1;

  // Banner grande del ganador (persistente)
  const WinnerBanner = () => {
    if (!gameOver || winner === "Empate") return null;
    return (
      <div className="mt-2 mb-4 text-center animate-bounceIn">
        <div className="inline-block bg-black/70 backdrop-blur-md px-8 py-4 rounded-2xl border-2 border-amber-400 shadow-[0_0_40px_rgba(255,200,0,0.6)]">
          <p className="text-2xl md:text-4xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500">
            🏆 EL GANADOR ES 🏆
          </p>
          <p className="text-4xl md:text-6xl font-black uppercase tracking-wider text-amber-300 drop-shadow-[0_0_20px_#f59e0b] mt-2">
            {winnerName}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-black text-white py-6 px-4 overflow-hidden">
      <style>
        {`
          @keyframes floatNeon {
            0% { transform: translate(0, 0) scale(1); opacity: 0.2; }
            100% { transform: translate(15px, -15px) scale(1.5); opacity: 0.8; }
          }
          @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes confettiFall {
            0% { transform: translateY(-20vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          @keyframes cardWinGlow {
            0% {
              box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4), 0 0 0 0 rgba(255, 100, 0, 0.3);
              border-color: rgba(255, 215, 0, 0.5);
            }
            50% {
              box-shadow: 0 0 30px 15px rgba(255, 215, 0, 0.9), 0 0 40px 20px rgba(255, 100, 0, 0.7);
              border-color: rgba(255, 215, 0, 1);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4), 0 0 0 0 rgba(255, 100, 0, 0.3);
              border-color: rgba(255, 215, 0, 0.5);
            }
          }
          .card-glow {
            animation: cardWinGlow 1s infinite alternate;
            border-radius: 1rem;
          }
        `}
      </style>

      <NeonParticles />

      {showVictory &&
        (winner === "Empate" ? (
          <TieMessage onComplete={() => setShowVictory(false)} />
        ) : (
          winnerName && <VictoryMessage winnerName={winnerName} onComplete={() => setShowVictory(false)} />
        ))}

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-300 drop-shadow-[0_0_25px_rgba(0,255,255,0.5)]">
            CAMPO DE BATALLA
          </h1>
          <div className="mt-3 inline-block px-6 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-cyan-500/50 shadow-[0_0_12px_cyan]">
            <p className="text-lg font-mono font-bold text-cyan-300">{estadoActual}</p>
          </div>
        </header>

        <WinnerBanner />

        {loading && (
          <div className="text-center text-cyan-300 text-xl font-mono animate-pulse">Cargando combatientes...</div>
        )}

        {!loading && error && <div className="text-center text-red-400 text-lg">{error}</div>}

        {!loading && !error && (!card1 || !card2) && (
          <p className="text-center text-gray-300">No se pudieron cargar ambas cartas.</p>
        )}

        {!loading && !error && card1 && card2 && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* COLUMNA IZQUIERDA: BOTONES */}
            <div className="lg:w-1/5 flex flex-col gap-4 justify-start">
              <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-cyan-500/30 p-4 shadow-xl">
                <p className="text-cyan-300 font-mono text-sm mb-3 text-center">🎮 CONTROLES</p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={iniciarBatalla}
                    disabled={gameOver}
                    className="py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_10px_cyan] hover:shadow-[0_0_18px_cyan] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ⚡ Atacar
                  </button>
                  <button
                    onClick={toggleAutoBattle}
                    disabled={gameOver}
                    className={`py-2 px-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                      autoBattle
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_0_10px_#10b981]"
                        : "bg-gradient-to-r from-amber-500 to-orange-600 shadow-[0_0_10px_#f59e0b]"
                    } text-white disabled:opacity-50`}
                  >
                    {autoBattle ? "⏹️ Detener auto" : "🤖 Auto batalla"}
                  </button>
                  <button
                    onClick={reiniciarBatalla}
                    className="py-2 px-3 rounded-lg bg-slate-800/80 border border-white/20 text-sm font-bold uppercase tracking-wider text-white hover:bg-slate-700 transition-all"
                  >
                    🔄 Reiniciar
                  </button>
                  <button
                    onClick={() => navigate("/seleccionar-carta")}
                    className="py-2 px-3 rounded-lg bg-black/60 border border-fuchsia-500/50 text-sm font-bold uppercase tracking-wider text-fuchsia-300 hover:bg-fuchsia-900/30 transition-all"
                  >
                    🃏 Cambiar cartas
                  </button>
                </div>
                <div className="mt-4 pt-3 border-t border-white/20 text-center text-xs text-cyan-400/80 font-mono">
                  🔥 Turno: <span className="font-bold text-cyan-300">{turno}</span><br />
                  ⚔️ Atacante: <span className="font-bold text-yellow-300">{atacanteActual()}</span>
                </div>
              </div>
              <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-cyan-500/30 p-3 shadow-xl">
                <button
                  onClick={toggleMusic}
                  className="w-full py-2 rounded-lg bg-black/50 text-cyan-300 text-xs font-mono flex items-center justify-center gap-2 hover:bg-cyan-900/30 transition-all"
                >
                  {isMusicPlaying ? "🔊 MUSIC ON" : "🔇 MUSIC OFF"}
                </button>
              </div>
            </div>

            {/* COLUMNA CENTRAL: CARTAS */}
            <div className="flex-1 flex flex-col md:flex-row justify-center items-center gap-6 lg:gap-10">
              {/* Carta 1 */}
              <div
                className={`relative w-full max-w-sm cursor-pointer transition-all duration-300 hover:scale-105 ${
                  gameOver && winner === "P1" ? "card-glow" : ""
                }`}
              >
                <div className="relative">
                  <HealthBar label="VIDA P1" current={health1} max={maxHealth1} color="bg-gradient-to-r from-cyan-500 to-blue-500" />
                  <div className="mt-2 relative" onClick={() => atacarConCarta(1)}>
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
                      className="w-full rounded-2xl border-2 border-cyan-500/30 bg-black/40 backdrop-blur-md shadow-xl"
                    />
                    <IceOverlay currentHealth={health1} maxHealth={maxHealth1} />
                    {gameOver && winner === "P1" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-2xl">
                  
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 animate-pulse drop-shadow-[0_0_18px_#06b6d4]">
                VS
              </div>

              {/* Carta 2 */}
              <div
                className={`relative w-full max-w-sm cursor-pointer transition-all duration-300 hover:scale-105 ${
                  gameOver && winner === "P2" ? "card-glow" : ""
                }`}
              >
                <div className="relative">
                  <HealthBar label="VIDA P2" current={health2} max={maxHealth2} color="bg-gradient-to-r from-fuchsia-500 to-pink-500" />
                  <div className="mt-2 relative" onClick={() => atacarConCarta(2)}>
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
                      className="w-full rounded-2xl border-2 border-fuchsia-500/30 bg-black/40 backdrop-blur-md shadow-xl"
                    />
                    <IceOverlay currentHealth={health2} maxHealth={maxHealth2} />
                    {gameOver && winner === "P2" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-2xl">
                        <span className="text-7xl drop-shadow-lg"></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: HISTORIAL */}
            <div className="lg:w-1/4">
              <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-cyan-500/30 p-4 shadow-xl h-full">
                <h2 className="text-cyan-300 font-mono font-bold text-sm mb-3 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  REGISTRO DE COMBATE
                </h2>
                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
                  {battleLogs.length === 0 ? (
                    <p className="text-gray-400 font-mono text-xs">Esperando el primer ataque...</p>
                  ) : (
                    battleLogs.map((log, idx) => (
                      <div key={idx} className="border-l-2 border-cyan-500 pl-3 py-1 bg-white/5 rounded-r-md">
                        <p className="text-cyan-300 font-mono text-xs font-bold">▶ Turno {log.turno}</p>
                        <p className="text-xs text-gray-200">
                          {log.atacante} → {log.defensor} : <span className="text-rose-300 font-bold">{log.danio} daño</span>
                        </p>
                        <p className="text-[11px] text-gray-400 font-mono">
                          ❤️ {log.vidaP1} | 💙 {log.vidaP2}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e1e2f;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #06b6d4;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

export default CampoDeBatalla;