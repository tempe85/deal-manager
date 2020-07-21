import React, { useState } from "react";
import Layout from "../Containers/Layout";
import { textFilter } from "react-bootstrap-table2-filter";
import CustomerMockList from "../Mocks/Customer.mock";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import { ICustomer } from "../Interfaces";
import { IsObjectNullOrEmpty } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import DataEntityTable from "./Components/DataTable";
import { Type } from "react-bootstrap-table2-editor";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import EditItemFormModalHelper from "./Components/EditItemFormModalHelper";

export default function Customers() {
  const columns = [
    {
      dataField: "discountCardNumber",
      text: "Discount Card Number",
    },
    {
      dataField: "lastName",
      text: "Last Name",
      filter: textFilter(),
    },
    {
      dataField: "firstName",
      text: "First Name",
      filter: textFilter(),
    },
    {
      dataField: "birthDate",
      text: "Birth Day",
      editor: {
        type: Type.DATE,
      },
    },
    {
      dataField: "df1",
      isDummyField: true,
      text: "Remove",
      editable: false,
      formatter: (cellContent: any, row: ICustomer) => (
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          color="red"
          icon={faMinusCircle}
          onClick={() => handleRemoveCustomer(row)}
        />
      ),
    },
    {
      dataField: "df2",
      isDummyField: true,
      text: "Edit",
      editable: false,
      formatter: (cellContent: any, row: ICustomer) => (
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          color="green"
          icon={faEdit}
          onClick={() => openEditItem(row)}
        />
      ),
    },
  ];

  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [editItemModalIsOpen, setEditItemModalOpen] = useState(false);

  const [customerData, setCustomerData] = useState<ICustomer[]>(
    CustomerMockList
  );

  const handleEditCustomer = (row: ICustomer) => {
    console.log(row);
  };

  const handleAddItemToggle = () => {
    setAddItemModalOpen(!addItemModalOpen);
  };
  const toggleEditItem = () => {
    setEditItemModalOpen(!editItemModalIsOpen);
  };

  const handleOpenAddItemModal = () => {
    setAddItemModalOpen(true);
  };
  const handleRemoveCustomer = (customer: ICustomer) => {
    setCustomerData(
      customerData.filter(
        (p) => !(p.discountCardNumber === customer.discountCardNumber)
      )
    );
  };

  const handleEntityEditedSubmited = (config: {}) => {};

  const handleCustomerAddSubmited = (config: {}) => {
    const addCustomerData = { ...config } as ICustomer;
    if (IsObjectNullOrEmpty(addCustomerData)) {
      return;
    } else {
      setCustomerData([...customerData, addCustomerData]);
    }
  };

  const handleCellEdited = (oldValue: any, newValue: any) => {
    console.log(oldValue, newValue);
  };

  const openEditItem = (row: ICustomer) => {
    setEditItemModalOpen(true);
  };

  return (
    <Layout>
      <div style={{ padding: "30px", maxWidth: "90%" }}>
        <div style={{ marginBottom: "10px" }}>
          <AddItem
            onClick={handleOpenAddItemModal}
            title={"Add new Customer"}
          />
        </div>
        <DataEntityTable
          keyField="discountCardNumber"
          data={customerData}
          columns={columns}
          afterSaveCell={handleCellEdited}
        />
        <AddItemFormModalHelper
          handleAddEntitySubmited={handleCustomerAddSubmited}
          formType={AddFormTypes.customer}
          handleAddItemToggle={handleAddItemToggle}
          addItemModalOpen={addItemModalOpen}
          title={"Add a Customer"}
        />
        <EditItemFormModalHelper
          handleSubmit={handleEntityEditedSubmited}
          formType={AddFormTypes.customer}
          title={"Edit a Customer"}
          editItemModalIsOpen={editItemModalIsOpen}
          handleToggle={toggleEditItem}
        />
      </div>
    </Layout>
  );
}
