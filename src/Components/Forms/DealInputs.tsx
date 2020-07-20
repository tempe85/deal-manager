import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { IDeal } from "../../Interfaces";

interface IProps {
  onConfigUpdated: (propName: string, value: number | string | Date) => void;
}

const DealInputs = ({ onConfigUpdated }: IProps) => {
  const onInputUpdated = (
    inputName: keyof IDeal,
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
        <Label for="percentDiscount">Percent Discount</Label>
        <Input
          type="number"
          name="percentDiscount"
          id="percentDiscount"
          placeholder="E.g. 1, 2, 3..."
          onChange={(event) =>
            onInputUpdated("percentDiscount", +event.target.value)
          }
        />
      </FormGroup>
    </>
  );
};

export default DealInputs;
