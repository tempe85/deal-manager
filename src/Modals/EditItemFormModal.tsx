import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./styles.css";

interface IProps {
  toggle: () => void;
  title: string;
  isOpen: boolean;
  children: (toggle: () => void, data: any) => React.ReactNode;
  data?: any;
}
function EditFormModal({ title, isOpen, toggle, children, data }: IProps) {
  return (
    <Modal className={"item-modal"} isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{children(toggle, data)}</ModalBody>
    </Modal>
  );
}

export default EditFormModal;
