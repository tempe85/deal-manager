import React from "react";
import AddItemForm from "../../Components/Forms/AddItemForm";
import { AddFormTypes } from "../../Enums";
import EditItemFormModal from "../../Modals/EditItemFormModal";

interface IProps {
  editItemModalIsOpen: boolean;
  handleToggle: () => void;
  handleSubmit: (config: any) => void;
  formType: AddFormTypes;
  title: string;
}
function EditItemFormModalHelper({
  editItemModalIsOpen,
  handleToggle,
  handleSubmit,
  formType,
  title,
}: IProps) {
  return (
    <>
      {editItemModalIsOpen && (
        <EditItemFormModal
          isOpen={editItemModalIsOpen}
          toggle={handleToggle}
          title={title}
        >
          {(toggle) => {
            return (
              <AddItemForm
                toggleModal={toggle}
                onAddSubmited={handleSubmit}
                type={formType}
              />
            );
          }}
        </EditItemFormModal>
      )}
    </>
  );
}

export default EditItemFormModalHelper;
