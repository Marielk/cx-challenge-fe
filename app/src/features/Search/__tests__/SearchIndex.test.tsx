import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Search from '../SearchIndex';
import { AppProvider, useAppState } from '../../../context/AppContext';
import { dispatchMock, initialStateMock } from '../../../__mocks__/contextMocks';

jest.mock('../../../context/AppContext', () => ({
  ...jest.requireActual('../../../context/AppContext'),
  useAppState: jest.fn(),
}));
describe('SearchIndex Component', () => {
  it('should show Search components', () => {
    (useAppState as jest.Mock).mockReturnValue({ state: initialStateMock, dispatch: dispatchMock});
    render(
      <AppProvider>
        <Search />
      </AppProvider>
    );
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
});
