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
};

export const AppContext = createContext<AppContextProps | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
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