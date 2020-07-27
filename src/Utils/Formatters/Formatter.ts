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
    (p) => p.chainLocationId === row.chainLocationId
  )[0];
  return chainLocationEntry.chainName;
};
export const FormatterCity = (
  cell: any,
  row: ICustomerRestaurantTransaction | ILocationDeal
) => {
  const chainLocationEntry = RestaurantChainLocationMock.filter(
    (p) => p.chainLocationId === row.chainLocationId
  )[0];
  return chainLocationEntry.city;
};
export const FormatterState = (
  cell: any,
  row: ICustomerRestaurantTransaction | ILocationDeal
) => {
  const chainLocationEntry = RestaurantChainLocationMock.filter(
    (p) => p.chainLocationId === row.chainLocationId
  )[0];
  return chainLocationEntry.state;
};

export const FormatterDeal = (
  cell: any,
  row: ICustomerRestaurantTransaction | ILocationDeal
) => {
  const entry = DealMockList.filter((p) => p.dealId === row.dealId)[0];
  return `${entry.percentDiscount}%`;
};
