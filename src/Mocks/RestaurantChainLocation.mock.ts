import { IRestaurantChainLocation } from "../Interfaces";
import { ChainNameList } from "./Helpers/ChainNameList";
import { cityNames } from "./Helpers/CityNames";
import { GenerateRandomNDigitNumber } from "../Utils";

export const RestaurantChainLocationMock = ChainNameList.map(
  (value: string, index: number) => {
    return {
      chain_location_id: 1000 + index,
      discount_card_number: GenerateRandomNDigitNumber(5),
      deal_id: GenerateRandomNDigitNumber(4),
      chain_name: value,
      city: `${cityNames[index]}`,
      state: "WA",
    };
  }
) as IRestaurantChainLocation[];
