import type { Card ,ApiCard} from "./interface";

export const toApiCard = (carta: Card): ApiCard => ({
  idCard: String(carta.Numero),       
  name: carta.Nombre,
  description: carta.Descripcion,
  attack: carta.Ataque,
  defense: carta.Defensa,
  lifePoints: carta.vida,
  pictureUrl: carta.Imagen || "",
  attributes: { tipo: carta.Tipo || "" },
  userSecret: undefined,
  createdAt: new Date().toISOString(),
  updatedAt: null,
});

export const fromApiCard = (a: ApiCard): Card => ({
  Numero: Number(a.idCard) || Date.now(),
  Nombre: a.name,
  Tipo: a.attributes?.tipo || "",
  Ataque: a.attack,
  Defensa: a.defense,
  Descripcion: a.description,
  Debilidad: undefined,
  Rareza: undefined,
  Imagen: a.pictureUrl || "",
  URL: undefined,
  vida: a.lifePoints,
});
