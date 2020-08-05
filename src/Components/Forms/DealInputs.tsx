import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { IDeal } from "../../Interfaces";

interface IProps {
  onConfigUpdated: (value: { [key: string]: number }) => void;
  data?: any;
  toggleModal: () => void;
  onFormSubmit: (event: any) => void;
}

const DealInputs = ({
  onConfigUpdated,
  toggleModal,
  onFormSubmit,
  data,
}: IProps) => {
  const onInputUpdated = (value: { [key: string]: number }) => {
    onConfigUpdated(value);
  };
  const [dealData, setDealData] = useState<IDeal | undefined>(undefined);
  useEffect(() => {
    if (data) {
      setDealData(data);
      onConfigUpdated({ deal_id: data?.deal_id });
    }
  }, [data]);

  return (
    <>
      <FormGroup>
        {data && <Label for="discountCard">Deal Id: {dealData?.deal_id}</Label>}
      </FormGroup>
      <FormGroup>
        <Label for="percentDiscount">Percent Discount</Label>
        <Input
          type="number"
          name="percentDiscount"
          id="percentDiscount"
          placeholder="E.g. 1, 2, 3..."
          defaultValue={dealData?.percent_discount || ""}
          onChange={(event) =>
            onInputUpdated({
              percent_discount: +event.target.value,
            })
          }
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

export default DealInputs;
