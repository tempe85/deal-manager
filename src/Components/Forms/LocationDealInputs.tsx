import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { ILocationDeal } from "../../Interfaces";

interface IProps {
  onConfigUpdated: (propName: string, value: number | string | Date) => void;
}

const LocationDealInputs = ({ onConfigUpdated }: IProps) => {
  const onInputUpdated = (
    inputName: keyof ILocationDeal,
    value: number | string | Date
  ) => {
    onConfigUpdated(inputName, value);
  };
  return (
    <>
      <FormGroup>
        <Label for="dealId">Deal Id</Label>
        <Input
          type="number"
          name="dealId"
          id="dealId"
          placeholder="E.g. 1, 2, 3..."
          onChange={(event) => onInputUpdated("dealId", +event.target.value)}
        />
      </FormGroup>
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
    </>
  );
};

export default LocationDealInputs;
