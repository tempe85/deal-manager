import React, { useState, useEffect } from "react";
import Layout from "../Containers/Layout";
import { textFilter, dateFilter } from "react-bootstrap-table2-filter";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import { ICustomerRestaurantTransaction } from "../Interfaces";
import { IsObjectNullOrEmpty, DateFormatter } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  CustomerRestaurantTransactionMock,
  CustomerMockList,
  DealMockList,
  RestaurantChainLocationMock,
} from "../Mocks";
import DataEntityTable from "./Components/DataTable";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import EditItemFormModalHelper from "./Components/EditItemFormModalHelper";
import {
  FormatterChainName,
  FormatterCity,
  FormatterState,
  FormatterDeal,
} from "../Utils/Formatters/Formatter";

export default function Transactions() {
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState<
    ICustomerRestaurantTransaction[]
  >(CustomerRestaurantTransactionMock);
  const [editModalData, setEditModalData] = useState<
    ICustomerRestaurantTransaction | undefined
  >(undefined);

  const FormatterFirstName = (discountCardNumber: number) => {
    const customerEntry = CustomerMockList.filter(
      (p) => p.discountCardNumber === discountCardNumber
    )[0];
    return customerEntry.firstName;
  };

  const FormatterLastName = (
    cell: any,
    row: ICustomerRestaurantTransaction
  ) => {
    const customerEntry = CustomerMockList.filter(
      (p) => p.discountCardNumber === row.discountCardNumber
    )[0];
    return customerEntry.lastName;
  };
  const columns = [
    {
      dataField: "transactionId",
      text: "Transaction Id",
      filter: textFilter(),
    },
    {
      dataField: "discountCardNumber",
      text: "Customer First Name",
      filter: textFilter(),
      filterValue: FormatterFirstName,
      formatter: FormatterFirstName,
    },
    {
      dataField: "dc2",
      text: "Customer Last Name",
      isDummyField: true,
      filter: textFilter(),
      filterValue: FormatterLastName,
      formatter: FormatterLastName,
    },
    {
      dataField: "cl1",
      text: "Chain Name",
      filter: textFilter(),
      filterValue: FormatterChainName,
      formatter: FormatterChainName,
    },
    {
      dataField: "cl2",
      text: "City",
      filter: textFilter(),
      isDummyField: true,
      filterValue: FormatterCity,
      formatter: FormatterCity,
    },
    {
      dataField: "cl3",
      text: "State",
      filter: textFilter(),
      isDummyField: true,
      filterValue: FormatterState,
      formatter: FormatterState,
    },
    {
      dataField: "dealId",
      text: "Discount",
      filter: textFilter(),
      filterValue: FormatterDeal,
      formatter: FormatterDeal,
    },
    {
      dataField: "date",
      text: "Date",
      filterValue: (cell: any, row: ICustomerRestaurantTransaction) =>
        DateFormatter(row.date),
      formatter: (cell: any, row: ICustomerRestaurantTransaction) =>
        DateFormatter(row.date),
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
    setEditModalData(row);
    setEditItemModalOpen(true);
  };

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
      const maxId = Math.max(...transactionData.map((p) => p.transactionId));
      addData.transactionId = maxId + 1;
      setTransactionData([...transactionData, addData]);
    }
  };

  const [editItemModalIsOpen, setEditItemModalOpen] = useState(false);

  const handleEntityEditedSubmited = (
    config: Partial<ICustomerRestaurantTransaction>
  ) => {
    let data: ICustomerRestaurantTransaction[] = [...transactionData];
    let customerIndex = data?.findIndex(
      (p) => p.transactionId === config?.transactionId
    );
    if (customerIndex === -1) {
      return;
    }
    data[customerIndex] = {
      ...data[customerIndex],
      ...config,
    };
    setTransactionData(data);
  };
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
        {transactionData && (
          <DataEntityTable
            keyField="transactionId"
            data={transactionData}
            columns={columns}
          />
        )}
        <AddItemFormModalHelper
          handleAddEntitySubmited={handleAddEntitySubmited}
          formType={AddFormTypes.customerRestaurantTransaction}
          handleAddItemToggle={handleAddItemToggle}
          addItemModalOpen={addItemModalOpen}
          title={"Add a New Transaction"}
        />
        <EditItemFormModalHelper
          handleSubmit={handleEntityEditedSubmited}
          formType={AddFormTypes.customerRestaurantTransaction}
          title={"Edit a Transaction"}
          editItemModalIsOpen={editItemModalIsOpen}
          handleToggle={toggleEditItem}
          data={editModalData}
        />
      </div>
    </Layout>
  );
}
