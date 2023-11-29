export interface Product {
  id: string;
  title: string;
  price: number, // precio
  installments?: {
    quantity: number; // cuotas
    amount: number;
  };
  address: {
    state_name: string; //lugar
    city_name: string;
  };
  picture: string; 
  condition: string;
  free_shipping: boolean;
  thumbnail: string; //foto
  shipping: {
    logistic_type: string; // === 'fulfillment'
  },
  currency_id: string;
}