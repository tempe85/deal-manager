import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { ICustomer } from "../../Interfaces";

interface IProps {
  onConfigUpdated: (propName: string, value: number | string | Date) => void;
}

const CustomerInputs = ({ onConfigUpdated }: IProps) => {
  const onInputUpdated = (
    inputName: keyof ICustomer,
    value: number | string | Date
  ) => {
    onConfigUpdated(inputName, value);
  };
  return (
    <>
      <FormGroup>
        <Label for="discountCard">Discount Card Number</Label>
        <Input
          type="number"
          name="discountCard"
          id="discountCard"
          placeholder="E.g. 1, 2, 3..."
          onChange={(event) =>
            onInputUpdated("discountCardNumber", +event.target.value)
          }
        />
      </FormGroup>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Add Customer's First Name"
          onChange={(event) => onInputUpdated("firstName", event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Add Customer's Last Name"
          onChange={(event) => onInputUpdated("lastName", event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="birthDay">Birth Day</Label>
        <Input
          type="date"
          name="birthDay"
          id="birthDay"
          onChange={(event) => onInputUpdated("birthDate", event.target.value)}
        />
      </FormGroup>
    </>
  );
};

export default CustomerInputs;
