import { sortTypes } from '../features/Search/constants/sortTypes';
import { Product } from '../types/product';

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
