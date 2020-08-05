import React, { useState } from "react";
import { Button, Form } from "reactstrap";
import AddItemInputs from "./AddItemInputs";
import { AddFormTypes } from "../../Enums";

interface IProps {
  type: AddFormTypes;
  toggleModal: () => void;
  onAddSubmited: (config: {}) => void;
}

function AddItemForm({ toggleModal, type, onAddSubmited }: IProps) {
  const onFormSubmit = (event: any) => {
    onAddSubmited(config || {});
    toggleModal();
  };

  const [config, setConfig] = useState<{}>();

  const onConfigUpdated = (value: {}) => {
    setConfig({
      ...config,
      ...value,
    });
  };

  return (
    <Form>
      <AddItemInputs toggleModal={toggleModal} onFormSubmit={onFormSubmit} onConfigUpdated={onConfigUpdated} type={type} />
    </Form>
  );
}

export default AddItemForm;
