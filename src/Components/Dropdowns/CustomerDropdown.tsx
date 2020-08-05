import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ISelect } from "../../Interfaces/ISelect";
import { GetCustomerSelectionsAsync } from "../Selections/Selections";

interface IProps {
  onChange: (value: {}) => void;
  defaultValue?: number | undefined;
}

function CustomerDropdown({ onChange, defaultValue }: IProps) {
  const [customerSelections, setCustomerSelections] = useState<ISelect[]>();
  const [initialValue, setInitialValue] = useState<ISelect>();

  useEffect(() => {
    const fetchCustomerSelections = async () => {
      const customerSelections = await GetCustomerSelectionsAsync();
      setCustomerSelections(customerSelections);
    };
    fetchCustomerSelections();
    if (defaultValue) {
      const initialValue = getDefaultValue();
      setInitialValue(initialValue);
    }
  }, []);

  const onInputUpdated = (selection: any) => {
    onChange(selection.value);
  };

  const getDefaultValue = (): ISelect | undefined => {
    if (!customerSelections || defaultValue === undefined) {
      return;
    }
    const index = customerSelections.findIndex(
      (p) => p.value?.discount_card_number === defaultValue
    );
    if (index === -1) return;
    return customerSelections[index];
  };
  return defaultValue === undefined ? (
    <Select options={customerSelections} onChange={onInputUpdated} />
  ) : customerSelections ? (
    <Select
      defaultValue={getDefaultValue() ?? undefined}
      options={customerSelections}
      onChange={onInputUpdated}
    />
  ) : (
    <></>
  );
}

export default CustomerDropdown;
