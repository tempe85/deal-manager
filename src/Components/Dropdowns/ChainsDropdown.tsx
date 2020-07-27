import React, { useState, useEffect } from "react";
import { DealMockList, ChainMockList } from "../../Mocks";
import Select from "react-select";
import { ISelect } from "../../Interfaces/ISelect";

interface IProps {
  onChange: (value: string) => void;
  defaultValue?: ISelect | undefined;
}

function ChainsDropdown({ onChange, defaultValue }: IProps) {
  const [selections, setSelections] = useState<ISelect[]>();

  useEffect(() => {
    const selections = getSelections();
    setSelections(selections);
  }, []);

  const onInputUpdated = (selection: any) => {
    onChange(selection.value);
  };
  const getSelections = (): ISelect[] => {
    let selections: ISelect[] = [];
    ChainMockList.forEach((p) => {
      selections.push({
        value: p.chainName,
        label: p.chainName,
      });
    });
    return selections;
  };

  return (
    <Select
      defaultValue={defaultValue}
      options={selections}
      onChange={onInputUpdated}
    />
  );
}

export default ChainsDropdown;
