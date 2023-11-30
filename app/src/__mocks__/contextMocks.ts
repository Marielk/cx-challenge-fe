import { Product } from '@/src/types/product';
import { actionTypes } from '../features/Search/constants/actions';

export let initialStateMock = { 
  searchQuery: '', 
  products: []  as Array<Product>,
  sort: '',
  availableSorts: []
};

export const availableSortsMock = [
  {
    'id': 'price_asc',
    'name': 'Menor precio'
  },
  {
    'id': 'price_desc',
    'name': 'Mayor precio'
  }
]

export const dispatchMock = (args:{type: string, payload: Array<Product> | string | any}) => {
  if(args.type === actionTypes.setSearch && typeof(args.payload) === 'string') {
    return initialStateMock.searchQuery = args.payload
  }
  if(args.type === actionTypes.setProducts && typeof(args.payload) !== 'string') {
    initialStateMock.products = args.payload
  }
  if(args.type === actionTypes.setSort && typeof(args.payload) === 'string') {
    return initialStateMock.sort = args.payload
  }
  if(args.type === actionTypes.setAvailableSorts && typeof(args.payload) !== 'string') {
    return initialStateMock.availableSorts = args.payload
  }
}