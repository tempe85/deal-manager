import React, { useEffect, useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { ICustomerRestaurantTransaction } from "../../Interfaces";
import CustomerDropdown from "../Dropdowns/CustomerDropdown";
import ChainLocationDropDown from "../Dropdowns/ChainLocationDropdown";
import DealDropdown from "../Dropdowns/DealDropdown";
import { DateFormatter, GetDateInputFormat } from "../../Utils";
import { ISelect } from "../../Interfaces/ISelect";

interface IProps {
  onConfigUpdated: (propName: string, value: {}) => void;
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
      onConfigUpdated("transaction_id", data?.transactionId!);
    }
  }, [data]);

  const onInputUpdated = (
    inputName: keyof ICustomerRestaurantTransaction,
    value: {}
  ) => {
    onConfigUpdated(inputName, value);
  };
  return (
    <>
      {data && (
        <Label for="discountCard">
          Transaction Id: {transactionData?.transaction_id}
        </Label>
      )}
      <FormGroup>
        <Label for="discountCardNumber">Discount Card Number</Label>
        <CustomerDropdown
          onChange={(returnValue) => {
            onInputUpdated("discount_card_number", returnValue);
          }}
          defaultValue={data?.discount_card_number}
        />
      </FormGroup>
      <FormGroup>
        <Label for="chainLocationId">Chain Location Id</Label>
        <ChainLocationDropDown
          onChange={(returnValue) =>
            onInputUpdated("chain_location_id", returnValue)
          }
          defaultValue={data?.chain_location_id}
        />
      </FormGroup>
      <FormGroup>
        <Label for="dealId">Deal Id</Label>
        <DealDropdown
          onChange={(returnValue) => onInputUpdated("deal_id", returnValue)}
          defaultValue={data?.deal_id}
        />
      </FormGroup>
      <FormGroup>
        <Label for="date">Transaction Date</Label>
        <Input
          type="date"
          name="date"
          defaultValue={
            transactionData?.date
              ? GetDateInputFormat(transactionData.date)
              : ""
          }
          id="date"
          onChange={(event) =>
            onInputUpdated("date", { date: event.target.value })
          }
        />
      </FormGroup>
    </>
  );
};

export default CustomerRestaurantTransactionInputs;
