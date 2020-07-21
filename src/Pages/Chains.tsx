import React, { useState } from "react";
import Layout from "../Containers/Layout";
import { textFilter } from "react-bootstrap-table2-filter";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import { IRestaurantChain } from "../Interfaces";
import { IsObjectNullOrEmpty } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import { ChainMockList } from "../Mocks/Chains.mock";
import DataEntityTable from "./Components/DataTable";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import EditItemFormModalHelper from "./Components/EditItemFormModalHelper";

export default function Deals() {
  const columns = [
    {
      dataField: "chainName",
      text: "Restaurant Chain Name",
      filter: textFilter(),
    },
    {
      dataField: "df1",
      isDummyField: true,
      text: "Remove",
      editable: false,
      formatter: (cellContent: any, row: IRestaurantChain) => (
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
      formatter: (cellContent: any, row: IRestaurantChain) => (
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          color="green"
          icon={faEdit}
          onClick={() => openEditItem(row)}
        />
      ),
    },
  ];

  const openEditItem = (row: IRestaurantChain) => {
    setEditItemModalOpen(true);
  };

  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [chainData, setChainData] = useState<IRestaurantChain[]>(ChainMockList);

  const handleAddItemToggle = () => {
    setAddItemModalOpen(!addItemModalOpen);
  };
  const handleOpenAddItemModal = () => {
    setAddItemModalOpen(true);
  };
  const handleRemoveEntity = (chainName: IRestaurantChain) => {
    setChainData(
      chainData.filter((p) => !(p.chainName === chainName.chainName))
    );
  };

  const handleAddEntitySubmited = (config: {}) => {
    const addData = { ...config } as IRestaurantChain;
    if (IsObjectNullOrEmpty(addData)) {
      return;
    } else {
      setChainData([...chainData, addData]);
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
            title={"Add new Restaurant Chain"}
          />
        </div>
        <DataEntityTable
          keyField="chainName"
          data={chainData}
          columns={columns}
          afterSaveCell={handleCellEdited}
        />
        <AddItemFormModalHelper
          handleAddEntitySubmited={handleAddEntitySubmited}
          formType={AddFormTypes.restaurantChain}
          handleAddItemToggle={handleAddItemToggle}
          addItemModalOpen={addItemModalOpen}
          title={"Add a New Restaurant Chain"}
        />
        <EditItemFormModalHelper
          handleSubmit={handleEntityEditedSubmited}
          formType={AddFormTypes.customer}
          title={"Edit a Restaurant Chain"}
          editItemModalIsOpen={editItemModalIsOpen}
          handleToggle={toggleEditItem}
        />
      </div>
    </Layout>
  );
}
