import { Product } from './product';

export interface AppState {
  products: Product[];
  searchQuery: string;
  sort: string;
  availableSorts: { id: string; name: string }[];
  // add more states
}

export type AppAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SORT'; payload: string }
  | { type: 'SET_AVAILABLE_SORTS'; payload: AppState['availableSorts'] };