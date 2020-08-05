import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ISelect } from "../../Interfaces/ISelect";
import { GetDealSelectionsAsync } from "../Selections/Selections";

interface IProps {
  onChange: (value: {}) => void;
  defaultValue?: number | undefined;
}

function DealDropdown({ onChange, defaultValue }: IProps) {
  const [selections, setSelections] = useState<ISelect[]>();

  useEffect(() => {
    const fetchDealSelections = async () => {
      const dealSelections = await GetDealSelectionsAsync();
      setSelections(dealSelections);
    };
    fetchDealSelections();
  }, []);

  const onInputUpdated = (selection: any) => {
    onChange(selection.value);
  };

  const getDefaultValue = (): ISelect | undefined => {
    if (!selections || defaultValue === undefined) {
      return;
    }
    const index = selections.findIndex(
      (p) => p.value?.deal_id === defaultValue
    );
    if (index === -1) return;
    return selections[index];
  };

  return defaultValue === undefined ? (
    <Select options={selections} onChange={onInputUpdated} />
  ) : selections ? (
    <Select
      defaultValue={getDefaultValue()}
      options={selections}
      onChange={onInputUpdated}
    />
  ) : (
    <></>
  );
}

export default DealDropdown;
