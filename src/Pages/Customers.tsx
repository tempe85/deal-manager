import React, { useState } from "react";
import Layout from "../Containers/Layout";
import { textFilter } from "react-bootstrap-table2-filter";
import { MockDataContext } from "../Contexts/MockDataContext";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import { ICustomer } from "../Interfaces";
import { IsObjectNullOrEmpty, DateFormatter } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import DataEntityTable from "./Components/DataTable";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import EditItemFormModalHelper from "./Components/EditItemFormModalHelper";
import { CustomerMockList } from "../Mocks";

export default function Customers() {
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
  const [editModalData, setEditModalData] = useState<ICustomer | undefined>(
    undefined
  );

  const [customerData, setCustomerData] = useState<ICustomer[]>(
    CustomerMockList
  );

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
        (p) => !(p.discount_card_number === customer.discount_card_number)
      )
    );
  };

  const handleEntityEditedSubmited = (config: Partial<ICustomer>) => {
    let data: ICustomer[] = [...customerData];
    let customerIndex = data?.findIndex(
      (p) => p.discount_card_number === config?.discount_card_number
    );
    if (customerIndex === -1) {
      return;
    }
    data[customerIndex] = {
      ...data[customerIndex],
      ...config,
    };
    setCustomerData(data);
  };

  const handleCustomerAddSubmited = (config: {}) => {
    const addCustomerData = { ...config } as ICustomer;
    if (IsObjectNullOrEmpty(addCustomerData)) {
      return;
    } else {
      setCustomerData([...customerData, addCustomerData]);
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
        <DataEntityTable
          keyField="discount_card_number"
          data={customerData}
          columns={columns}
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
          data={editModalData}
        />
      </div>
    </Layout>
  );
}
