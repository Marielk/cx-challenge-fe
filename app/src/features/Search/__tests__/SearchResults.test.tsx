/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, act, screen, waitFor } from '@testing-library/react';
import SearchResults from '../components/SearchResults';
import { AppProvider, useAppState } from '../../../context/AppContext';
import { initialStateMock, dispatchMock } from '../../../context/__test__/contextMocks';
import { actionTypes } from '../../../context/__test__/constants';

jest.mock('../../../context/AppContext', () => ({
  ...jest.requireActual('../../../context/AppContext'),
  useAppState: jest.fn()
}));
describe('SearchResults Component', () => {
  it('should fetch search results and update state', async () => {
    // mock the request
    const fetch = jest.fn().mockResolvedValue({
      headers: '',
      status: 200,
      ok: 'ok',
      json: jest.fn().mockResolvedValue({ results: [{ id: '1', title: 'Product 1' }] }),
    } as any);
    global.fetch = fetch;
    
    //mock the context values
    (useAppState as jest.Mock).mockReturnValue({ state: initialStateMock, dispatch: dispatchMock});

    render(
      <AppProvider>
        <SearchResults />
      </AppProvider>
    );

    await act(async () => {
      dispatchMock({ type: actionTypes.setSearch, payload: 'Product 1' });
      await waitFor(() => { 
        screen.findAllByText('Product 1').then(() => {
          const { state } = useAppState();
          expect(state.products).toEqual([{ id: '1', title: 'Product 1' }]);
        })
      });
    });
    jest.restoreAllMocks();
  });
});
