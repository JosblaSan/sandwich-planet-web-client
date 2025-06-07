export interface Sandwich {
  id?: number; // El ID será opcional para la creación
  nombre: string;
  origen: string;
  tipo: string;
  ingredientes: string[];
  atributos: {
    vegetariano: boolean;
    vegano: boolean;
    sin_gluten: boolean;
    picante: boolean;
  };
  calorias_aproximadas: number;
  precio: number;
  disponible: boolean;
  imagen_url: string;
}