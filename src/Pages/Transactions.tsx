import React, { useState } from "react";
import Layout from "../Containers/Layout";
import { textFilter } from "react-bootstrap-table2-filter";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import { ICustomerRestaurantTransaction } from "../Interfaces";
import { IsObjectNullOrEmpty } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import { CustomerRestaurantTransactionMock } from "../Mocks/CustomerRestaurantTransaction.mock";
import DataEntityTable from "./Components/DataTable";
import { Type } from "react-bootstrap-table2-editor";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import EditItemFormModalHelper from "./Components/EditItemFormModalHelper";

export default function Transactions() {
  const columns = [
    {
      dataField: "transactionId",
      text: "Transaction Id",
      filter: textFilter(),
    },
    {
      dataField: "discountCardNumber",
      text: "Discount Card Number",
      filter: textFilter(),
    },
    {
      dataField: "chainLocationId",
      text: "Chain Location Id",
      filter: textFilter(),
    },
    {
      dataField: "dealId",
      text: "Deal Id",
      filter: textFilter(),
    },
    {
      dataField: "date",
      text: "Date",
      filter: textFilter(),
      editor: {
        type: Type.DATE,
      },
    },
    {
      dataField: "df1",
      isDummyField: true,
      text: "Remove",
      editable: false,
      formatter: (cellContent: any, row: ICustomerRestaurantTransaction) => (
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          color="red"
          icon={faMinusCircle}
          onClick={() => handleRemoveEntity(row)}
        />
      ),
    },
    {
      dataField: "df2",
      isDummyField: true,
      text: "Edit",
      editable: false,
      formatter: (cellContent: any, row: ICustomerRestaurantTransaction) => (
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          color="green"
          icon={faEdit}
          onClick={() => openEditItem(row)}
        />
      ),
    },
  ];

  const openEditItem = (row: ICustomerRestaurantTransaction) => {
    setEditItemModalOpen(true);
  };

  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState<
    ICustomerRestaurantTransaction[]
  >(CustomerRestaurantTransactionMock);

  const handleAddItemToggle = () => {
    setAddItemModalOpen(!addItemModalOpen);
  };
  const handleOpenAddItemModal = () => {
    setAddItemModalOpen(true);
  };
  const handleRemoveEntity = (transaction: ICustomerRestaurantTransaction) => {
    setTransactionData(
      transactionData.filter(
        (p) => !(p.transactionId === transaction.transactionId)
      )
    );
  };

  const handleAddEntitySubmited = (config: {}) => {
    const addData = { ...config } as ICustomerRestaurantTransaction;
    if (IsObjectNullOrEmpty(addData)) {
      return;
    } else {
      setTransactionData([...transactionData, addData]);
    }
  };

  const handleCellEdited = (oldValue: any, newValue: any) => {
    console.log(oldValue, newValue);
  };
  const [editItemModalIsOpen, setEditItemModalOpen] = useState(false);
  const handleEntityEditedSubmited = (config: {}) => {};
  const toggleEditItem = () => {
    setEditItemModalOpen(!editItemModalIsOpen);
  };

  return (
    <Layout>
      <div style={{ padding: "30px", maxWidth: "90%" }}>
        <div style={{ marginBottom: "10px" }}>
          <AddItem
            onClick={handleOpenAddItemModal}
            title={"Add new Transaction"}
          />
        </div>
        <DataEntityTable
          keyField="transactionId"
          data={transactionData}
          columns={columns}
          afterSaveCell={handleCellEdited}
        />
        <AddItemFormModalHelper
          handleAddEntitySubmited={handleAddEntitySubmited}
          formType={AddFormTypes.customerRestaurantTransaction}
          handleAddItemToggle={handleAddItemToggle}
          addItemModalOpen={addItemModalOpen}
          title={"Add a New Transaction"}
        />
        <EditItemFormModalHelper
          handleSubmit={handleEntityEditedSubmited}
          formType={AddFormTypes.customer}
          title={"Edit a Deal"}
          editItemModalIsOpen={editItemModalIsOpen}
          handleToggle={toggleEditItem}
        />
      </div>
    </Layout>
  );
}
