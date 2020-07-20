import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./styles.css";

interface IProps {
  toggle: () => void;
  title: string;
  isOpen: boolean;
  children: (toggle: () => void) => React.ReactNode;
}
function AddItemFormModal({ title, isOpen, toggle, children }: IProps) {
  return (
    <Modal className={"add-item-modal"} isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{children(toggle)}</ModalBody>
    </Modal>
  );
}

export default AddItemFormModal;
