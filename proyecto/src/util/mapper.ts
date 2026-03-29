import type { Card ,ApiCard, } from "./interface";

export const toApiCard = (carta: Card): ApiCard => ({
  idCard: String(carta.Numero),       
  name: carta.Nombre,
  description: carta.Descripcion,
  attack: carta.Ataque,
  defense: carta.Defensa,
  lifePoints: carta.vida,
  pictureUrl: carta.Imagen ,
  attributes: { 
    Debilidad: carta.Debilidad,
    Rareza: carta.Rareza ,
    Tipo:carta.Tipo
  },
});

export const toApiCardCreate = (carta: Card): Omit<Omit<Omit<Omit<ApiCard,"idCard">,"createdAt">,"userSecret">,"updatedAt"> => ({   
  name: carta.Nombre,
  description: carta.Descripcion,
  attack: carta.Ataque,
  defense: carta.Defensa,
  lifePoints: carta.vida,
  pictureUrl: carta.Imagen ,
  attributes: { 
    Debilidad: carta.Debilidad,
    Rareza: carta.Rareza ,
    Tipo:carta.Tipo
  },
});

export const fromApiCard = (a: ApiCard): Card => ({
  Numero: Number(a.idCard) || Date.now(),
  Nombre: a.name,
  Tipo: a.attributes?.Tipo || "",
  Ataque: a.attack,
  Defensa: a.defense,
  Descripcion: a.description,
  Debilidad: a.attributes?.Debilidad || "",
  Rareza: a.attributes?.Rareza || "",
  Imagen: a.pictureUrl || "",
  vida: a.lifePoints,
});
