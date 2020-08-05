import React from "react";
import { FormGroup, Label } from "reactstrap";
import { ILocationDeal } from "../../Interfaces";
import DealDropdown from "../Dropdowns/DealDropdown";
import { GetDealSelectionsAsync } from "../Selections/Selections";
import ChainLocationDropDown from "../Dropdowns/ChainLocationDropdown";

interface IProps {
  onConfigUpdated: (propName: string, value: number | string | Date) => void;
  data?: any;
}

const LocationDealInputs = ({ onConfigUpdated, data }: IProps) => {
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
        <DealDropdown
          onChange={(returnValue) => onInputUpdated("deal_id", +returnValue)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="chainLocationId">Chain Location Id</Label>
        <ChainLocationDropDown
          onChange={(returnValue) =>
            onInputUpdated("chain_location_id", +returnValue)
          }
        />
      </FormGroup>
    </>
  );
};

export default LocationDealInputs;
