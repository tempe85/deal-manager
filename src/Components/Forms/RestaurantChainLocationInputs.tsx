import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { IRestaurantChainLocation } from "../../Interfaces";

interface IProps {
  onConfigUpdated: (propName: string, value: number | string | Date) => void;
}

const RestaurantChainLocationInputs = ({ onConfigUpdated }: IProps) => {
  const onInputUpdated = (
    inputName: keyof IRestaurantChainLocation,
    value: number | string | Date
  ) => {
    onConfigUpdated(inputName, value);
  };
  return (
    <>
      <FormGroup>
        <Label for="chainLocationId">Chain Location Id</Label>
        <Input
          type="number"
          name="chainLocationId"
          id="chainLocationId"
          placeholder="E.g. 1, 2, 3..."
          onChange={(event) =>
            onInputUpdated("chainLocationId", +event.target.value)
          }
        />
      </FormGroup>
      <FormGroup>
        <Label for="chainName">Restaurant Chain Name</Label>
        <Input
          type="text"
          name="chainName"
          id="chainName"
          placeholder="Add Restaurant Chain Name"
          onChange={(event) => onInputUpdated("chainName", event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="cityState">City State Name</Label>
        <Input
          type="text"
          name="cityState"
          id="cityState"
          placeholder="Add City and State (e.g. Pullman, WA)"
          onChange={(event) =>
            onInputUpdated("cityStateName", event.target.value)
          }
        />
      </FormGroup>
    </>
  );
};

export default RestaurantChainLocationInputs;
