import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import { AppProvider, useAppState } from '../../../context/AppContext';
import { dispatchMock, initialStateMock } from '../../../context/__test__/contextMocks';

jest.mock('../../../context/AppContext', () => ({
  ...jest.requireActual('../../../context/AppContext'),
  useAppState: jest.fn(),
}));
describe('SearchBar Component', () => {
  it('should update searchQuery on input change', () => {
    
    (useAppState as jest.Mock).mockReturnValue({ state: initialStateMock, dispatch: dispatchMock});
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
