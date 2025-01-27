import React from 'react';
import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { AppAction, AppState } from '../types/context';

interface AppContextProps {
  state: AppState;
  dispatch: Dispatch<AppAction>;
}

const initialState: AppState = {
  products: [],
  searchQuery: '',
  sort: '',
  availableSorts: [],
  priceRange: { min: 0, max: 0 }, 
  availablePricesRanges: [{
    id: '',
    name: '',
    results: 0
  }]
};

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    case 'SET_AVAILABLE_SORTS':
      return { ...state, availableSorts: action.payload };
    case 'SET_AVAILABLE_PRICES_RANGES':
      return { ...state, availablePricesRanges: action.payload };
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppState debe ser usado dentro de un AppProvider');
  }
  return context;
};