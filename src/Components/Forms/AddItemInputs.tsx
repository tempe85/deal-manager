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
  onConfigUpdated: (value: {}) => void;
  toggleModal: () => void;
  onFormSubmit: (event: any) => void;
  data?: any;
}
function AddItemInputs({
  type,
  toggleModal,
  onFormSubmit,
  onConfigUpdated,
  data,
}: IProps) {
  switch (type) {
    case AddFormTypes.customer:
      return (
        <CustomerInputs
          toggleModal={toggleModal}
          onFormSubmit={onFormSubmit}
          onConfigUpdated={onConfigUpdated}
          data={data}
        />
      );
    case AddFormTypes.deal:
      return (
        <DealInputs
          onFormSubmit={onFormSubmit}
          toggleModal={toggleModal}
          onConfigUpdated={onConfigUpdated}
          data={data}
        />
      );
    case AddFormTypes.customerRestaurantTransaction:
      return (
        <CustomerRestaurantTransactionInputs
          onConfigUpdated={onConfigUpdated}
          data={data}
          onFormSubmit={onFormSubmit}
          toggleModal={toggleModal}
        />
      );
    case AddFormTypes.locationDeal:
      return (
        <LocationDealInputs
          onFormSubmit={onFormSubmit}
          toggleModal={toggleModal}
          onConfigUpdated={onConfigUpdated}
          data={data}
        />
      );
    case AddFormTypes.restaurantChain:
      return (
        <RestaurantChainInputs
          onFormSubmit={onFormSubmit}
          toggleModal={toggleModal}
          onConfigUpdated={onConfigUpdated}
        />
      );
    case AddFormTypes.restaurantChainLocation:
      return (
        <RestaurantChainLocationInputs
          onConfigUpdated={onConfigUpdated}
          data={data}
          onFormSubmit={onFormSubmit}
          toggleModal={toggleModal}
        />
      );
    default:
      console.warn(`Invalid form type ${type}.`);
      return null;
  }
}

export default AddItemInputs;
