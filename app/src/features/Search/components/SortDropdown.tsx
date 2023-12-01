import React, { useEffect, useRef } from 'react';
import { useAppState } from '../../../context/AppContext';
import styles from '../styles/sortDropdown.module.scss';
import { searchTexts } from '../constants/texts';
import { closeAllSelect, createCustomSelect, selectOption } from './customSelect';
import { productRequestFilters } from '@/src/types/productRequest';
import { SearchProductsController } from '../../../services/Search/searchProductsController';

const SortDropdown: React.FC = () => {
  const { state, dispatch } = useAppState();
  const select = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    state.availableSorts && startCustomSelect();
    document.addEventListener('click', () => {closeAllSelect(null)})
    return(() => {
      document.removeEventListener('click', () => {closeAllSelect(null)})
    })
  }, [state.availableSorts]);

  const startCustomSelect = () => {
    if(select.current) {
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
    const filters: productRequestFilters = {
      searchQuery: state.searchQuery,
      sort:  sortedOptionSelected,
      priceRange: state.priceRange
    }
    SearchProductsController.getProductsWithFilters(filters, dispatch)
  }

  return (
    <div className={styles.sortDropdownContainer}>
      {state.products.length > 0 && 
        <>
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
        </>
      }
    </div>
  );
};

export default SortDropdown;
