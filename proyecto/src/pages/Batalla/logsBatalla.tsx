type LogEntry = {
  turno: number;
  atacante: string;
  defensor: string;
  damage: number;
  vidaRestante: number;
};

type Props = {
  logs: LogEntry[];
  turnoActual: number;
  jugadorTurno: "p1" | "p2";
};

function LogsBatalla({ logs, turnoActual, jugadorTurno }: Props) {
  return (
    <div className="bg-neutral-950 border border-white/10 rounded-3xl p-6 shadow-2xl w-full max-w-3xl mx-auto">
      <h3 className="text-2xl font-black text-rose-200 mb-4">📜 Registro de batalla</h3>

      {logs.length === 0 ? (
        <p className="text-gray-400 text-sm">Aún no hay ataques registrados.</p>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {logs.map((log, index) => (
            <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-semibold text-rose-200">Turno {log.turno}</span>
                <span className="text-xs text-gray-400">Vida: {log.vidaRestante}</span>
              </div>
              <p className="text-sm text-gray-200">
                <span className="font-semibold text-amber-300">{log.atacante}</span> atacó a <span className="font-semibold text-cyan-300">{log.defensor}</span> y causó <span className="text-red-400">{log.damage}</span> de daño.
              </p>
              {log.vidaRestante <= 0 && (
                <p className="text-sm text-red-300 font-bold mt-2">¡DERROTADO!</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        Turno actual: {turnoActual} · Juega {jugadorTurno === "p1" ? "Jugador 1" : "Jugador 2"}
      </div>
    </div>
  );
}

export default LogsBatalla;
