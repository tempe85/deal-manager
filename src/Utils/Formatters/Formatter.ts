import {
  ICustomerRestaurantTransaction,
  ILocationDeal,
} from "../../Interfaces";
import { RestaurantChainLocationMock, DealMockList } from "../../Mocks";

export const FormatterChainName = (
  cell: any,
  row: ICustomerRestaurantTransaction | ILocationDeal
) => {
  const chainLocationEntry = RestaurantChainLocationMock.filter(
    (p) => p.chain_location_id === row.chain_location_id
  )[0];
  return chainLocationEntry.chain_name;
};
export const FormatterCity = (
  cell: any,
  row: ICustomerRestaurantTransaction | ILocationDeal
) => {
  const chainLocationEntry = RestaurantChainLocationMock.filter(
    (p) => p.chain_location_id === row.chain_location_id
  )[0];
  return chainLocationEntry.city;
};
export const FormatterState = (
  cell: any,
  row: ICustomerRestaurantTransaction | ILocationDeal
) => {
  const chainLocationEntry = RestaurantChainLocationMock.filter(
    (p) => p.chain_location_id === row.chain_location_id
  )[0];
  return chainLocationEntry.state;
};

export const FormatterDeal = (
  cell: any,
  row: ICustomerRestaurantTransaction | ILocationDeal
) => {
  const entry = DealMockList.filter((p) => p.deal_id === row.deal_id)[0];
  return `${entry.percent_discount}%`;
};
