import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ISelect } from "../../Interfaces/ISelect";
import { CustomerSelections } from "../Selections/Selections";

interface IProps {
  onChange: (value: string) => void;
  defaultValue?: ISelect | undefined;
}

function CustomerDropdown({ onChange, defaultValue }: IProps) {
  const [customerSelections, setCustomerSelections] = useState<ISelect[]>();

  useEffect(() => {
    const selections = CustomerSelections();
    setCustomerSelections(selections);
  }, []);
  const onInputUpdated = (selection: any) => {
    onChange(selection.value);
  };

  return (
    <Select
      defaultValue={defaultValue}
      options={customerSelections}
      onChange={onInputUpdated}
    />
  );
}

export default CustomerDropdown;
