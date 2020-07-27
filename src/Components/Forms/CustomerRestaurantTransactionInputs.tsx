import React, { useEffect, useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { ICustomerRestaurantTransaction } from "../../Interfaces";
import CustomerDropdown from "../Dropdowns/CustomerDropdown";
import ChainLocationDropDown from "../Dropdowns/ChainLocationDropdown";
import DealDropdown from "../Dropdowns/DealDropdown";
import {
  CustomerSelections,
  ChainLocationSelections,
  DealSelections,
} from "../Selections/Selections";

interface IProps {
  onConfigUpdated: (propName: string, value: number | string | Date) => void;
  data?: any;
}

const CustomerRestaurantTransactionInputs = ({
  onConfigUpdated,
  data,
}: IProps) => {
  const [transactionData, setTransactionData] = useState<
    ICustomerRestaurantTransaction | undefined
  >(undefined);
  useEffect(() => {
    if (data) {
      setTransactionData(data);
      onConfigUpdated("transactionId", data?.transactionId!);
    }
  }, [data]);

  const onInputUpdated = (
    inputName: keyof ICustomerRestaurantTransaction,
    value: number | string | Date
  ) => {
    onConfigUpdated(inputName, value);
  };
  return (
    <>
      {data && (
        <Label for="discountCard">
          Transaction Id: {transactionData?.transactionId}
        </Label>
      )}
      <FormGroup>
        <Label for="discountCardNumber">Discount Card Number</Label>
        <CustomerDropdown
          onChange={(returnValue) => {
            onInputUpdated("discountCardNumber", +returnValue);
          }}
          defaultValue={
            data
              ? CustomerSelections().filter(
                  (p) => p.value === data?.discountCardNumber.toString()
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
        <Label for="date">Transaction Date</Label>
        <Input
          type="date"
          name="date"
          defaultValue={transactionData?.date || ""}
          id="date"
          onChange={(event) => onInputUpdated("date", event.target.value)}
        />
      </FormGroup>
    </>
  );
};

export default CustomerRestaurantTransactionInputs;
