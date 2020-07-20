import React, { useState } from "react";
import Layout from "../Containers/Layout";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import CustomerMockList from "../Mocks/Customer.mock";
import AddItem from "../Components/AddItem";
import AddItemFormModal from "../Modals/AddItemFormModal";
import AddItemForm from "../Components/Forms/AddItemForm";
import { AddFormTypes } from "../Enums";
import { ICustomer } from "../Interfaces";
import { IsObjectNullOrEmpty } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

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
    },
    {
      dataField: "df1",
      isDummyField: true,
      text: "Remove",
      formatter: (cellContent: any, row: ICustomer) => (
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          color="red"
          icon={faMinusCircle}
          onClick={() => handleRemoveCustomer(row)}
        />
      ),
    },
  ];

  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [customerData, setCustomerData] = useState<ICustomer[]>(
    CustomerMockList
  );

  const handleAddItemToggle = () => {
    setAddItemModalOpen(!addItemModalOpen);
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

  const handleCustomerAddSubmited = (config: {}) => {
    const addCustomerData = { ...config } as ICustomer;
    if (IsObjectNullOrEmpty(addCustomerData)) {
      return;
    } else {
      setCustomerData([...customerData, addCustomerData]);
    }
  };

  return (
    <Layout>
      <div style={{ padding: "30px", maxWidth: "90%" }}>
        <div style={{ marginBottom: "10px" }}>
          <AddItem onClick={handleOpenAddItemModal} />
        </div>
        <BootstrapTable
          keyField="discountCardNumber"
          data={customerData}
          columns={columns}
          filter={filterFactory()}
          bordered
          striped
        />
        {addItemModalOpen && (
          <AddItemFormModal
            isOpen={addItemModalOpen}
            toggle={handleAddItemToggle}
            title={"Add a Customer"}
          >
            {(toggle) => {
              return (
                <AddItemForm
                  toggleModal={toggle}
                  onAddSubmited={handleCustomerAddSubmited}
                  type={AddFormTypes.customer}
                />
              );
            }}
          </AddItemFormModal>
        )}
      </div>
    </Layout>
  );
}
