import React, { useState, useEffect } from "react";
import Layout from "../Containers/Layout";
import { textFilter } from "react-bootstrap-table2-filter";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import { ICustomer } from "../Interfaces";
import { IsObjectNullOrEmpty, DateFormatter } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import DataEntityTable from "./Components/DataTable";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import EditItemFormModalHelper from "./Components/EditItemFormModalHelper";
import {
  getCustomers,
  deleteCustomerRequest,
  addCustomerRequest,
  updateCustomerRequest,
} from "../API/Api";
import { toast } from "react-toastify";
import Loading from "./Components/Loading";

//Implementing Customer Table

export default function Customers() {
  const [isLoading, setIsLoading] = useState(false);
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [editItemModalIsOpen, setEditItemModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState<ICustomer | undefined>(
    undefined
  );
  const [customerData, setCustomerData] = useState<ICustomer[]>();

  useEffect(() => {
    //Triggers fetchCustomers
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      fetchCustomers();
    }
  }, [isLoading]);

  const fetchCustomers = async () => {
    try {
      const customers = await getCustomers();
      setCustomerData(customers);
      setIsLoading(false);
    } catch (error) {
      toast.error(`Unable to fetch customers. ${error}`);
      setIsLoading(false);
    }
  };

  const columns = [
    {
      dataField: "discount_card_number",
      text: "Discount Card Number",
    },
    {
      dataField: "first_name",
      text: "First Name",
      filter: textFilter(),
    },
    {
      dataField: "last_name",
      text: "Last Name",
      filter: textFilter(),
    },
    {
      dataField: "birth_date",
      text: "Birth Day",
      formatter: (cell: any, row: ICustomer) => DateFormatter(row.birth_date),
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
          onClick={() => deleteCustomer(row)}
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

  const handleAddItemToggle = () => {
    setAddItemModalOpen(!addItemModalOpen);
  };
  const toggleEditItem = () => {
    setEditItemModalOpen(!editItemModalIsOpen);
  };

  const handleOpenAddItemModal = () => {
    setAddItemModalOpen(true);
  };

  const deleteCustomer = async (customer: ICustomer) => {
    const { discount_card_number } = customer;
    try {
      const response = await deleteCustomerRequest(discount_card_number);
      if (response.affectedRows <= 0) {
        toast.error(
          `Error deleting customer with discount card ${discount_card_number}. Zero rows were updated in query`
        );
        return;
      }
      await fetchCustomers();
      //TODO: Figure out why useState is being dumb
      // setCustomerData(
      //   customerData?.filter(
      //     (p) => !(p.discount_card_number === customer.discount_card_number)
      //   )
      // );
      toast.success(`Deleted customer ${discount_card_number}!`);
    } catch (error) {
      toast.error(
        `Error deleting customer Id ${discount_card_number}: ${error}`,
        {
          autoClose: false,
        }
      );
    }
  };

  const getCustomerEditObject = (
    config: Partial<ICustomer>,
    originalObject: ICustomer
  ): ICustomer => {
    const editCustomerRequest: ICustomer = {
      birth_date: config.birth_date ?? originalObject.birth_date,
      discount_card_number:
        config.discount_card_number ?? originalObject.discount_card_number,
      first_name: config.first_name ?? originalObject.first_name,
      last_name: config.last_name ?? originalObject.last_name,
    };
    return editCustomerRequest;
  };

  const handleEntityEditedSubmited = async (config: Partial<ICustomer>) => {
    if (Object.keys(config).length <= 1) {
      toast.info(
        `Did not update customer with ID ${config?.discount_card_number}, no data was changed`
      );
      return;
    }
    let data: ICustomer[] = [...customerData!];
    let customerIndex = data?.findIndex(
      (p) => p.discount_card_number === config?.discount_card_number
    );
    if (customerIndex === -1) {
      return;
    }
    const customerEditRequest = getCustomerEditObject(
      config,
      data[customerIndex]
    );
    try {
      const response = await updateCustomerRequest(customerEditRequest);
      if (response.affectedRows <= 0) {
        toast.error(
          `Did not update any rows with edit request for customer ID ${config.discount_card_number}`
        );
      }
      data[customerIndex] = {
        ...data[customerIndex],
        ...config,
      };
      setCustomerData(data);
      toast.success(`Updated customer ID ${config.discount_card_number}!`);
    } catch (error) {
      toast.error(
        `Error updating customer ID ${config.discount_card_number}: ${error}`
      );
    }
  };

  const isValidCustomerAddRequest = (customer: ICustomer): boolean => {
    if (
      customer.birth_date === undefined ||
      customer.discount_card_number === undefined ||
      customer.first_name === undefined ||
      customer.last_name === undefined
    ) {
      return false;
    }
    return true;
  };

  const handleAddEntitySubmited = async (config: { [key: string]: any }) => {
    const addData = config as ICustomer;
    console.log("customer data", addData);
    if (IsObjectNullOrEmpty(addData)) {
      return;
    } else if (!isValidCustomerAddRequest(addData)) {
      toast.error(`Invalid add request. Some fields are undefined.`, {
        autoClose: false,
      });
      return;
    } else {
      try {
        const response = await addCustomerRequest(addData);
        if (response.affectedRows > 0) {
          toast.success(
            `Added customer with Id: ${addData.discount_card_number}!`
          );
        } else {
          toast.error(`Failed to add customer. Affected rows was 0`);
          return;
        }
        setCustomerData(customerData ? [...customerData, addData] : [addData]);
      } catch (error) {
        toast.error(`Failed to add transaction. ${error}`);
      }
    }
  };

  const openEditItem = (row: ICustomer) => {
    setEditModalData(row);
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
        <Loading isLoading={isLoading}>
          {customerData && (
            <DataEntityTable
              keyField="discount_card_number"
              data={customerData}
              columns={columns}
            />
          )}
        </Loading>
        <AddItemFormModalHelper
          handleAddEntitySubmited={handleAddEntitySubmited}
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
          data={editModalData}
        />
      </div>
    </Layout>
  );
}
