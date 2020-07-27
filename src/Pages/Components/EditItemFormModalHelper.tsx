import React from "react";
import { AddFormTypes } from "../../Enums";
import EditItemFormModal from "../../Modals/EditItemFormModal";
import EditItemForm from "../../Components/Forms/EditItemForm";

interface IProps {
  editItemModalIsOpen: boolean;
  handleToggle: () => void;
  handleSubmit: (config: any) => void;
  formType: AddFormTypes;
  title: string;
  data?: any;
}
function EditItemFormModalHelper({
  editItemModalIsOpen,
  handleToggle,
  handleSubmit,
  formType,
  title,
  data,
}: IProps) {
  return (
    <>
      {editItemModalIsOpen && (
        <EditItemFormModal
          isOpen={editItemModalIsOpen}
          toggle={handleToggle}
          title={title}
          data={data}
        >
          {(toggle, data) => {
            return (
              <EditItemForm
                toggleModal={toggle}
                onEditSubmited={handleSubmit}
                type={formType}
                data={data}
              />
            );
          }}
        </EditItemFormModal>
      )}
    </>
  );
}

export default EditItemFormModalHelper;
