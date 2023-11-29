import { Product } from '@/src/types/product';
import { actionTypes } from './constants';

export let initialStateMock = { searchQuery: '', products: []  as Array<Product> };

export const dispatchMock = (args:{type: string, payload: Array<Product> | string}) => {
  if(args.type === actionTypes.setSearch && typeof(args.payload) === 'string') {
    return initialStateMock.searchQuery = args.payload
  }
  if(args.type === actionTypes.setProducts && typeof(args.payload) !== 'string') {
    initialStateMock.products = args.payload
  }
}