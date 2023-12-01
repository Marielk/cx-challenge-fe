import React, { useRef } from 'react';
import Image from 'next/image'
import { useAppState } from '../../../context/AppContext';
import { searchTexts } from '../constants/texts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/searchBar.module.scss'
import { SearchProductsController } from '../../../services/Search/searchProductsController';

const SearchBar: React.FC = () => {
  const searchInput = useRef<HTMLInputElement>(null);
  const { dispatch } = useAppState();

  const handleSearch = () => {
    const inputValue = searchInput.current?.value
    if(!inputValue) return 
    dispatch({ type: 'SET_SEARCH_QUERY', payload: inputValue });
    SearchProductsController.getProducts(inputValue, dispatch)
  };

  return (
    <div className={styles.searchBarContainer}>
      <Image quality='100' src='/logo_ml.png' alt='logo mercadolibre' width={42} height={28}/>
      <input className={styles.searchBarInput} type='text' placeholder={searchTexts.placeholder} onChange={handleSearch} ref={searchInput}/>
      <button className={styles.searchBarButton} onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default SearchBar;
