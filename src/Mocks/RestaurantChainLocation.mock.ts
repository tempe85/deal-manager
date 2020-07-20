import { IRestaurantChainLocation } from "../Interfaces";
import { ChainNameList } from "./Helpers/ChainNameList";
import { cityNames } from "./Helpers/CityStateNames";
import { GenerateRandomNDigitNumber } from "../Utils";

export const RestaurantChainLocationMock = ChainNameList.map(
  (value: string, index: number) => {
    return {
      chainLocationId: 1000 + index,
      discountCardNumber: GenerateRandomNDigitNumber(5),
      dealId: GenerateRandomNDigitNumber(4),
      chainName: value,
      cityStateName: `${cityNames[index]}, WA`,
      
    };
  }
) as IRestaurantChainLocation[];
