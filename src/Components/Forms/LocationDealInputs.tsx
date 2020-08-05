import React from "react";
import { FormGroup, Label, Button } from "reactstrap";
import DealDropdown from "../Dropdowns/DealDropdown";
import ChainLocationDropDown from "../Dropdowns/ChainLocationDropdown";

interface IProps {
  onConfigUpdated: (value: { [key: string]: number }) => void;
  data?: any;
  toggleModal: () => void;
  onFormSubmit: (event: any) => void;
}

const LocationDealInputs = ({
  onFormSubmit,
  toggleModal,
  onConfigUpdated,
  data,
}: IProps) => {
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
      <hr />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={toggleModal}>Cancel</Button>
        <Button color="primary" onClick={onFormSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default LocationDealInputs;
