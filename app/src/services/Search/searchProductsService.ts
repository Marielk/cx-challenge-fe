import { ProductRequestResponse, productRequestFilters } from "../../types/productRequest";

export class SearchProductsServices {
  // To Do: dejar la url en una variable de ambiente 
  static baseURL: string = 'https://api.mercadolibre.com/sites/MLA/search';

  static async productsRequest(query: string): Promise<ProductRequestResponse> {
    const endpoint = `${this.baseURL}?q=${query}&limit=10`;
    const config = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    const response = await fetch(endpoint, config);
    const data = await response.json();
    if (data) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(response.status);
    }
  }
  static async productsRequestFiltered(filters: productRequestFilters): Promise<ProductRequestResponse> {
    const defaultRange = this.preventDefaultRange(filters);
    const filterRange = defaultRange ? '' : `&price=${filters.priceRange.min}-${filters.priceRange.max}`;
    const filtersFormated = `q=${filters.searchQuery}&sort=${filters.sort}${filterRange}`
    const endpoint = `${this.baseURL}?${filtersFormated}&limit=10`;
    const config = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    };
    const response = await fetch(endpoint, config);
    const data = await response.json();
    if (data) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(response.status);
    }
  }

  private static preventDefaultRange = (filters: productRequestFilters) => {
    if(filters.priceRange.min === 0 && filters.priceRange.max === 0) {
      return true;
    } else { return false }
  }
}