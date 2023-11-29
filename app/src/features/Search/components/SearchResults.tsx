import * as React from 'react';
import { useEffect } from 'react';
import { useAppState } from '../../../context/AppContext';
import { Product } from '../../../types/product';
import styles from '../styles/searchResults.module.scss';
import Image from 'next/image'
import { formatProductPrice } from '@/src/utils/priceUtils';
import { shippingIcon } from '../constants/texts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

const SearchResults: React.FC = () => {
  const { state, dispatch } = useAppState();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://api.mercadolibre.com/sites/MLA/search?q=${state.searchQuery}&limit=10`
        );
        const data = await response.json();
        dispatch({ type: 'SET_PRODUCTS', payload: data.results });
        data.results.map((product: Product) => {
          console.log(product)
        })
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (state.searchQuery) {
      fetchSearchResults();
    }
  }, [state.searchQuery, dispatch]);

  return (
    <div className={styles.searchResultsContainer}>
      <ul className={styles.searchResultsList}>
        {state.products.map((product: Product) => (
          <li key={product.id} className={styles.searchResultsLiElement}>
            <a href="product_link">
              <article className={styles.productItem}>
                <div className={styles.column}>
                  <Image quality='100' className={styles.productImg} src={product.thumbnail} alt={product.title} width={160} height={160} />
                  <div className={styles.productInfo}>
                    <p>
                      $<data value={product.price}>
                        {formatProductPrice(product.price, product.currency_id)}
                      </data>
                      {product.shipping.logistic_type === shippingIcon && 
                        <span className={styles.productShippingIcon}>
                          <FontAwesomeIcon icon={faTruck} />
                        </span>
                      }
                    </p>
                    <h2>{product.title}</h2>
                    {product.installments && 
                      <p className={styles.productInstallments}>En {product.installments.quantity} cuotas de 
                      ${formatProductPrice(product.installments.amount, product.currency_id)}
                      </p>
                    }
                  </div>
                </div>
                <p className={styles.productLocation}>
                  {product.address.state_name}
                </p>
              </article>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
