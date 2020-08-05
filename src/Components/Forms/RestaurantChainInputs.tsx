import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { IRestaurantChain } from "../../Interfaces";

interface IProps {
  onConfigUpdated: (propName: string, value: number | string | Date) => void;
}

const RestaurantChainInputs = ({ onConfigUpdated }: IProps) => {
  const onInputUpdated = (
    inputName: keyof IRestaurantChain,
    value: number | string | Date
  ) => {
    onConfigUpdated(inputName, value);
  };
  return (
    <>
      <FormGroup>
        <Label for="restaurantChain">Restaurant Chain Name</Label>
        <Input
          type="text"
          name="restaurantChain"
          id="restaurantChain"
          placeholder="Add Restaurant Chain Name"
          onChange={(event) => onInputUpdated("chain_name", event.target.value)}
        />
      </FormGroup>
    </>
  );
};

export default RestaurantChainInputs;
