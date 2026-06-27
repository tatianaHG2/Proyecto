import type { Card, ApiCard } from "./interface";

export const toApiCard = (carta: Card): ApiCard => ({
  idCard: carta.Numero,
  name: carta.Nombre,
  description: carta.Descripcion,
  attack: carta.Ataque,
  defense: carta.Defensa,
  lifePoints: carta.vida,
  pictureUrl: carta.Imagen,
  attributes: {
    element: "Rebelde",           // ✅ Agregado
    debilidad: carta.Debilidad,
    rareza: carta.Rareza,
    tipo: carta.Tipo,
  },
});

export const toApiCardCreate = (carta: Card): Omit<Omit<Omit<ApiCard, "idCard">, "createdAt">, "updatedAt"> => ({
  name: carta.Nombre,
  description: carta.Descripcion,
  attack: carta.Ataque,
  defense: carta.Defensa,
  lifePoints: carta.vida || 1,
  pictureUrl: carta.Imagen,
  attributes: {
    element: "Rebelde",           // ✅ Agregado
    debilidad: carta.Debilidad,
    rareza: carta.Rareza,
    tipo: carta.Tipo,
  },
  userSecret: "Tati669906NA", 
});

export const toApiUpdateCartaMap = (card: Card): Omit<ApiCard, "idCard" | "userSecret" | "createdAt" | "updatedAt"> => ({
  name: card.Nombre,
  description: card.Descripcion,
  attack: card.Ataque,
  defense: card.Defensa,
  lifePoints: card.vida || 1,
  pictureUrl: card.Imagen,
  attributes: {
    element: "Rebelde",           // ✅ Agregado
    rareza: card.Rareza,
    debilidad: card.Debilidad,
    tipo: card.Tipo,
  },
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
  idCard: 0,
});