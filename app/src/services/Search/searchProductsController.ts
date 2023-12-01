import * as React from 'react';
import { AppAction } from "../../types/context";
import { SearchProductsServices } from "./searchProductsService";
import { ProductRequestResponse, productRequestFilters } from "../../types/productRequest";
import { findPricerangeFilter, getPriceRangesDefault, sortProducts } from '../../utils/priceUtils';

export class SearchProductsController {

  public static async getProducts(query: string, dispatch: React.Dispatch<AppAction>) {
    SearchProductsServices.productsRequest(query).then((data) => {
      this.saveProductsToState(data, dispatch)
    })
    .catch((error: Error) => {
      this.showErrorToast(error.message);
    });
  }

  public static async getProductsWithFilters(filters: productRequestFilters, dispatch: React.Dispatch<AppAction>) {
    SearchProductsServices.productsRequestFiltered(filters).then((data) => {
      this.saveProductsToState(data, dispatch)
    })
    .catch((error: Error) => {
      this.showErrorToast(error.message);
    });
  }

  private static saveProductsToState = (data: ProductRequestResponse, dispatch: React.Dispatch<AppAction>) => {
    const sortedProductsByDefault = sortProducts(data.available_sorts[0].id, data.results)
    dispatch({ type: 'SET_PRODUCTS', payload: sortedProductsByDefault });
    dispatch({type: 'SET_AVAILABLE_SORTS', payload: data.available_sorts})
    dispatch({type: 'SET_SORT', payload: data.available_sorts[0].id})
    this.checkForFilters(data, dispatch);
  };
  
  private static checkForFilters = (data: ProductRequestResponse, dispatch: React.Dispatch<AppAction>) => {
    const pricesRangesAvailables = findPricerangeFilter(data.available_filters)
    if(!pricesRangesAvailables) return;
    const priceRange = getPriceRangesDefault(pricesRangesAvailables.values)
    dispatch({type: 'SET_AVAILABLE_PRICES_RANGES', payload: pricesRangesAvailables.values})
    dispatch({type: 'SET_PRICE_RANGE', payload: priceRange })
  }

  public static showErrorToast(error?: string) {
    const message = error ? error : 'default error message';
    // encontrar librería de toast
  }
}
