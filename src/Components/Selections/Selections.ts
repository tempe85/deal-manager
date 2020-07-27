import {
  CustomerMockList,
  RestaurantChainLocationMock,
  DealMockList,
  ChainMockList,
} from "../../Mocks";
import { ISelect } from "../../Interfaces/ISelect";

export const CustomerSelections = (): ISelect[] => {
  let selections: ISelect[] = [];
  CustomerMockList.forEach((p) => {
    selections.push({
      value: p.discountCardNumber.toString(),
      label: `${p.discountCardNumber}: ${p.lastName}, ${p.firstName}`,
    });
  });
  return selections;
};

export const ChainLocationSelections = (): ISelect[] => {
  let selections: ISelect[] = [];
  RestaurantChainLocationMock.forEach((p) => {
    selections.push({
      value: p.chainLocationId.toString(),
      label: `${p.chainLocationId}: ${p.chainName} ${p.city}, ${p.state}`,
    });
  });
  return selections;
};

export const DealSelections = (): ISelect[] => {
  let selections: ISelect[] = [];
  DealMockList.forEach((p) => {
    selections.push({
      value: p.dealId.toString(),
      label: `${p.dealId}: ${p.percentDiscount}%`,
    });
  });
  return selections;
};

export const ChainSelections = (): ISelect[] => {
  let selections: ISelect[] = [];
  ChainMockList.forEach((p) => {
    selections.push({
      value: p.chainName,
      label: p.chainName,
    });
  });
  return selections;
};
