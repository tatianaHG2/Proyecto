import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generarCartaConIA } from '../components/api.ts';
import type { Card } from '../util/interface.ts';
import { fromApiCard } from '../util/mapper.ts';
import CardDetail from '../components/cartaProyecto.tsx';
function GenerarCartaIA() {
  const [prompt, setPrompt] = useState('');
  const [cartaGenerada, setCartaGenerada] = useState<Card | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGenerar = async () => {
    if (!prompt.trim()) {
      setError('Por favor, escribe una descripción para la carta.');
      return;
    }

    setLoading(true);
    setError(null);
    setCartaGenerada(null);

    try {
      const apiCard = await generarCartaConIA(prompt);
      const card = fromApiCard(apiCard);
      setCartaGenerada(card);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar la carta');
    } finally {
      setLoading(false);
    }
  };

  const handleGuardar = () => {
    // Aquí podrías implementar la lógica para guardar la carta en tu estado global o API
    // Por ahora, solo navegamos de vuelta al listado
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-400 via-red-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">🤖 Generar Carta con IA</h1>
        <p className="text-center text-gray-300 mb-6">
          Describe la carta que quieres crear y la IA se encargará del resto.
        </p>

        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-red-700/50">
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
              Descripción de la carta
            </label>
            <textarea
              id="prompt"
              rows={4}
              className="w-full p-3 bg-black/60 border border-red-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Ej: Una guitarrista rebelde con aura de fuego, líder de una banda de rock. Su ataque se basa en la energía de sus conciertos."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <button
            onClick={handleGenerar}
            disabled={loading}
            className="w-full py-3 from-red-600 to-orange-600 text-white font-bold rounded-lg hover:from-red-700 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generando...' : '✨ Generar Carta'}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
              {error}
            </div>
          )}
        </div>

        {cartaGenerada && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-center mb-4">¡Carta Generada!</h2>
            <div className="flex justify-center">
              <CardDetail
                Nombre={cartaGenerada.Nombre}
                Tipo={cartaGenerada.Tipo}
                Ataque={cartaGenerada.Ataque}
                Defensa={cartaGenerada.Defensa}
                Descripcion={cartaGenerada.Descripcion}
                Imagen={cartaGenerada.Imagen}
                Debilidad={cartaGenerada.Debilidad}
                Rareza={cartaGenerada.Rareza}
                vida={cartaGenerada.vida}
                onOpen={() => {}}
              />
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleGuardar}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-colors"
              >
                💾 Guardar Carta
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-bold transition-colors"
              >
                ↩️ Volver al Inicio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GenerarCartaIA;