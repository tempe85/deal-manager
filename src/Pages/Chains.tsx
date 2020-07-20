import React, { useState } from "react";
import Layout from "../Containers/Layout";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import DealsMockList from "../Mocks/Deals.mock";
import AddItem from "../Components/AddItem";
import AddItemFormModal from "../Modals/AddItemFormModal";
import AddItemForm from "../Components/Forms/AddItemForm";
import { AddFormTypes } from "../Enums";
import { IRestaurantChain } from "../Interfaces";
import { IsObjectNullOrEmpty } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { ChainMockList } from "../Mocks/Chains.mock";

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
      formatter: (cellContent: any, row: IRestaurantChain) => (
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          color="red"
          icon={faMinusCircle}
          onClick={() => handleRemoveEntity(row)}
        />
      ),
    },
  ];

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

  return (
    <Layout>
      <div style={{ padding: "30px", maxWidth: "90%" }}>
        <div style={{ marginBottom: "10px" }}>
          <AddItem onClick={handleOpenAddItemModal} />
        </div>
        <BootstrapTable
          keyField="chainName"
          data={chainData}
          columns={columns}
          filter={filterFactory()}
          bordered
          striped
        />
        {addItemModalOpen && (
          <AddItemFormModal
            isOpen={addItemModalOpen}
            toggle={handleAddItemToggle}
            title={"Add a New Restaurant Chain"}
          >
            {(toggle) => {
              return (
                <AddItemForm
                  toggleModal={toggle}
                  onAddSubmited={handleAddEntitySubmited}
                  type={AddFormTypes.restaurantChain}
                />
              );
            }}
          </AddItemFormModal>
        )}
      </div>
    </Layout>
  );
}
