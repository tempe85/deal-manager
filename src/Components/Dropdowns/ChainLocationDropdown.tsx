import React, { useState, useEffect } from "react";
import { RestaurantChainLocationMock } from "../../Mocks";
import Select from "react-select";
import { ISelect } from "../../Interfaces/ISelect";

interface IProps {
  onChange: (value: string) => void;
  defaultValue?: ISelect | undefined;
}

function ChainLocationDropDown({ onChange, defaultValue }: IProps) {
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
    RestaurantChainLocationMock.forEach((p) => {
      selections.push({
        value: p.chainLocationId.toString(),
        label: `${p.chainLocationId}: ${p.chainName} ${p.city}, ${p.state}`,
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

export default ChainLocationDropDown;
