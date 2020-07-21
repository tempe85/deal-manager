import React, { useState } from "react";
import Layout from "../Containers/Layout";
import { textFilter } from "react-bootstrap-table2-filter";
import DealsMockList from "../Mocks/Deals.mock";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import { IDeal } from "../Interfaces";
import { IsObjectNullOrEmpty } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import DataEntityTable from "./Components/DataTable";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import EditItemFormModalHelper from "./Components/EditItemFormModalHelper";

export default function Deals() {
  const columns = [
    {
      dataField: "dealId",
      text: "Deal Id",
      filter: textFilter(),
    },
    {
      dataField: "percentDiscount",
      text: "Percent Discount",
      filter: textFilter(),
    },
    {
      dataField: "df1",
      isDummyField: true,
      text: "Remove",
      editable: false,
      formatter: (cellContent: any, row: IDeal) => (
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
      formatter: (cellContent: any, row: IDeal) => (
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          color="green"
          icon={faEdit}
          onClick={() => openEditItem(row)}
        />
      ),
    },
  ];

  const openEditItem = (row: IDeal) => {
    setEditItemModalOpen(true);
  };

  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [dealData, setDealData] = useState<IDeal[]>(DealsMockList);

  const handleAddItemToggle = () => {
    setAddItemModalOpen(!addItemModalOpen);
  };
  const handleOpenAddItemModal = () => {
    setAddItemModalOpen(true);
  };
  const handleRemoveEntity = (deal: IDeal) => {
    setDealData(dealData.filter((p) => !(p.dealId === deal.dealId)));
  };

  const handleAddEntitySubmited = (config: {}) => {
    const addData = { ...config } as IDeal;
    if (IsObjectNullOrEmpty(addData)) {
      return;
    } else {
      setDealData([...dealData, addData]);
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
          <AddItem onClick={handleOpenAddItemModal} title={"Add new Deal"} />
        </div>
        <DataEntityTable
          keyField="dealId"
          data={dealData}
          columns={columns}
          afterSaveCell={handleCellEdited}
        />
        <AddItemFormModalHelper
          handleAddEntitySubmited={handleAddEntitySubmited}
          formType={AddFormTypes.deal}
          handleAddItemToggle={handleAddItemToggle}
          addItemModalOpen={addItemModalOpen}
          title={"Add a New Deal"}
        />
        <EditItemFormModalHelper
          handleSubmit={handleEntityEditedSubmited}
          formType={AddFormTypes.customer}
          title={"Edit a Deal"}
          editItemModalIsOpen={editItemModalIsOpen}
          handleToggle={toggleEditItem}
        />
      </div>
    </Layout>
  );
}
