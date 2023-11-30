/* eslint-disable testing-library/no-node-access */
import { screen, fireEvent } from '@testing-library/react';
import { createCustomSelect, closeAllSelect, selectOption } from '../components/customSelect';

describe('Custom Select Functions', () => {
  let selectElement: HTMLSelectElement | null = null;
  
  beforeEach(() => {
    selectElement = document.createElement('select');
    selectElement.innerHTML = `
      <option value='option1'>Option 1</option>
      <option value='option2'>Option 2</option>
    `;
    document.body.innerHTML = '';
    const div = document.createElement('div');
    div.id = 'content-placeholder';
    document.body.appendChild(div);
    div.appendChild(selectElement);
  });

  it('should create custom select', () => {
    const selectRef = { current: selectElement };
    createCustomSelect(selectRef);
    expect(screen.getAllByText('Option 1')[1]).toBeInTheDocument();
    expect(screen.getAllByText('Option 2')[1]).toBeInTheDocument();
  });

  it('should select an option', () => {
    const selectRef = { current: selectElement };
    createCustomSelect(selectRef);
    const option1Div = screen.getAllByText('Option 1')[1];
    fireEvent.click(option1Div);
    expect(option1Div).toHaveClass('selectSelected selectArrowActive');
  });

  it('should close all selects', () => {
    const selectRef1 = { current: selectElement };
    const selectRef2 = { current: selectElement?.cloneNode(true) as HTMLSelectElement };
    createCustomSelect(selectRef1);
    createCustomSelect(selectRef2);
    const option1Div = screen.getAllByText('Option 1')[1];
    fireEvent.click(option1Div);
    expect(option1Div).toHaveClass('selectSelected selectArrowActive');
    closeAllSelect(null);
    expect(option1Div).not.toHaveClass('selectSelected selectArrowActive');
  
  });
  it('should show selected option clicked', () => {
    const selectRef = { current: selectElement };
    createCustomSelect(selectRef);
    const divOption = document.createElement('div');
    document.body.appendChild(divOption);
    selectOption(divOption)
    expect(divOption).toHaveClass('sameAsSelected');
  });

});
