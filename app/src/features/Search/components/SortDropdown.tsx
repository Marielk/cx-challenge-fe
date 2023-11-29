import React, { useEffect, useRef } from 'react';
import { useAppState } from '../../../context/AppContext';
import styles from '../styles/sortDropdown.module.scss';
import { searchTexts } from '../constants/texts';
import { closeAllSelect, createCustomSelect, selectOption } from './customSelect';

const SortDropdown: React.FC = () => {
  const { state, dispatch } = useAppState();
  const select = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    startCustomSelect();
    document.addEventListener('click', () => {closeAllSelect(null)})
    return(() => {
      document.removeEventListener('click', () => {closeAllSelect(null)})
    })
  }, [state.sort]);

  const startCustomSelect = () => {
    if(select.current && state.sort) {
      select.current.value = state.sort;
      createCustomSelect(select);
      searchOptions();
    }
  }

  const searchOptions = () => {
    state.availableSorts.map((option, index) => {
      const optionDiv = document.getElementById(option.id)
      optionDiv?.addEventListener('click', () => onOptionSelected(index, optionDiv))
    })
  }
  
  const onOptionSelected = (optionIndex: number, optionDiv: HTMLElement) => {
    const sortedOptionSelected = state.availableSorts[optionIndex].id;
    selectOption(optionDiv);
    dispatch({ type: 'SET_SORT', payload: sortedOptionSelected });
  }

  return (
    <div className={styles.sortDropdownContainer}>
      <label htmlFor='sort'>{searchTexts.sortTitle}</label>
      <div className={styles.customSelect}>
        <select id='sort' ref={select}>
          {state.availableSorts.map((sort) => (
            <option key={sort.id} value={sort.id}>
              {sort.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortDropdown;
