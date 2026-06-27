
import type { ApiCard } from '../util/interface';

const API_URL = import.meta.env.VITE_API_URL;
const url = `${API_URL}/card`;

export const fetchCards = async (): Promise<ApiCard[]> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'usersecretpasskey': 'Tati669906NA'
      }
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();

    console.log("--- Listado de Cartas ---");
    result.data.forEach((card: ApiCard) => {
      console.log(`Carta: ${card.name} | ATK: ${card.attack} | DEF: ${card.defense}`);
    });
    console.log(result.data)

    console.log(`Total de cartas: ${result.total} | Página: ${result.page}`);

    return result.data;

  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};

export const createCard = async (nuevaCarta: Omit<ApiCard, 'id'>): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'usersecretpasskey': 'Tati669906NA'
      },
      body: JSON.stringify(nuevaCarta) 
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Carta creada con éxito:');
      console.log(result);
      return result;
    } else {
      console.error('❌ Error al crear la carta:', result);
      throw new Error(`Error HTTP: ${response.status}`);
    }

  } catch (error) {
    console.error('Error de red o conexión:', error);
    throw error;
  }
};

export const updateCard = async (idCard: number, updatedData: Omit<ApiCard, 'idCard' | 'userSecret'>): Promise<any> => {
  try {
    console.log('Updating card with data:', updatedData);
    const response = await fetch(`${url}/${idCard}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
        'usersecretpasskey': 'Tati669906NA'
      },
      body: JSON.stringify(updatedData)
    });
    console.log('Update fetch response status:', response.status);
    if (response.ok) {
      const result = await response.json();
      console.log('Update success:', result);
      return result;
    } else {
      const errorText = await response.text();
      console.log('Update error response:', errorText);
      throw new Error(`Error HTTP: ${response.status}`);
    }
  } catch (error) {
    console.log('Update network error:', error);
    throw error;
  }
};






// ✅ Función corregida para generar carta con IA
export const generarCartaConIA = async (cardPrompt: string): Promise<ApiCard> => {
  try {
    const urlIA = `${API_URL}/ai/generate-card`;
    console.log('📤 Enviando prompt a IA:', cardPrompt);

    const respuesta = await fetch(urlIA, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         'usersecretpasskey': 'Tati669906NA', 
      },
      body: JSON.stringify({
        globalContext: "Temática de Rebelde Way, personajes de música y drama adolescente. Ataque 0-100, defensa 0-50, vida 100-200.",
        cardPrompt: cardPrompt,
      }),
    });

    const textoRespuesta = await respuesta.text();
    console.log('📥 Respuesta cruda IA:', textoRespuesta);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP ${respuesta.status}: ${textoRespuesta}`);
    }

    const resultado = JSON.parse(textoRespuesta);
    console.log('✅ Respuesta parseada IA:', resultado);

    // La respuesta puede venir como { data: { ... } } o directamente el objeto
    const cartaApi = resultado.data ?? resultado;

    if (!cartaApi.name || !cartaApi.attack) {
      throw new Error('La IA no generó una carta válida');
    }

    return cartaApi;
  } catch (error) {
    console.error('❌ Error en generarCartaConIA:', error);
    throw error;
  }
};
