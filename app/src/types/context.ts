import { Product } from "./product";

export interface AppState {
  products: Product[];
  searchQuery: string;
  // Otros estados globales pueden agregarse aquí
}

export type AppAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_SEARCH_QUERY'; payload: string };