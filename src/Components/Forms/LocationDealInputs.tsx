import React from "react";
import { FormGroup, Label } from "reactstrap";
import DealDropdown from "../Dropdowns/DealDropdown";
import ChainLocationDropDown from "../Dropdowns/ChainLocationDropdown";

interface IProps {
  onConfigUpdated: (value: { [key: string]: number }) => void;
  data?: any;
}

const LocationDealInputs = ({ onConfigUpdated, data }: IProps) => {
  const onInputUpdated = (value: { [key: string]: number }) => {
    onConfigUpdated(value);
  };

  return (
    <>
      <FormGroup>
        <Label for="dealId">Deal Id</Label>
        <DealDropdown onChange={(returnValue) => onInputUpdated(returnValue)} />
      </FormGroup>
      <FormGroup>
        <Label for="chainLocationId">Chain Location Id</Label>
        <ChainLocationDropDown
          onChange={(returnValue) => onInputUpdated(returnValue)}
        />
      </FormGroup>
    </>
  );
};

export default LocationDealInputs;
