import React, { useState } from "react";
import { Button, Form } from "reactstrap";
import AddItemInputs from "./AddItemInputs";
import { AddFormTypes } from "../../Enums";

interface IProps {
  toggleModal: () => void;
  type: AddFormTypes;
  onAddSubmited: (config: {}) => void;
}

function AddItemForm({ toggleModal, type, onAddSubmited }: IProps) {
  const onFormSubmit = (event: any) => {
    onAddSubmited(config || {});
    toggleModal();
  };

  const [config, setConfig] = useState<{}>();

  const onConfigUpdated = (propName: string, value: number | string | Date) => {
    setConfig({
      ...config,
      [propName]: value,
    });
  };

  console.log("Config", config);
  return (
    <Form>
      <AddItemInputs onConfigUpdated={onConfigUpdated} type={type} />
      <hr />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={toggleModal}>Cancel</Button>
        <Button color="primary" onClick={onFormSubmit}>
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default AddItemForm;
