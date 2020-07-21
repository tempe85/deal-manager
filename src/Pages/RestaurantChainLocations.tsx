import React, { useState } from "react";
import Layout from "../Containers/Layout";
import { textFilter } from "react-bootstrap-table2-filter";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import { IRestaurantChainLocation } from "../Interfaces";
import { IsObjectNullOrEmpty } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RestaurantChainLocationMock } from "../Mocks/RestaurantChainLocation.mock";
import DataEntityTable from "./Components/DataTable";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import EditItemFormModalHelper from "./Components/EditItemFormModalHelper";

export default function RestaurantChainLocations() {
  const columns = [
    {
      dataField: "chainLocationId",
      text: "Chain Location Id",
      filter: textFilter(),
    },
    {
      dataField: "chainName",
      text: "Chain Name",
      filter: textFilter(),
    },
    {
      dataField: "cityStateName",
      text: "City/State Name",
      filter: textFilter(),
    },
    {
      dataField: "df1",
      isDummyField: true,
      text: "Remove",
      editable: false,
      formatter: (cellContent: any, row: IRestaurantChainLocation) => (
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
      formatter: (cellContent: any, row: IRestaurantChainLocation) => (
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          color="green"
          icon={faEdit}
          onClick={() => openEditItem(row)}
        />
      ),
    },
  ];

  const openEditItem = (row: IRestaurantChainLocation) => {
    setEditItemModalOpen(true);
  };

  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [chainLocationData, setChainLocationData] = useState<
    IRestaurantChainLocation[]
  >(RestaurantChainLocationMock);

  const handleAddItemToggle = () => {
    setAddItemModalOpen(!addItemModalOpen);
  };
  const handleOpenAddItemModal = () => {
    setAddItemModalOpen(true);
  };
  const handleRemoveEntity = (deal: IRestaurantChainLocation) => {
    setChainLocationData(
      chainLocationData.filter(
        (p) => !(p.chainLocationId === deal.chainLocationId)
      )
    );
  };

  const handleAddEntitySubmited = (config: {}) => {
    const addData = { ...config } as IRestaurantChainLocation;
    if (IsObjectNullOrEmpty(addData)) {
      return;
    } else {
      setChainLocationData([...chainLocationData, addData]);
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
            title={"Add new Restaurant Chain Location"}
          />
        </div>
        <DataEntityTable
          keyField="chainLocationId"
          data={chainLocationData}
          columns={columns}
          afterSaveCell={handleCellEdited}
        />
        <AddItemFormModalHelper
          handleAddEntitySubmited={handleAddEntitySubmited}
          formType={AddFormTypes.restaurantChainLocation}
          handleAddItemToggle={handleAddItemToggle}
          addItemModalOpen={addItemModalOpen}
          title={"Add a New Restaurant Chain Location"}
        />
        <EditItemFormModalHelper
          handleSubmit={handleEntityEditedSubmited}
          formType={AddFormTypes.customer}
          title={"Edit a Restaurant Chain Location"}
          editItemModalIsOpen={editItemModalIsOpen}
          handleToggle={toggleEditItem}
        />
      </div>
    </Layout>
  );
}
