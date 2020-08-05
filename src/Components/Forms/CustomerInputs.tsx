import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { ICustomer } from "../../Interfaces";

interface IProps {
  onConfigUpdated: (propName: string, value: number | string | Date) => void;
  data?: any;
}

const CustomerInputs = ({ onConfigUpdated, data }: IProps) => {
  const [customerData, setCustomerData] = useState<ICustomer | undefined>(
    undefined
  );
  useEffect(() => {
    if (data) {
      setCustomerData(data);
      onConfigUpdated("discount_card_number", data?.discount_card_number!);
    }
  }, [data]);

  const onInputUpdated = (
    inputName: keyof ICustomer,
    value: number | string | Date
  ) => {
    onConfigUpdated(inputName, value);
  };
  return (
    <>
      <FormGroup>
        {data && (
          <Label for="discountCard">
            Discount Card Number: {customerData?.discount_card_number}
          </Label>
        )}
        {!data && (
          <>
            <Label for="discountCard">Discount Card Number</Label>
            <Input
              defaultValue={customerData?.discount_card_number || ""}
              type="number"
              name="discountCard"
              id="discountCard"
              placeholder="E.g. 1, 2, 3..."
              onChange={(event) =>
                onInputUpdated("discount_card_number", +event.target.value)
              }
            />
          </>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          defaultValue={customerData?.first_name || ""}
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Add Customer's First Name"
          onChange={(event) => onInputUpdated("first_name", event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input
          defaultValue={customerData?.last_name || ""}
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Add Customer's Last Name"
          onChange={(event) => onInputUpdated("last_name", event.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="birthDay">Birth Day</Label>
        <Input
          type="date"
          name="birthDay"
          id="birthDay"
          defaultValue={customerData?.birth_date || ""}
          onChange={(event) => onInputUpdated("birth_date", event.target.value)}
        />
      </FormGroup>
    </>
  );
};

export default CustomerInputs;
