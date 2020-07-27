import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { IRestaurantChainLocation } from "../../Interfaces";
import ChainsDropdown from "../Dropdowns/ChainsDropdown";
import { ChainSelections } from "../Selections/Selections";

interface IProps {
  onConfigUpdated: (propName: string, value: number | string | Date) => void;
  data: any;
}

const RestaurantChainLocationInputs = ({ onConfigUpdated, data }: IProps) => {
  const onInputUpdated = (
    inputName: keyof IRestaurantChainLocation,
    value: number | string | Date
  ) => {
    onConfigUpdated(inputName, value);
  };

  const [locationData, setLocationData] = useState<
    IRestaurantChainLocation | undefined
  >(undefined);
  useEffect(() => {
    if (data) {
      setLocationData(data);
      onConfigUpdated("chainLocationId", data?.chainLocationId!);
    }
  }, [data]);

  return (
    <>
      <FormGroup>
        {data && (
          <Label for="chainLocationId">
            Chain Location Id: {locationData?.chainLocationId}
          </Label>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="chainName">Restaurant Chain Name</Label>
        <ChainsDropdown
          onChange={(returnValue) => onInputUpdated("chainName", returnValue)}
          defaultValue={
            data
              ? ChainSelections().filter((p) => p.value === data?.chainName)[0]
              : undefined
          }
        />
      </FormGroup>
      <FormGroup>
        <Label for="cityState">City</Label>
        <Input
          type="text"
          name="cityState"
          id="cityState"
          defaultValue={locationData?.city}
          placeholder="Add City Name"
          onChange={(event) => onInputUpdated("city", event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="cityState">State</Label>
        <Input
          type="text"
          name="cityState"
          id="cityState"
          defaultValue={locationData?.state}
          placeholder="Add a State (e.g. WA)"
          onChange={(event) => onInputUpdated("state", event.target.value)}
        />
      </FormGroup>
    </>
  );
};

export default RestaurantChainLocationInputs;
