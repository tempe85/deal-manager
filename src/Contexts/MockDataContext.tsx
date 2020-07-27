import React from "react";
import {
  CustomerMockList,
  DealMockList,
  CustomerRestaurantTransactionMock,
  ChainMockList,
  RestaurantChainLocationMock,
  LocationDealsMock,
} from "../Mocks";

export const MockDataContext = React.createContext({
  CustomerData: CustomerMockList,
  DealData: DealMockList,
  TransactionData: CustomerRestaurantTransactionMock,
  ChainData: ChainMockList,
  ChainLocationData: RestaurantChainLocationMock,
  LocationDealData: LocationDealsMock,
});

export const MockDataProvider = MockDataContext.Provider;
export const MockDataConsumer = MockDataContext.Consumer;
