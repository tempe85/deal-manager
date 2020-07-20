import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { ICustomerRestaurantTransaction } from "../../Interfaces";

interface IProps {
  onConfigUpdated: (propName: string, value: number | string | Date) => void;
}

const CustomerRestaurantTransactionInputs = ({ onConfigUpdated }: IProps) => {
  const onInputUpdated = (
    inputName: keyof ICustomerRestaurantTransaction,
    value: number | string | Date
  ) => {
    onConfigUpdated(inputName, value);
  };
  return (
    <>
      <FormGroup>
        <Label for="transactionId">Transaction Id</Label>
        <Input
          type="number"
          name="transactionId"
          id="transactionId"
          placeholder="E.g. 1, 2, 3..."
          onChange={(event) =>
            onInputUpdated("transactionId", +event.target.value)
          }
        />
      </FormGroup>
      <FormGroup>
        <Label for="discountCardNumber">Discount Card Number</Label>
        <Input
          type="number"
          name="discountCardNumber"
          id="discountCardNumber"
          placeholder="E.g. 1, 2, 3..."
          onChange={(event) =>
            onInputUpdated("discountCardNumber", +event.target.value)
          }
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
        <Label for="date">Transaction Date</Label>
        <Input
          type="date"
          name="date"
          id="date"
          onChange={(event) => onInputUpdated("date", event.target.value)}
        />
      </FormGroup>
    </>
  );
};

export default CustomerRestaurantTransactionInputs;
