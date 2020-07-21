import React, { useState } from "react";
import Layout from "../Containers/Layout";
import { textFilter } from "react-bootstrap-table2-filter";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import { ILocationDeal } from "../Interfaces";
import { IsObjectNullOrEmpty } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import { LocationDealsMock } from "../Mocks/LocationDeal.mock";
import DataEntityTable from "./Components/DataTable";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import EditItemFormModalHelper from "./Components/EditItemFormModalHelper";

export default function LocationDeals() {
  const columns = [
    {
      dataField: "dealId",
      text: "Deal Id",
      filter: textFilter(),
    },
    {
      dataField: "chainLocationId",
      text: "Chain Location Id",
      filter: textFilter(),
    },
    {
      dataField: "df1",
      isDummyField: true,
      text: "Remove",
      editable: false,
      formatter: (cellContent: any, row: ILocationDeal) => (
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
      formatter: (cellContent: any, row: ILocationDeal) => (
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          color="green"
          icon={faEdit}
          onClick={() => openEditItem(row)}
        />
      ),
    },
  ];

  const openEditItem = (row: ILocationDeal) => {
    setEditItemModalOpen(true);
  };

  const handleCellEdited = (oldValue: any, newValue: any) => {
    console.log(oldValue, newValue);
  };

  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [dealLocationData, setDealLocationData] = useState<ILocationDeal[]>(
    LocationDealsMock
  );

  const handleAddItemToggle = () => {
    setAddItemModalOpen(!addItemModalOpen);
  };
  const handleOpenAddItemModal = () => {
    setAddItemModalOpen(true);
  };
  const handleRemoveEntity = (deal: ILocationDeal) => {
    setDealLocationData(
      dealLocationData.filter((p) => !(p.dealId === deal.dealId))
    );
  };

  const handleAddEntitySubmited = (config: {}) => {
    const addData = { ...config } as ILocationDeal;
    if (IsObjectNullOrEmpty(addData)) {
      return;
    } else {
      setDealLocationData([...dealLocationData, addData]);
    }
  };
  const [editItemModalIsOpen, setEditItemModalOpen] = useState(false);
  const handleEntityEditedSubmited = (config: {}) => {};
  const toggleEditItem = () => {
    setEditItemModalOpen(!editItemModalIsOpen);
  };

  //NOTE: Need to add an actual key for this table
  return (
    <Layout>
      <div style={{ padding: "30px", maxWidth: "90%" }}>
        <div style={{ marginBottom: "10px" }}>
          <AddItem
            onClick={handleOpenAddItemModal}
            title={"Add new Location Deal"}
          />
        </div>
        <DataEntityTable
          keyField="dealId"
          data={dealLocationData}
          columns={columns}
          afterSaveCell={handleCellEdited}
        />
        <AddItemFormModalHelper
          handleAddEntitySubmited={handleAddEntitySubmited}
          formType={AddFormTypes.locationDeal}
          handleAddItemToggle={handleAddItemToggle}
          addItemModalOpen={addItemModalOpen}
          title={"Add a New Location Deal"}
        />
        <EditItemFormModalHelper
          handleSubmit={handleEntityEditedSubmited}
          formType={AddFormTypes.customer}
          title={"Edit a Location Deal"}
          editItemModalIsOpen={editItemModalIsOpen}
          handleToggle={toggleEditItem}
        />
      </div>
    </Layout>
  );
}
