import React, { useState, useEffect } from "react";
import Select from "react-select";
import { ISelect } from "../../Interfaces/ISelect";
import { GetChainSelectionsAsync } from "../Selections/Selections";

interface IProps {
  onChange: (value: {}) => void;
  defaultValue?: string | undefined;
}

function ChainsDropdown({ onChange, defaultValue }: IProps) {
  const [selections, setSelections] = useState<ISelect[]>();

  useEffect(() => {
    const fetchChainSelections = async () => {
      const selections = await GetChainSelectionsAsync();
      setSelections(selections);
    };
    fetchChainSelections();
  }, []);

  const onInputUpdated = (selection: any) => {
    onChange(selection.value);
  };

  const getDefaultValue = (): ISelect | undefined => {
    if (!selections || defaultValue === undefined) {
      return;
    }
    const index = selections.findIndex(
      (p) => p.value?.chain_name === defaultValue
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

export default ChainsDropdown;
