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
    setEditModalData(row);
    setEditItemModalOpen(true);
  };

  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [chainLocationData, setChainLocationData] = useState<
    IRestaurantChainLocation[]
  >(RestaurantChainLocationMock);
  const [editModalData, setEditModalData] = useState<
    IRestaurantChainLocation | undefined
  >(undefined);

  const handleAddItemToggle = () => {
    setAddItemModalOpen(!addItemModalOpen);
  };
  const handleOpenAddItemModal = () => {
    setAddItemModalOpen(true);
  };
  const handleRemoveEntity = (deal: IRestaurantChainLocation) => {
    setChainLocationData(
      chainLocationData.filter(
        (p) => !(p.chain_location_id === deal.chain_location_id)
      )
    );
  };

  const handleAddEntitySubmited = (config: {}) => {
    const addData = { ...config } as IRestaurantChainLocation;
    if (IsObjectNullOrEmpty(addData)) {
      return;
    } else {
      const maxLocationId = Math.max(
        ...chainLocationData.map((p) => p.chain_location_id)
      );
      addData.chain_location_id = maxLocationId + 1;
      setChainLocationData([...chainLocationData, addData]);
    }
  };

  const [editItemModalIsOpen, setEditItemModalOpen] = useState(false);

  const handleEntityEditedSubmited = (
    config: Partial<IRestaurantChainLocation>
  ) => {
    let data: IRestaurantChainLocation[] = [...chainLocationData];
    let customerIndex = data?.findIndex(
      (p) => p.chain_location_id === config?.chain_location_id
    );
    console.log("config", config, "data", data);
    if (customerIndex === -1) {
      return;
    }
    data[customerIndex] = {
      ...data[customerIndex],
      ...config,
    };
    setChainLocationData(data);
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
            title={"Add new Restaurant Chain Location"}
          />
        </div>
        <DataEntityTable
          keyField="chain_location_id"
          data={chainLocationData}
          columns={columns}
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
          formType={AddFormTypes.restaurantChainLocation}
          title={"Edit a Restaurant Chain Location"}
          editItemModalIsOpen={editItemModalIsOpen}
          handleToggle={toggleEditItem}
          data={editModalData}
        />
      </div>
    </Layout>
  );
}
