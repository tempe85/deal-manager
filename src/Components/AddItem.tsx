import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  onClick: () => void;
}
function AddItem({ onClick }: IProps) {
  return (
    <Button onClick={onClick} color="success">
      <FontAwesomeIcon icon={faPlus} />
      <span style={{ paddingLeft: "5px" }}>Add New Entry</span>
    </Button>
  );
}

export default AddItem;
