import React from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";

interface IProps {
  onConfigUpdated: (value: { [key: string]: string }) => void;
  toggleModal: () => void;
  onFormSubmit: (event: any) => void;
}

const RestaurantChainInputs = ({
  onConfigUpdated,
  toggleModal,
  onFormSubmit,
}: IProps) => {
  const onInputUpdated = (value: { [key: string]: string }) => {
    onConfigUpdated(value);
  };
  return (
    <>
      <FormGroup>
        <Label for="restaurantChain">Restaurant Chain Name</Label>
        <Input
          type="text"
          name="restaurantChain"
          id="restaurantChain"
          placeholder="Add Restaurant Chain Name"
          onChange={(event) =>
            onInputUpdated({ chain_name: event.target.value })
          }
        />
      </FormGroup>
      <hr />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={toggleModal}>Cancel</Button>
        <Button color="primary" onClick={onFormSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default RestaurantChainInputs;
