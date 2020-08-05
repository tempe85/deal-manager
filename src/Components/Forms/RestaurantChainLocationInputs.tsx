import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { IRestaurantChainLocation } from "../../Interfaces";
import ChainsDropdown from "../Dropdowns/ChainsDropdown";

interface IProps {
  onConfigUpdated: (value: Partial<IRestaurantChainLocation>) => void;
  data: any;
}

const RestaurantChainLocationInputs = ({ onConfigUpdated, data }: IProps) => {
  const onInputUpdated = (value: {}) => {
    onConfigUpdated(value);
  };

  const [locationData, setLocationData] = useState<
    IRestaurantChainLocation | undefined
  >(undefined);
  useEffect(() => {
    if (data) {
      setLocationData(data);
      onConfigUpdated({ chain_location_id: data?.chain_location_id });
    }
  }, [data]);

  return (
    <>
      <FormGroup>
        {data && (
          <Label for="chainLocationId">
            Chain Location Id: {locationData?.chain_location_id}
          </Label>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="chainName">Restaurant Chain Name</Label>
        <ChainsDropdown
          onChange={(returnValue) => onInputUpdated(returnValue)}
          defaultValue={data?.chain_name}
        />
      </FormGroup>
      <FormGroup>
        <Label for="city">City</Label>
        <Input
          type="text"
          name="city"
          id="city"
          defaultValue={locationData?.city}
          placeholder="Add City Name"
          onChange={(event) => onInputUpdated({ city: event.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label for="state">State</Label>
        <Input
          type="text"
          name="state"
          id="state"
          defaultValue={locationData?.state}
          placeholder="Add a State (e.g. WA)"
          onChange={(event) => onInputUpdated({ state: event.target.value })}
        />
      </FormGroup>
    </>
  );
};

export default RestaurantChainLocationInputs;
