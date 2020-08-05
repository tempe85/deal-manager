import React, { useState } from "react";
import { Button, Form } from "reactstrap";
import AddItemInputs from "./AddItemInputs";
import { AddFormTypes } from "../../Enums";

interface IProps {
  toggleModal: () => void;
  type: AddFormTypes;
  onEditSubmited: (config: {}) => void;
  data: any;
}

function EditItemForm({ toggleModal, type, onEditSubmited, data }: IProps) {
  const onFormSubmit = (event: any) => {
    console.log("here");
    onEditSubmited(config || {});
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
      <AddItemInputs
        onConfigUpdated={onConfigUpdated}
        type={type}
        data={data}
        onFormSubmit={onFormSubmit}
        toggleModal={toggleModal}
      />
    </Form>
  );
}

export default EditItemForm;
