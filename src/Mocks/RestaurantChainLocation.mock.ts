import { IRestaurantChainLocation } from "../Interfaces";
import { ChainNameList } from "./Helpers/ChainNameList";
import { cityNames } from "./Helpers/CityNames";
import { GenerateRandomNDigitNumber } from "../Utils";

export const RestaurantChainLocationMock = ChainNameList.map(
  (value: string, index: number) => {
    return {
      chainLocationId: 1000 + index,
      discountCardNumber: GenerateRandomNDigitNumber(5),
      dealId: GenerateRandomNDigitNumber(4),
      chainName: value,
      city: `${cityNames[index]}`,
      state: "WA",
    };
  }
) as IRestaurantChainLocation[];
