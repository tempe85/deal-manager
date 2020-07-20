import React, { useState } from "react";
import Layout from "../Containers/Layout";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import AddItem from "../Components/AddItem";
import AddItemFormModal from "../Modals/AddItemFormModal";
import AddItemForm from "../Components/Forms/AddItemForm";
import { AddFormTypes } from "../Enums";
import { ICustomerRestaurantTransaction } from "../Interfaces";
import { IsObjectNullOrEmpty } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { CustomerRestaurantTransactionMock } from "../Mocks/CustomerRestaurantTransaction.mock";

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
    },
    {
      dataField: "df1",
      isDummyField: true,
      text: "Remove",
      formatter: (cellContent: any, row: ICustomerRestaurantTransaction) => (
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          color="red"
          icon={faMinusCircle}
          onClick={() => handleRemoveEntity(row)}
        />
      ),
    },
  ];

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

  return (
    <Layout>
      <div style={{ padding: "30px", maxWidth: "90%" }}>
        <div style={{ marginBottom: "10px" }}>
          <AddItem onClick={handleOpenAddItemModal} />
        </div>
        <BootstrapTable
          keyField="transactionId"
          data={transactionData}
          columns={columns}
          filter={filterFactory()}
          bordered
          striped
        />
        {addItemModalOpen && (
          <AddItemFormModal
            isOpen={addItemModalOpen}
            toggle={handleAddItemToggle}
            title={"Add a New Transaction"}
          >
            {(toggle) => {
              return (
                <AddItemForm
                  toggleModal={toggle}
                  onAddSubmited={handleAddEntitySubmited}
                  type={AddFormTypes.customerRestaurantTransaction}
                />
              );
            }}
          </AddItemFormModal>
        )}
      </div>
    </Layout>
  );
}
