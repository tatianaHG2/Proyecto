import { useState } from "react";
import CardDetail from "../components/cartaProyecto";
import { Link } from "react-router-dom";
import type { Card } from "../util/interface";
import Modal from "../components/Modal";

function Lista({ cards, onDelete }: { cards: Card[]; onDelete: (id: number) => Promise<void> }) {
  const [selected, setSelected] = useState<Card | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const openCard = (card: Card) => setSelected(card);
  const closeModal = () => setSelected(null);

  const filteredCards = cards.filter((card) =>
    card.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Estilos globales para animaciones y diseño */}
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
        .lista-container {
          min-height: 100vh;
          background: linear-gradient(-45deg, #0a0a0a, #1a0b2e, #0b1a2e, #0a0a0a);
          background-size: 400% 400%;
          animation: gradientMove 15s ease infinite;
          padding: 2rem 1.5rem;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .search-wrapper {
          position: absolute;
          top: 2rem;
          right: 2rem;
          z-index: 10;
        }
        .search-input {
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(8px);
          border: 1px solid #4a3a6a;
          border-radius: 50px;
          padding: 0.7rem 1.2rem 0.7rem 2.8rem;
          color: #f0f0f0;
          font-size: 1rem;
          width: 220px;
          transition: all 0.3s ease;
          outline: none;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.2);
        }
        .search-input:focus {
          border-color: #a855f7;
          box-shadow: 0 0 25px rgba(168, 85, 247, 0.5);
          width: 280px;
        }
        .search-input::placeholder {
          color: #8888aa;
          font-weight: 300;
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #8888aa;
          font-size: 1.2rem;
          pointer-events: none;
        }
        .main-title {
          font-size: 4.5rem;
          font-weight: 900;
          letter-spacing: 4px;
          color: #ffffff;
          animation: glowPulse 3s ease-in-out infinite;
          margin-bottom: 0.2rem;
          text-transform: uppercase;
        }
        .sub-title {
          font-size: 1.3rem;
          color: #b0b0d0;
          font-weight: 300;
          letter-spacing: 2px;
          text-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
          animation: float 4s ease-in-out infinite;
        }
        .header-area {
          width: 100%;
          max-width: 1200px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-top: 1rem;
          margin-bottom: 2rem;
          position: relative;
        }
        .button-group {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.2rem;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .btn-custom {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.9rem 2.2rem;
          font-weight: 700;
          font-size: 1.1rem;
          border-radius: 14px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
          transition: all 0.25s ease;
          text-decoration: none;
          overflow: hidden;
          letter-spacing: 0.5px;
          border: none;
          cursor: pointer;
        }
        .btn-custom:hover {
          transform: scale(1.06) translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.8);
        }
        .btn-custom .glow {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.05);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .btn-custom:hover .glow {
          opacity: 1;
        }
        .btn-create {
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          color: white;
        }
        .btn-battle {
          background: linear-gradient(135deg, #f59e0b, #ea580c);
          color: #0f0f0f;
        }
        .btn-ai {
          background: linear-gradient(135deg, #059669, #0d9488);
          color: white;
        }
        .cards-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2.5rem;
          margin-top: 2rem;
          max-width: 1400px;
          width: 100%;
        }
        .card-wrapper {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        .card-wrapper:hover {
          transform: translateY(-10px) scale(1.04);
        }
        /* Responsive */
        @media (max-width: 768px) {
          .main-title { font-size: 3rem; }
          .search-wrapper {
            position: relative;
            top: auto;
            right: auto;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin-bottom: 1rem;
          }
          .search-input { width: 100%; max-width: 280px; }
          .search-input:focus { width: 100%; max-width: 320px; }
          .header-area { margin-top: 0; }
          .button-group { gap: 0.8rem; }
          .btn-custom { padding: 0.7rem 1.5rem; font-size: 0.95rem; }
        }
      `}</style>

      <div className="lista-container">
        {/* Barra de búsqueda - esquina superior derecha */}
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar carta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Header con título y botones */}
        <div className="header-area">
          <h1 className="main-title">Rebelde Way</h1>
          <p className="sub-title">⚡ Crea y explora tus cartas desde aquí ⚡</p>

          <div className="button-group">
            <Link to="/crearCarta" className="btn-custom btn-create">
              <span className="glow" />
              ✦ Crear Nueva Carta
            </Link>
            <Link to="/seleccionar-carta" className="btn-custom btn-battle">
              <span className="glow" />
              ⚔️ Batalla
            </Link>
            <Link to="/generar-carta-ia" className="btn-custom btn-ai">
              <span className="glow" />
              🤖 Generar con IA
            </Link>
          </div>
        </div>

        {/* Grid de cartas */}
        <div className="cards-grid">
          {filteredCards.map((carta) => (
            <div
              key={carta.Numero}
              className="card-wrapper"
              onClick={() => openCard(carta)}
            >
              <CardDetail
                Nombre={carta.Nombre}
                Ataque={carta.Ataque}
                Defensa={carta.Defensa}
                Descripcion={carta.Descripcion}
                Imagen={carta.Imagen!}
                Tipo={carta.Tipo}
                Debilidad={carta.Debilidad}
                vida={carta.vida}
                onOpen={() => openCard(carta)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal de detalle */}
      {selected && (
        <Modal
          Numero={selected.Numero}
          Nombre={selected.Nombre}
          Tipo={selected.Tipo}
          Ataque={selected.Ataque}
          Defensa={selected.Defensa}
          Descripcion={selected.Descripcion}
          Imagen={selected.Imagen}
          Debilidad={selected.Debilidad}
          Rareza={selected.Rareza}
          onClose={closeModal}
          onDelete={() => onDelete(selected.Numero)}
        />
      )}
    </>
  );
}

export default Lista;