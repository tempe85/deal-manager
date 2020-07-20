import { IRestaurantChain } from "../Interfaces";
import { ChainNameList } from "./Helpers/ChainNameList";

export const ChainMockList = ChainNameList.map((name: string) => {
  return {
    chainName: name,
  };
}) as IRestaurantChain[];
