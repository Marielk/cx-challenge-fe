/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, act, screen, waitFor, fireEvent } from '@testing-library/react';
import SearchResults from '../components/SearchResults';
import { AppProvider, useAppState } from '../../../context/AppContext';
import { initialStateMock, dispatchMock, availableSortsMock } from '../../../__mocks__/contextMocks';
import { actionTypes } from '../constants/actions';
import SearchBar from '../components/SearchBar';
import { product1, product2 } from '../../../__mocks__/productsMock';
import 'raf/polyfill';

jest.mock('../../../context/AppContext', () => ({
  ...jest.requireActual('../../../context/AppContext'),
  useAppState: jest.fn()
}));
describe('SearchResults Component', () => {
  // mock the request
  const fetch = jest.fn().mockResolvedValue({
    headers: '',
    status: 200,
    ok: 'ok',
    json: jest.fn().mockResolvedValue({ 
      results: [product1, product2],
      available_sorts: availableSortsMock
    }),
  } as any);
  global.fetch = fetch;
  //mock the context values
  (useAppState as jest.Mock).mockReturnValue({ state: initialStateMock, dispatch: dispatchMock});
  it('should fetch search results and update state', async () => {

    render(
      <AppProvider>
        <SearchResults />
      </AppProvider>
    );

    await act(async () => {
      dispatchMock({ type: actionTypes.setSearch, payload: 'Tapa Blanda' });
      await waitFor(() => { 
        screen.findAllByText('Tapa Blanda').then(() => {
          const { state } = useAppState();
          const orderSelect = screen.getByText('Mayor precio')
          expect(orderSelect).toBeInTheDocument();
          expect(state.products).toEqual([product1, product2]);
        })
      });
    });
    jest.restoreAllMocks();
  });

});
