import { sortTypes } from '../features/Search/constants/sortTypes';
import { AppState } from '../types/context';
import { Product } from '../types/product';
import { ProductRequestResponse } from '../types/productRequest';

export const formatProductPrice = (price: number, currency: string): string => {
  return price.toLocaleString('es-ES', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const sortProducts= (sort: string, products: Product[]) => {
  switch (sort) {
    case sortTypes.priceAsc:
      return [...products].sort(comparePrices);

    case sortTypes.priceDesc:
      return [...products].sort((a, b) => comparePrices(b, a));

    // Add more order cases...

    default:
      return products;
  }
}

export const comparePrices = (a: Product, b: Product) => {
  return a.price - b.price;
};

export const getPriceRangesDefault = (values: AppState['availablePricesRanges']) => {
  if(!values) return { min:0, max:0 };
  const defaultRange = values[0].id.split('-')
  return { min: Number(defaultRange[0]), max: Number(defaultRange[1]) }
}

export const findPricerangeFilter = (filters: ProductRequestResponse['available_filters']) => {
  const findPriceRangeFilter = filters.find(filter => {
    if(filter.id === 'price') { return filter } 
  });
  return findPriceRangeFilter;
}
