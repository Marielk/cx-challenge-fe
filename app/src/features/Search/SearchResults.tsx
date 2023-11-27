import * as React from 'react';
import { useEffect } from 'react';
import { useAppState } from '../../context/AppContext';
import { Product } from '../../types/product';

const SearchResults: React.FC = () => {
  const { state, dispatch } = useAppState();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://api.mercadolibre.com/sites/MLA/search?q=${state.searchQuery}&limit=10`
        );
        const data = await response.json();
        dispatch({ type: 'SET_PRODUCTS', payload: data.results });
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (state.searchQuery) {
      fetchSearchResults();
    }
  }, [state.searchQuery, dispatch]);

  return (
    <div>
      <h2>Resultados de la búsqueda:</h2>
      <ul>
        {state.products.map((product: Product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
