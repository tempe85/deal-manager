import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { IDeal } from "../../Interfaces";

interface IProps {
  onConfigUpdated: (propName: string, value: number | string | Date) => void;
  data?: any;
}

const DealInputs = ({ onConfigUpdated, data }: IProps) => {
  const onInputUpdated = (
    inputName: keyof IDeal,
    value: number | string | Date
  ) => {
    onConfigUpdated(inputName, value);
  };
  const [dealData, setDealData] = useState<IDeal | undefined>(undefined);
  useEffect(() => {
    if (data) {
      setDealData(data);
      onConfigUpdated("dealId", data?.dealId!);
    }
  }, [data]);
  return (
    <>
      <FormGroup>
        {data && <Label for="discountCard">Deal Id: {dealData?.dealId}</Label>}
      </FormGroup>
      <FormGroup>
        <Label for="percentDiscount">Percent Discount</Label>
        <Input
          type="number"
          name="percentDiscount"
          id="percentDiscount"
          placeholder="E.g. 1, 2, 3..."
          defaultValue={dealData?.percentDiscount || ""}
          onChange={(event) =>
            onInputUpdated("percentDiscount", +event.target.value)
          }
        />
      </FormGroup>
    </>
  );
};

export default DealInputs;
