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
    navigate('/');
  };

  return (
    <>
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glowPulse {
          0%, 100% { text-shadow: 0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 40px #3b82f6; }
          50% { text-shadow: 0 0 20px #a855f7, 0 0 40px #3b82f6, 0 0 80px #3b82f6; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .generar-container {
          min-height: 100vh;
          background: linear-gradient(-45deg, #0a0a0a, #1a0b2e, #0b1a2e, #0a0a0a);
          background-size: 400% 400%;
          animation: gradientMove 15s ease infinite;
          padding: 2rem 1.5rem;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        .generar-inner {
          max-width: 900px;
          width: 100%;
          position: relative;
        }
        .header-area {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .btn-back-top {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1.2rem;
          background: rgba(10, 10, 10, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid #4a3a6a;
          border-radius: 2rem;
          color: #d0d0f0;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.1);
          flex-shrink: 0;
        }
        .btn-back-top:hover {
          border-color: #a855f7;
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 0 25px rgba(168, 85, 247, 0.3);
        }
        .title-wrapper {
          flex: 1;
          text-align: center;
        }
        .main-title {
          font-size: 3.8rem;
          font-weight: 900;
          letter-spacing: 2px;
          color: #ffffff;
          animation: glowPulse 3s ease-in-out infinite;
          margin: 0;
        }
        .sub-title {
          font-size: 1.2rem;
          color: #b0b0d0;
          font-weight: 300;
          text-align: center;
          animation: float 4s ease-in-out infinite;
          margin-top: 0.2rem;
          margin-bottom: 2rem;
        }
        .card-form {
          background: rgba(10, 10, 10, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid #4a3a6a;
          border-radius: 2rem;
          padding: 2rem;
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.15);
          transition: border-color 0.3s;
        }
        .card-form:focus-within {
          border-color: #a855f7;
          box-shadow: 0 0 50px rgba(168, 85, 247, 0.25);
        }
        .label-input {
          display: block;
          color: #c0c0e0;
          font-weight: 500;
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }
        .textarea-custom {
          width: 100%;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid #3a2a5a;
          border-radius: 1.2rem;
          color: #f0f0f0;
          font-size: 1rem;
          resize: vertical;
          transition: all 0.3s ease;
          outline: none;
        }
        .textarea-custom:focus {
          border-color: #a855f7;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
        }
        .textarea-custom::placeholder {
          color: #666688;
        }
        .btn-generate {
          width: 100%;
          padding: 0.9rem;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          border: none;
          border-radius: 1.5rem;
          color: white;
          font-weight: 700;
          font-size: 1.2rem;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .btn-generate:hover:not(:disabled) {
          transform: scale(1.02) translateY(-2px);
          box-shadow: 0 12px 35px rgba(124, 58, 237, 0.6);
        }
        .btn-generate:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        .spinner {
          display: inline-block;
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        .error-box {
          margin-top: 1.2rem;
          padding: 1rem;
          background: rgba(220, 38, 38, 0.2);
          border: 1px solid #ef4444;
          border-radius: 1rem;
          color: #fca5a5;
        }
        .result-area {
          margin-top: 2.5rem;
          animation: fadeInUp 0.6s ease-out;
        }
        .result-title {
          font-size: 2.2rem;
          font-weight: 700;
          text-align: center;
          color: #e0e0ff;
          text-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
          margin-bottom: 1.5rem;
        }
        .card-wrapper {
          display: flex;
          justify-content: center;
        }
        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 1.2rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }
        .btn-save {
          padding: 0.7rem 2rem;
          background: linear-gradient(135deg, #059669, #0d9488);
          border: none;
          border-radius: 2rem;
          color: white;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(5, 150, 105, 0.4);
        }
        .btn-save:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 8px 25px rgba(5, 150, 105, 0.6);
        }
        .btn-back-bottom {
          padding: 0.7rem 2rem;
          background: rgba(75, 85, 99, 0.8);
          border: 1px solid #4b5563;
          border-radius: 2rem;
          color: #e5e7eb;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(4px);
        }
        .btn-back-bottom:hover {
          background: rgba(107, 114, 128, 0.9);
          transform: scale(1.05) translateY(-2px);
          border-color: #6b7280;
        }
        @media (max-width: 640px) {
          .header-area { flex-direction: column; align-items: stretch; gap: 0.5rem; }
          .btn-back-top { align-self: flex-start; }
          .main-title { font-size: 2.6rem; }
          .sub-title { font-size: 1rem; }
          .card-form { padding: 1.5rem; }
          .result-title { font-size: 1.8rem; }
        }
      `}</style>

      <div className="generar-container">
        <div className="generar-inner">
          {/* Encabezado con botón Volver y título */}
          <div className="header-area">
            <button onClick={() => navigate('/')} className="btn-back-top">
              ← Volver
            </button>
            <div className="title-wrapper">
              <h1 className="main-title">🤖 Generar Carta con IA</h1>
            </div>
            {/* Espacio vacío para mantener el centrado (opcional) */}
            <div style={{ width: '100px', flexShrink: 0 }}></div>
          </div>
          <p className="sub-title">Describe tu carta y la IA la creará por ti</p>

          <div className="card-form">
            <div className="mb-4">
              <label htmlFor="prompt" className="label-input">
                Descripción de la carta
              </label>
              <textarea
                id="prompt"
                rows={4}
                className="textarea-custom"
                placeholder="Ej: Una guitarrista rebelde con aura de fuego, líder de una banda de rock. Su ataque se basa en la energía de sus conciertos."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <button
              onClick={handleGenerar}
              disabled={loading}
              className="btn-generate"
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Generando...
                </>
              ) : (
                '✨ Generar Carta'
              )}
            </button>

            {error && (
              <div className="error-box">
                ⚠️ {error}
              </div>
            )}
          </div>

          {cartaGenerada && (
            <div className="result-area">
              <h2 className="result-title">🎉 ¡Carta Generada!</h2>
              <div className="card-wrapper">
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
              <div className="action-buttons">
                <button onClick={handleGuardar} className="btn-save">
                  💾 Guardar Carta
                </button>
                <button onClick={() => navigate('/')} className="btn-back-bottom">
                  ↩️ Volver al Inicio
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default GenerarCartaIA;