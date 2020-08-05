import React, { useState } from "react";
import Layout from "../Containers/Layout";
import { textFilter } from "react-bootstrap-table2-filter";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import { ILocationDeal, IRestaurantChainLocation } from "../Interfaces";
import { IsObjectNullOrEmpty } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { LocationDealsMock } from "../Mocks/LocationDeal.mock";
import DataEntityTable from "./Components/DataTable";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import EditItemFormModalHelper from "./Components/EditItemFormModalHelper";

import {
  FormatterChainName,
  FormatterCity,
  FormatterState,
  FormatterDeal,
} from "../Utils/Formatters/Formatter";

export default function LocationDeals() {
  const columns = [
    {
      dataField: "dl1",
      text: "Discount",
      filter: textFilter(),
      filterValue: FormatterDeal,
      formatter: FormatterDeal,
    },
    {
      dataField: "cl1",
      text: "Chain Name",
      filter: textFilter(),
      filterValue: FormatterChainName,
      formatter: FormatterChainName,
    },
    {
      dataField: "cl2",
      text: "City",
      filter: textFilter(),
      isDummyField: true,
      filterValue: FormatterCity,
      formatter: FormatterCity,
    },
    {
      dataField: "cl3",
      text: "State",
      filter: textFilter(),
      isDummyField: true,
      filterValue: FormatterState,
      formatter: FormatterState,
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
  ];

  const openEditItem = (row: ILocationDeal) => {
    setEditItemModalOpen(true);
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
      dealLocationData.filter((p) => !(p.deal_id === deal.deal_id))
    );
  };

  const handleAddEntitySubmited = (config: Partial<ILocationDeal>) => {
    console.log("adding stuff", config);
    const addData = { ...config } as ILocationDeal;
    if (IsObjectNullOrEmpty(addData)) {
      return;
    } else {
      setDealLocationData([...dealLocationData, addData]);
    }
  };
  const [editItemModalIsOpen, setEditItemModalOpen] = useState(false);

  const handleEntityEditedSubmited = (config: Partial<ILocationDeal>) => {};

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
          keyField="deal_id"
          data={dealLocationData}
          columns={columns}
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
