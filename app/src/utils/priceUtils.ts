import { Product } from '../types/product';

export const formatProductPrice = (price: number, currency: string): string => {
  return price.toLocaleString('es-ES', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
