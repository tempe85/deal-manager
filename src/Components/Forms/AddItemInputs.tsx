import React from "react";
import { AddFormTypes } from "../../Enums";
import CustomerInputs from "./CustomerInputs";
import DealInputs from "./DealInputs";
import CustomerRestaurantTransactionInputs from "./CustomerRestaurantTransactionInputs";
import LocationDealInputs from "./LocationDealInputs";
import RestaurantChainInputs from "./RestaurantChainInputs";
import RestaurantChainLocationInputs from "./RestaurantChainLocationInputs";

interface IProps {
  type: AddFormTypes;
  onConfigUpdated: (propName: string, value: number | string | Date) => void;
}
function AddItemInputs({ type, onConfigUpdated }: IProps) {
  switch (type) {
    case AddFormTypes.customer:
      return <CustomerInputs onConfigUpdated={onConfigUpdated} />;
    case AddFormTypes.deal:
      return <DealInputs onConfigUpdated={onConfigUpdated} />;
    case AddFormTypes.customerRestaurantTransaction:
      return (
        <CustomerRestaurantTransactionInputs
          onConfigUpdated={onConfigUpdated}
        />
      );
    case AddFormTypes.locationDeal:
      return <LocationDealInputs onConfigUpdated={onConfigUpdated} />;
    case AddFormTypes.restaurantChain:
      return <RestaurantChainInputs onConfigUpdated={onConfigUpdated} />;
    case AddFormTypes.restaurantChainLocation:
      return (
        <RestaurantChainLocationInputs onConfigUpdated={onConfigUpdated} />
      );
    default:
      console.warn(`Invalid form type ${type}.`);
      return null;
  }
}

export default AddItemInputs;
