import React from "react";
import AddItemFormModal from "../../Modals/AddItemFormModal";
import AddItemForm from "../../Components/Forms/AddItemForm";
import { AddFormTypes } from "../../Enums";

interface IProps {
  addItemModalOpen: boolean;
  handleAddItemToggle: () => void;
  handleAddEntitySubmited: (config: any) => void;
  formType: AddFormTypes;
  title: string;
}
function AddItemFormModalHelper({
  addItemModalOpen,
  handleAddItemToggle,
  handleAddEntitySubmited,
  formType,
  title,
}: IProps) {
  return (
    <>
      {addItemModalOpen && (
        <AddItemFormModal
          isOpen={addItemModalOpen}
          toggle={handleAddItemToggle}
          title={title}
        >
          {(toggle) => {
            return (
              <AddItemForm
                toggleModal={toggle}
                onAddSubmited={handleAddEntitySubmited}
                type={formType}
              />
            );
          }}
        </AddItemFormModal>
      )}
    </>
  );
}

export default AddItemFormModalHelper;
