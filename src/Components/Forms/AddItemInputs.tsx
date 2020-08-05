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
  onConfigUpdated: (propName: string, value: {}) => void;
  data?: any;
}
function AddItemInputs({ type, onConfigUpdated, data }: IProps) {
  switch (type) {
    case AddFormTypes.customer:
      return <CustomerInputs onConfigUpdated={onConfigUpdated} data={data} />;
    case AddFormTypes.deal:
      return <DealInputs onConfigUpdated={onConfigUpdated} data={data} />;
    case AddFormTypes.customerRestaurantTransaction:
      return (
        <CustomerRestaurantTransactionInputs
          onConfigUpdated={onConfigUpdated}
          data={data}
        />
      );
    case AddFormTypes.locationDeal:
      return (
        <LocationDealInputs onConfigUpdated={onConfigUpdated} data={data} />
      );
    case AddFormTypes.restaurantChain:
      return <RestaurantChainInputs onConfigUpdated={onConfigUpdated} />;
    case AddFormTypes.restaurantChainLocation:
      return (
        <RestaurantChainLocationInputs
          onConfigUpdated={onConfigUpdated}
          data={data}
        />
      );
    default:
      console.warn(`Invalid form type ${type}.`);
      return null;
  }
}

export default AddItemInputs;
