import { AppState } from './context';
import { Product } from './product';

export interface productRequestFilters {
  searchQuery: string, 
  sort: string, 
  priceRange: AppState['priceRange']
}

export interface ProductRequestResponse {
  'site_id': string,
  'country_default_time_zone': 'GMT-03:00',
  'query': string,
  'paging': {},
  'results': Product[],
  'sort': { id: string; name: string },
  'available_sorts': AppState['availableSorts'],
  'filters': [
    {
      'id': string,
      'name': string,
      'type': string,
      'values': [
        {
          'id': string,
          'name': string
        }
      ]
    }
  ],
  'available_filters': [
    {
      'id': string,
      'name': string,
      'type': string,
      'values': [
        {
          'id': string,
          'name': string,
          'results': number
        }
      ]
    }
  ],
  'pads_info': {}
}