import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

interface IProps {
  onConfigUpdated: (value: { [key: string]: string }) => void;
}

const RestaurantChainInputs = ({ onConfigUpdated }: IProps) => {
  const onInputUpdated = (value: { [key: string]: string }) => {
    onConfigUpdated(value);
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
          onChange={(event) =>
            onInputUpdated({ chain_name: event.target.value })
          }
        />
      </FormGroup>
    </>
  );
};

export default RestaurantChainInputs;
