import * as React from 'react';
import { useContext } from 'react';
import { AppContext, useAppState } from '../../context/AppContext';

const SearchBar: React.FC = () => {
  const { dispatch } = useAppState();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
  };

  return (
    <div>
      <input type="text" placeholder="Buscar productos..." onChange={handleSearch} />
    </div>
  );
};

export default SearchBar;
