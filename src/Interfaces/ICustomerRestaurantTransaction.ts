export interface ICustomerRestaurantTransaction {
  transaction_id: number;
  discount_card_number: number;
  chain_location_id: number;
  deal_id: number;
  last_name: string;
  first_name: string;
  chain_name: string;
  city: string;
  state: string;
  percent_discount: number;
  date: string;
}
