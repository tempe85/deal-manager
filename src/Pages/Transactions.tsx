import React, { useState, useEffect } from "react";
import Layout from "../Containers/Layout";
import { textFilter } from "react-bootstrap-table2-filter";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import {
  ICustomerRestaurantTransaction,
  ITransactionAddRequest,
  ITransactionEditRequest,
} from "../Interfaces";
import { IsObjectNullOrEmpty, DateFormatter } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import DataEntityTable from "./Components/DataTable";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import EditItemFormModalHelper from "./Components/EditItemFormModalHelper";
import {
  getTransactions,
  deleteTransactionRequest,
  addTransactionRequest,
  editTransactionRequest,
} from "../API/Api";
import { toast } from "react-toastify";
import { FormatterDeal } from "../Utils/Formatters/Formatter";
import Loading from "./Components/Loading";

//Implementing Transaction table

export default function Transactions() {
  const [isLoading, setIsLoading] = useState(false);
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState<
    ICustomerRestaurantTransaction[]
  >();
  const [editModalData, setEditModalData] = useState<
    ICustomerRestaurantTransaction | undefined
  >(undefined);

  useEffect(() => {
    //Triggers fetchTransactions
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      fetchTransactions();
    }
  }, [isLoading]);

  //Implmenting select for transactions
  const fetchTransactions = async () => {
    try {
      const transactions = await getTransactions();
      setTransactionData(transactions);
      setIsLoading(false);
    } catch (error) {
      toast.error(`Unable to fetch transactions. ${error}`);
      setIsLoading(false);
    }
  };

  const columns = [
    {
      dataField: "transaction_id",
      text: "Transaction Id",
      filter: textFilter(),
    },
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
      dataField: "percent_discount",
      text: "Discount",
      filter: textFilter(),
      formatter: FormatterDeal,
      filterValue: FormatterDeal,
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

  //Implementing delete for transactions
  const deleteTransaction = async (
    transaction: ICustomerRestaurantTransaction
  ) => {
    const { transaction_id } = transaction;
    try {
      const response = await deleteTransactionRequest(transaction_id);
      if (response.affectedRows <= 0) {
        toast.error(
          `Error deleting transaction Id ${transaction_id}. Zero rows were updated in query`
        );
        return;
      }
      await fetchTransactions();
      //TODO: Figure out why useState is being dumb
      // transactionData.filter(
      //   (p) => p.transaction_id.toString() !== transaction_id.toString()
      // );
      //setTransactionData(filteredData);
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

  const getTransactionAddRequestObject = (config: { [key: string]: any }) => {
    const transactionAddRequest: ITransactionAddRequest = {
      discount_card_number: config.discount_card_number,
      chain_location_id: config.chain_location_id,
      deal_id: config.deal_id,
      date: config.date,
    };
    return transactionAddRequest;
  };

  const isValidTransactionAddRequest = (
    transactionAddRequest: ITransactionAddRequest
  ): boolean => {
    if (
      transactionAddRequest.discount_card_number === undefined ||
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

  //Implementing insert for transactions
  const handleAddEntitySubmited = async (config: { [key: string]: any }) => {
    const addData = getTransactionAddRequestObject(config);
    if (IsObjectNullOrEmpty(addData)) {
      return;
    } else if (!isValidTransactionAddRequest(addData)) {
      toast.error(
        `Invalid add request. Some fields other than Deal Id are undefined.`,
        {
          autoClose: false,
        }
      );
      return;
    } else {
      try {
        const response = await addTransactionRequest(addData);
        if (response.affectedRows > 0) {
          toast.success(`Added transaction Id: ${response.insertId}!`);
        } else {
          toast.error(`Failed to add transaction. Affected rows was 0`);
          return;
        }
        const insertId = response.insertId;
        const newTransaction = getTransactionObject(config, insertId);
        setTransactionData(
          transactionData
            ? [...transactionData, newTransaction]
            : [newTransaction]
        );
      } catch (error) {
        toast.error(`Failed to add transaction. ${error}`);
      }
    }
  };

  const [editItemModalIsOpen, setEditItemModalOpen] = useState(false);

  const getTransactioneditObject = (
    config: Partial<ICustomerRestaurantTransaction>,
    originalObject: ICustomerRestaurantTransaction
  ): ITransactionEditRequest => {
    const editTransactionRequest: ITransactionEditRequest = {
      transaction_id: config.transaction_id ?? originalObject.transaction_id,
      discount_card_number:
        config?.discount_card_number ?? originalObject.discount_card_number,
      chain_location_id:
        config?.chain_location_id ?? originalObject.chain_location_id,
      deal_id: config?.deal_id ?? originalObject.deal_id,
      date: config?.date ?? originalObject.date,
    };

    return editTransactionRequest;
  };

  //Implementing update for Transactions
  const handleEntityEditedSubmited = async (
    config: Partial<ICustomerRestaurantTransaction>
  ) => {
    if (Object.keys(config).length <= 1) {
      toast.info(
        `Did not update transaction ${config?.transaction_id}, no data was changed`
      );
      return;
    }
    let data: ICustomerRestaurantTransaction[] = [...transactionData!];
    let transactionIndex = data?.findIndex(
      (p) => p.transaction_id === config?.transaction_id
    );
    if (transactionIndex === -1) {
      return;
    }
    const transactionEditRequest = getTransactioneditObject(
      config,
      data[transactionIndex]
    );
    try {
      const response = await editTransactionRequest(transactionEditRequest);
      if (response.affectedRows <= 0) {
        toast.error(
          `Did not update any rows with edit request for transaction ${config.transaction_id}`
        );
      }
      data[transactionIndex] = {
        ...data[transactionIndex],
        ...config,
      };
      setTransactionData(data);
      toast.success(`Updated transaction ${config.transaction_id}!`);
    } catch (error) {
      toast.error(
        `Error updating transaction ${config.transaction_id}: ${error}`
      );
    }
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
        <Loading isLoading={isLoading}>
          {transactionData && (
            <DataEntityTable
              keyField="transaction_id"
              data={transactionData}
              columns={columns}
            />
          )}
        </Loading>
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
