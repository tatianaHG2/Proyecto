export type ApiCard = {
  idCard: string;
  name: string;
  description: string;
  attack: number;
  defense: number;
  lifePoints: number;
  pictureUrl: string;
  attributes: { 
    Rareza: string;
    Debilidad: string;
    Tipo: string;

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
