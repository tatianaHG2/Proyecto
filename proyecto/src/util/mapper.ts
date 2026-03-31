import type { Card ,ApiCard, } from "./interface";

export const toApiCard = (carta: Card): ApiCard => ({
  idCard: carta.Numero,       
  name: carta.Nombre,
  description: carta.Descripcion,
  attack: carta.Ataque,
  defense: carta.Defensa,
  lifePoints: carta.vida,
  pictureUrl: carta.Imagen ,
  attributes: { 
    debilidad: carta.Debilidad,
    rareza: carta.Rareza ,
    tipo:carta.Tipo
  },
});

export const toApiCardCreate = (carta: Card): Omit<Omit<Omit<ApiCard,"idCard">,"createdAt">,"updatedAt"> => ({   
  name: carta.Nombre,
  description: carta.Descripcion,
  attack: carta.Ataque,
  defense: carta.Defensa,
  lifePoints: carta.vida || 1, // Asegurar que no sea 0
  pictureUrl: "", // No enviar imagen para evitar límites
  attributes: { 
    debilidad: carta.Debilidad,
    rareza: carta.Rareza ,
    tipo:carta.Tipo
  },
  userSecret: "Tati669906NA"
});

export const toApiUpdateCartaMap = (card: Card): Omit<ApiCard, "idCard"> => ({
  name: card.Nombre,
  description: card.Descripcion,
  attack: card.Ataque,
  defense: card.Defensa,
  lifePoints: card.vida || 1, // Asegurar que no sea 0
  pictureUrl: "", // No enviar imagen para evitar límites
  attributes: {
    rareza: card.Rareza,
    debilidad: card.Debilidad,
    tipo: card.Tipo
  },
  userSecret: "Tati669906NA",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const fromApiCard = (a: ApiCard): Card => ({
  Numero: a.idCard,
  Nombre: a.name,
  Tipo: a.attributes?.tipo || "",
  Ataque: a.attack,
  Defensa: a.defense,
  Descripcion: a.description,
  Debilidad: a.attributes?.debilidad || "",
  Rareza: a.attributes?.rareza || "",
  Imagen: a.pictureUrl || "",
  vida: a.lifePoints,
});
