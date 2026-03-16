// Definimos la URL (usaremos una API de prueba como ejemplo)
const url = 'https://educapi-v2.onrender.com/card';

const fetchCards = async () => {
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

    // Accedemos a "data" que es donde está el array de cartas
    console.log("--- Listado de Cartas ---");
    result.data.forEach(card => {
      console.log(`Carta: ${card.name} | ATK: ${card.attack} | DEF: ${card.defense}`);
    });
    console.log(result.data)

    // También imprimimos la info de paginación
    console.log(`Total de cartas: ${result.total} | Página: ${result.page}`);

  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

const createCard = async () => {
  const nuevaCarta = {
    name: "Pablo",
    description: "Corrupcion",
    attack: 2000,
    defense: 1500,
    lifePoints: 2500,
    pictureUrl: "https://example.com/image.jpg",
    attributes: { tipo: "Mago" }
  };

  try {
    const response = await fetch(url, {
      method: 'POST', // Cambiamos el método
      headers: {
        'Content-Type': 'application/json', // Indispensable para enviar JSON
        'usersecretpasskey': 'Tati669906NA'
      },
      body: JSON.stringify(nuevaCarta) // Convertimos el objeto a texto JSON
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Carta creada con éxito:');
      console.log(result);
    } else {
      console.error('❌ Error al crear la carta:', result);
    }

  } catch (error) {
    console.error('Error de red o conexión:', error);
  }
};

fetchCards();