import React, { useState, useEffect } from "react";
import Layout from "../Containers/Layout";
import { textFilter } from "react-bootstrap-table2-filter";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import {
  ICustomerRestaurantTransaction,
  ITransactionRequest,
} from "../Interfaces";
import { IsObjectNullOrEmpty, DateFormatter } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import { CustomerRestaurantTransactionMock, CustomerMockList } from "../Mocks";
import DataEntityTable from "./Components/DataTable";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import EditItemFormModalHelper from "./Components/EditItemFormModalHelper";
import {
  getTransactions,
  deleteTransactionRequest,
  addTransactionRequest,
} from "../API/Api";
import { GetChainLocationSelectionsAsync } from "../Components/Selections/Selections";
import { toast } from "react-toastify";

export default function Transactions() {
  const [isLoading, setIsLoading] = useState(false);
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState<
    ICustomerRestaurantTransaction[]
  >(CustomerRestaurantTransactionMock);
  const [editModalData, setEditModalData] = useState<
    ICustomerRestaurantTransaction | undefined
  >(undefined);

  // const FormatterFirstName = (discountCardNumber: number) => {
  //   const customerEntry = CustomerMockList.filter(
  //     (p) => p.discount_card_number === discountCardNumber
  //   )[0];
  //   return customerEntry.first_name;
  // };

  const FormatterLastName = (
    cell: any,
    row: ICustomerRestaurantTransaction
  ) => {
    const customerEntry = CustomerMockList.filter(
      (p) => p.discount_card_number === row.discount_card_number
    )[0];
    return customerEntry.last_name;
  };

  useEffect(() => {
    //Triggers fetchTransactions
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      fetchTransactions();
    }
  }, [isLoading]);

  const fetchTransactions = async () => {
    try {
      const transactions = await getTransactions();
      setTransactionData(transactions);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      dataField: "first_name",
      text: "Customer First Name",
      filter: textFilter(),
    },
    {
      dataField: "last_name",
      text: "Customer Last Name",
      filter: textFilter(),
    },
    {
      dataField: "chain_name",
      text: "Chain Name",
      filter: textFilter(),
    },
    {
      dataField: "city",
      text: "City",
      filter: textFilter(),
    },
    {
      dataField: "state",
      text: "State",
      filter: textFilter(),
    },
    {
      dataField: "deal_id",
      text: "Discount",
      filter: textFilter(),
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
          onClick={() => deleteTransaction(row)}
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

  const deleteTransaction = async (
    transaction: ICustomerRestaurantTransaction
  ) => {
    const { transaction_id } = transaction;
    try {
      await deleteTransactionRequest(transaction_id);
      const filteredData = transactionData.filter(
        (p) => p.transaction_id !== transaction_id
      );
      setTransactionData(filteredData);
      toast.success(`Deleted transaction ${transaction_id}!`);
    } catch (error) {
      toast.error(`Error deleting transaction Id ${transaction_id}: ${error}`, {
        autoClose: false,
      });
    }
  };

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
  // const handleRemoveEntity = (transaction: ICustomerRestaurantTransaction) => {
  //   setTransactionData(
  //     transactionData.filter(
  //       (p) => !(p.transaction_id === transaction.transaction_id)
  //     )
  //   );
  // };
  // const convertTransactionRequestIntoRestaurantTransaction = (tranasctionRequest: ITransactionRequest, insertId: number): ICustomerRestaurantTransaction => {
  //   let customerRestaurantTransaction: ICustomerRestaurantTransaction = {} as ICustomerRestaurantTransaction;
  //   customerRestaurantTransaction.
  // }

  const getTransactionAddRequestObject = (config: { [key: string]: any }) => {
    const transactionAddRequest: ITransactionRequest = {
      discount_card_number: config.discount_card_number,
      chain_location_id: config.chain_location_id,
      deal_id: config.deal_id,
      date: config.date,
    };
    return transactionAddRequest;
  };

  const isValidTransactionAddRequest = (
    transactionAddRequest: ITransactionRequest
  ) => {
    if (
      transactionAddRequest.discount_card_number === undefined ||
      transactionAddRequest.deal_id === undefined ||
      transactionAddRequest.date === undefined ||
      transactionAddRequest.chain_location_id === undefined
    ) {
      return false;
    }
    return true;
  };

  const getTransactionObject = (
    config: { [key: string]: any },
    transaction_id: number
  ) => {
    const transaction: ICustomerRestaurantTransaction = {
      transaction_id: transaction_id,
      discount_card_number: config.discount_card_number,
      chain_location_id: config.chain_location_id,
      deal_id: config.deal_id,
      date: config.date,
      first_name: config.first_name,
      last_name: config.last_name,
      chain_name: config.chain_name,
      state: config.state,
      city: config.city,
      percent_discount: config.percent_discount,
    };
    return transaction;
  };

  const handleAddEntitySubmited = async (config: { [key: string]: any }) => {
    const addData = getTransactionAddRequestObject(config);
    if (IsObjectNullOrEmpty(addData)) {
      return;
    } else {
      try {
        if (!isValidTransactionAddRequest(addData)) {
          toast.error(`Invalid add request. Some fields are undefined.`, {
            autoClose: false,
          });
          return;
        }
        const response = await addTransactionRequest(addData);
        const insertId = response.insertId;
        const newTransaction = getTransactionObject(config, insertId);
        if (response.affectedRows > 0) {
          toast.success(`Added transaction Id: ${response.insertId}!`);
        } else {
          toast.error(`Failed to add transaction. Affected rows was 0`);
        }
        setTransactionData([...transactionData, newTransaction]);
      } catch (error) {
        toast.error(`Failed to add transaction. ${error}`);
      }
    }
  };

  const [editItemModalIsOpen, setEditItemModalOpen] = useState(false);

  const handleEntityEditedSubmited = (
    config: Partial<ICustomerRestaurantTransaction>
  ) => {
    let data: ICustomerRestaurantTransaction[] = [...transactionData];
    let customerIndex = data?.findIndex(
      (p) => p.transaction_id === config?.transaction_id
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
            keyField="transaction_id"
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
