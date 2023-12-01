import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/priceFilter.module.scss';
import { useAppState } from '../../../context/AppContext';
import { productRequestFilters } from '@/src/types/productRequest';
import { SearchProductsController } from '../../../services/Search/searchProductsController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const PriceFilter: React.FC = () => {
  const inputMinPrice = useRef<HTMLInputElement>(null);
  const inputMaxPrice = useRef<HTMLInputElement>(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const { state, dispatch } = useAppState();
  
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(parseInt(e.target.value, 10));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(parseInt(e.target.value, 10));
  };

  const applyPriceFilter = () => {
    if(minPrice === 0 && maxPrice === 0) return
    const filters: productRequestFilters = {
      searchQuery: state.searchQuery,
      sort:  state.sort,
      priceRange: { min: minPrice, max: maxPrice }
    }
    dispatch({ type: 'SET_PRICE_RANGE', payload: { min: minPrice, max: maxPrice } });
    SearchProductsController.getProductsWithFilters(filters, dispatch)
  };

  const selectRange = (range: string) => {
    const selectedRange = range.split('-');
    const min = selectedRange[0] === '*' ? 0 : Number(selectedRange[0]);
    setMinPrice(min);
    setMaxPrice(Number(selectedRange[1]));
  }

  useEffect(() => {
    if(maxPrice > 0 || minPrice > 0) {
      applyPriceFilter();
    }
  }, [maxPrice, minPrice]);

  return (
    <div className={styles.priceFilterContainer}>
      {state.products.length > 0 && 
        <>
          <div className={styles.titleRow}>
            <h2>Precio</h2>
          </div>
          <div className={styles.rangesAvailables}>
          {state.availablePricesRanges.map((range) => (
            <p key={range.id} onClick={() => selectRange(range.id)}>
              {range.name}
              <span>({range.results})</span>
            </p>
          ))}
          </div>
          <div className={styles.inputs}>
            <input type="number" id="minPrice" ref={inputMinPrice} onChange={handleMinPriceChange} placeholder='Mínimo'/>
            <span>-</span>
            <input type="number" id="maxPrice" ref={inputMaxPrice} onChange={handleMaxPriceChange} placeholder='Máximo'/>
            <button onClick={applyPriceFilter}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </>
      }
    </div>
  );
}
 
export default PriceFilter;