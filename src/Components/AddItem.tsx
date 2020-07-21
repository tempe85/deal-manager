import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  onClick: () => void;
  title: string;
}
function AddItem({ onClick, title }: IProps) {
  return (
    <Button onClick={onClick} color="success">
      <FontAwesomeIcon icon={faPlus} />
      <span style={{ paddingLeft: "5px" }}>{title}</span>
    </Button>
  );
}

export default AddItem;
