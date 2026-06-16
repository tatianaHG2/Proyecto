import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Card } from "../../util/interface";
import CardDetail from "../../components/cartaProyecto";
import AudioPlayer from "../../components/AudioPlayer";

type Props = {
  mazo: Card[];
  loading: boolean;
};

function SeleccionarCartas({ mazo, loading }: Props) {
  const navigate = useNavigate();
  const [cardSeleccionada1, setCardSeleccionada1] = useState<Card | null>(null);
  const [cardSeleccionada2, setCardSeleccionada2] = useState<Card | null>(null);
  const [smokeCard, setSmokeCard] = useState<number | null>(null); // número de carta que muestra humo
  const listoBatalla = Boolean(cardSeleccionada1 && cardSeleccionada2);

  const handleSeleccionarCarta = (carta: Card) => {
    const isSelected1 = cardSeleccionada1?.Numero === carta.Numero;
    const isSelected2 = cardSeleccionada2?.Numero === carta.Numero;


    setSmokeCard(carta.Numero);
    setTimeout(() => setSmokeCard(null), 600); 

    if (isSelected1) {
      setCardSeleccionada1(null);
      return;
    }

    if (isSelected2) {
      setCardSeleccionada2(null);
      return;
    }

    if (!cardSeleccionada1) {
      setCardSeleccionada1(carta);
    } else if (!cardSeleccionada2) {
      setCardSeleccionada2(carta);
    }
  };

  return (
    <>
     
    
      <div className="relative min-h-screen py-8 px-4 bg-linear-to-br from-neutral-950 via-red-950/90 to-stone-950 overflow-hidden rock-noise">
       
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%3E%3Cpath%20d%3D%22M0%200h200v200H0z%22%20fill%3D%22%231a1a1a%22%2F%3E%3Cpath%20d%3D%22M20%2020h40v40H20zM140%2060h40v40h-40zM60%20140h40v40H60zM120%20120h40v40h-40z%22%20fill%3D%22%23333%22%2F%3E%3C%2Fsvg%3E')] bg-repeat"></div>

        <div className="relative max-w-6xl mx-auto z-10">
          <header className="text-center mb-12">
            <h1 className="font-['Impact','Metal_Mania','Permanent_Marker',system-ui] text-5xl md:text-7xl uppercase tracking-widest bg-linear-to-r from-red-600 via-amber-500 to-red-700 bg-clip-text text-transparent animate-[flame-flicker_1.2s_infinite_alternate] drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]">
              ⚡ Duelo de Rebeldes ⚡
            </h1>
            <p className="mt-4 text-red-300 font-mono uppercase text-sm tracking-[0.2em] border-b border-red-700/50 inline-block pb-2 px-4 backdrop-blur-sm bg-black/30 rounded-full">
              Elige dos Rebeldes y desata el caos
            </p>
          </header>
          <div className="max-w-3xl mx-auto mb-6">
            <AudioPlayer label="Música para seleccionar cartas" />
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-amber-500"></div>
              <p className="mt-6 text-red-400 font-bold text-xl uppercase tracking-wider">Cargando arsenal...</p>
            </div>
          ) : mazo.length === 0 ? (
            <div className="text-center py-20 border-2 border-red-800 rounded-2xl bg-black/50 backdrop-blur">
              <p className="text-2xl font-black text-red-500">¡MAZO VACÍO!</p>
              <p className="text-gray-400 mt-2">No hay cartas disponibles para la batalla.</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {mazo.map((carta) => {
                const seleccionada =
                  cardSeleccionada1?.Numero === carta.Numero ||
                  cardSeleccionada2?.Numero === carta.Numero;

                return (
                  <div
                    key={carta.Numero}
                    className={`relative card-rock group cursor-pointer rounded-xl ${
                      seleccionada ? "animate-[pulse-red_1.2s_ease-in-out_infinite]" : ""
                    }`}
                    onClick={() => handleSeleccionarCarta(carta)}
                  >
                  
                    {smokeCard === carta.Numero && <div className="smoke-effect" />}

                    <CardDetail
                      Nombre={carta.Nombre}
                      Tipo={carta.Tipo}
                      Ataque={carta.Ataque}
                      Defensa={carta.Defensa}
                      Descripcion={carta.Descripcion}
                      Imagen={carta.Imagen}
                      Debilidad={carta.Debilidad}
                      Rareza={carta.Rareza}
                      vida={carta.vida}
                      className="cursor-pointer bg-black/40 backdrop-blur-sm rounded-xl border-2 transition-all duration-200"
                    
                    />
                    {seleccionada && (
                      <div className="absolute top-2 right-2 bg-red-700 text-white text-xs font-black px-2 py-1 rounded-bl-lg rounded-tr-md shadow-lg uppercase z-30">
                        ¡LISTO!
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-12 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={() => {
                if (!listoBatalla || !cardSeleccionada1 || !cardSeleccionada2) return;
                navigate(`/campo-de-batalla/${cardSeleccionada1.Numero}/${cardSeleccionada2.Numero}`);
              }}
              disabled={!listoBatalla}
              className={`relative group inline-flex items-center justify-center rounded-full px-10 py-5 text-xl font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                listoBatalla
                  ? "bg-linear-to-r from-red-700 via-orange-600 to-red-700 text-amber-100 shadow-[0_0_15px_#ff4500] hover:scale-105 hover:shadow-[0_0_25px_#ff0000] border-b-4 border-amber-400"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
              }`}>
              <span className="relative z-10 flex items-center gap-3">
                {listoBatalla ? "🔥 IR A LA BATALLA 🔥" : "⚡ SELECCIONA DOS CARTAS ⚡"}
              </span>
              {listoBatalla && (
                <span className="absolute inset-0 rounded-full bg-linear-to-r from-red-600/0 via-amber-500/30 to-red-600/0 blur-md animate-pulse"></span>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-bold uppercase tracking-[0.15em] bg-slate-900 text-slate-100 border border-slate-700 transition hover:bg-slate-800 hover:text-white"
            >
              Volver al inicio
            </button>
          </div>

          <div className="mt-8 text-center text-sm font-mono text-amber-400/80">
            {cardSeleccionada1 && cardSeleccionada2 ? (
              <div className="flex justify-center gap-6 items-center">
                <span className="bg-black/60 px-3 py-1 rounded-full border-l-4 border-red-500">🎸 {cardSeleccionada1.Nombre}</span>
                <span className="text-red-500 text-2xl font-black animate-pulse">VS</span>
                <span className="bg-black/60 px-3 py-1 rounded-full border-r-4 border-red-500">{cardSeleccionada2.Nombre} 🤘</span>
              </div>
            ) : (
              <p className="tracking-wider text-red-400">Selecciona {!cardSeleccionada1 ? "primera" : "segunda"} carta para el duelo</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SeleccionarCartas;