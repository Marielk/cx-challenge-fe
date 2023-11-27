import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from '../SearchBar';
import { AppProvider, useAppState } from '../../../context/AppContext';

jest.mock('../../../context/AppContext', () => ({
  ...jest.requireActual('../../../context/AppContext'),
  useAppState: jest.fn(),
}));
describe('SearchBar Component', () => {
  it('should update searchQuery on input change', () => {
    let initialState = { searchQuery: '' };
    const dispatch = (args:{type: string, payload: string}) => {
      if(args.type === 'SET_SEARCH_QUERY') {
        return initialState.searchQuery = args.payload
      }
    }
    (useAppState as jest.Mock).mockReturnValue({ state: initialState, dispatch});
    render(
      <AppProvider>
        <SearchBar />
      </AppProvider>
    );
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    const { state } = useAppState();
    expect(state.searchQuery).toBe('test');
  });
});
