export type ApiCard = {
  idCard: number;
  name: string;
  description: string;
  attack: number;
  defense: number;
  lifePoints: number;
  pictureUrl: string;
  attributes: { 
    rareza: string;
    debilidad: string;
    tipo: string;

};
  userSecret?: string;
  createdAt?: string;
  updatedAt?: string | null;
};
export type Card = {
  Numero: number;
  Nombre: string;
  Tipo: string;
  Ataque: number;
  Defensa: number;
  Descripcion: string;
  Debilidad: string;
  Rareza: string;
  Imagen: string;
  vida:number;
};
export const toApiUpdateCartaMap = (card: Card): Omit<ApiCard, "idCard" | "userSecret" | "createdAt" | "updatedAt"> => ({
  name: card.Nombre,
  description: card.Descripcion,
  attack: card.Ataque,
  defense: card.Defensa,
  lifePoints: card.vida,
  pictureUrl: card.Imagen,
  attributes: {
    rareza: card.Rareza,
    debilidad: card.Debilidad,
    tipo: card.Tipo
  },
});