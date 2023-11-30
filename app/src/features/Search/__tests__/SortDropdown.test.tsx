/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, act, screen, waitFor, fireEvent } from '@testing-library/react';
import { AppProvider, useAppState } from '../../../context/AppContext';
import { initialStateMock, dispatchMock, availableSortsMock } from '../../../__mocks__/contextMocks';
import { actionTypes } from '../constants/actions';
import SortDropdown from '../components/SortDropdown';
import 'raf/polyfill';
import { searchTexts } from '../constants/texts';
import { sortTypes } from '../constants/sortTypes';

jest.mock('../../../context/AppContext', () => ({
  ...jest.requireActual('../../../context/AppContext'),
  useAppState: jest.fn()
}));
describe('SortDropdown Component', () => {
  (useAppState as jest.Mock).mockReturnValue({ state: initialStateMock, dispatch: dispatchMock});
    render(
      <AppProvider>
        <SortDropdown />
      </AppProvider>
    );
  it('renders SortDropdown component', () => {
    const select = screen.getByLabelText(searchTexts.sortTitle)
    expect(select).toBeInTheDocument();
  });

  it('fires custom select creation on store change', async () => {
    await act(async () => {
      dispatchMock({ type: actionTypes.setSort, payload: sortTypes.priceAsc });
      dispatchMock({ type: actionTypes.setAvailableSorts, payload: availableSortsMock });
      await waitFor(() => {
        screen.findAllByText(availableSortsMock[0].name).then(() => {
          const option1 = screen.getByText(availableSortsMock[1].name);
          expect(option1).toBeInTheDocument();
        })
      })
    })

  });
  it('selects an option when clicked', async () => {
    await act(async () => {
      dispatchMock({ type: actionTypes.setSort, payload: sortTypes.priceAsc });
      dispatchMock({ type: actionTypes.setAvailableSorts, payload: availableSortsMock });
      await waitFor(() => {
        screen.findAllByText(availableSortsMock[0].name).then(() => {
          const option1 = screen.getByText(availableSortsMock[1].name);
          fireEvent.click(option1);
          const {state} = useAppState()
          expect(state.sort).toBe(availableSortsMock[1].id)
        })
      })
    })
  });

});
