import React from 'react';
import { render } from '@testing-library/react';
import { AppProvider, appReducer, useAppState } from '../AppContext';
import { AppAction } from '../../types/context';
import { product1, product2 } from '../../__mocks__/productsMock';
import { availableSortsMock } from '../../__mocks__/contextMocks';

describe('AppProvider', () => {
  it('renders children without crashing', () => {
    render(
      <AppProvider>
        <div>Children content</div>
      </AppProvider>
    );
  });
});

describe('useAppState', () => {
  it('throws an error when used outside AppProvider', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<ComponentUsingAppState />)).toThrow(
      'useAppState debe ser usado dentro de un AppProvider'
    );
  });
});

const ComponentUsingAppState = () => {
  const { state, dispatch } = useAppState();
  return (
    <div>
      <span>{state.searchQuery}</span>
      <button onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: 'New Query' })}>
        Update Query
      </button>
    </div>
  );
};

describe('appReducer', () => {
  it('sets products in state', () => {
    const initialState = { products: [], searchQuery: '', sort: '', availableSorts: [] };
    const action: AppAction = { type: 'SET_PRODUCTS', payload: [product1, product2] };

    const newState = appReducer(initialState, action);

    expect(newState.products).toEqual([product1, product2]);
  });
  it('sets search query in state', () => {
    const initialState = { products: [], searchQuery: '', sort: '', availableSorts: [] };
    const action: AppAction = { type: 'SET_SEARCH_QUERY', payload: 'test' };

    const newState = appReducer(initialState, action);

    expect(newState.searchQuery).toEqual('test');
  });
  it('sets sort in state', () => {
    const initialState = { products: [], searchQuery: '', sort: '', availableSorts: [] };
    const action: AppAction = { type: 'SET_SORT', payload: 'price_asc' };

    const newState = appReducer(initialState, action);

    expect(newState.sort).toEqual('price_asc');
  });
  it('sets available sorts in state', () => {
    const initialState = { products: [], searchQuery: '', sort: '', availableSorts: [] };
    const action: AppAction = { type: 'SET_AVAILABLE_SORTS', payload: availableSortsMock };

    const newState = appReducer(initialState, action);

    expect(newState.availableSorts).toEqual(availableSortsMock);
  });

});