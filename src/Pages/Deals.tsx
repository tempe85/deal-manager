import React, { useState } from "react";
import Layout from "../Containers/Layout";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import DealsMockList from "../Mocks/Deals.mock";
import AddItem from "../Components/AddItem";
import AddItemFormModal from "../Modals/AddItemFormModal";
import AddItemForm from "../Components/Forms/AddItemForm";
import { AddFormTypes } from "../Enums";
import { IDeal } from "../Interfaces";
import { IsObjectNullOrEmpty } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";

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
      formatter: (cellContent: any, row: IDeal) => (
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

  return (
    <Layout>
      <div style={{ padding: "30px", maxWidth: "90%" }}>
        <div style={{ marginBottom: "10px" }}>
          <AddItem onClick={handleOpenAddItemModal} />
        </div>
        <BootstrapTable
          keyField="discountCardNumber"
          data={dealData}
          columns={columns}
          filter={filterFactory()}
          bordered
          striped
        />
        {addItemModalOpen && (
          <AddItemFormModal
            isOpen={addItemModalOpen}
            toggle={handleAddItemToggle}
            title={"Add a New Deal"}
          >
            {(toggle) => {
              return (
                <AddItemForm
                  toggleModal={toggle}
                  onAddSubmited={handleAddEntitySubmited}
                  type={AddFormTypes.deal}
                />
              );
            }}
          </AddItemFormModal>
        )}
      </div>
    </Layout>
  );
}
