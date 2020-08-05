import { IRestaurantChain } from "../Interfaces";
import { ChainNameList } from "./Helpers/ChainNameList";

export const ChainMockList = ChainNameList.map((name: string) => {
  return {
    chain_name: name,
  };
}) as IRestaurantChain[];
