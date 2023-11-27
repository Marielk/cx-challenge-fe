/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, act, screen } from '@testing-library/react';
import SearchResults from '../SearchResults';
import { AppProvider, useAppState } from '../../../context/AppContext';
import { Product } from '@/src/types/product';

describe('SearchResults Component', () => {
  it('should fetch search results and update state', async () => {

    // global.fetch.mockRestore();
    await act(async () => {
      jest.mock('../../../context/AppContext', () => ({
        ...jest.requireActual('../../../context/AppContext'),
        useAppState: jest.fn(),
      }));
      const fetch = jest.mock().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ results: [{ id: '1', title: 'Product 1' }] }),
      } as any);
      //mock the context values
      let initialState = { searchQuery: '', products: []  as Array<Product>};
      const dispatch = (args:{type: string, payload: Array<Product> | string}) => {
        if(args.type === 'SET_SEARCH_QUERY' && typeof(args.payload) === 'string') {
          return initialState.searchQuery = args.payload
        }
        if(args.type === 'SET_PRODUCTS' && typeof(args.payload) !== 'string') {
          return initialState.products = args.payload
        }
      }
      (useAppState as jest.Mock).mockReturnValue({ state: initialState, dispatch});

      render(
        <AppProvider>
          <SearchResults />
        </AppProvider>
      );
      dispatch({ type: 'SET_SEARCH_QUERY', payload: 'Product 1' });
      const { state } = useAppState();
      await screen.findByText('Product 1');
      expect(state.products).toEqual([{ id: '1', title: 'Product 1' }]);
    });
  });
});
