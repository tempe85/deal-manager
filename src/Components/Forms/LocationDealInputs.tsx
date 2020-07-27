import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { ILocationDeal } from "../../Interfaces";
import DealDropdown from "../Dropdowns/DealDropdown";
import {
  DealSelections,
  ChainLocationSelections,
} from "../Selections/Selections";
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
          onChange={(returnValue) => onInputUpdated("dealId", +returnValue)}
          defaultValue={
            data
              ? DealSelections().filter(
                  (p) => p.value === data?.dealId.toString()
                )[0]
              : undefined
          }
        />
      </FormGroup>
      <FormGroup>
        <Label for="chainLocationId">Chain Location Id</Label>
        <ChainLocationDropDown
          onChange={(returnValue) =>
            onInputUpdated("chainLocationId", +returnValue)
          }
          defaultValue={
            data
              ? ChainLocationSelections().filter(
                  (p) => p.value === data?.chainLocationId.toString()
                )[0]
              : undefined
          }
        />
      </FormGroup>
    </>
  );
};

export default LocationDealInputs;
