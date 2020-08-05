import React from "react";
import Layout from "../Containers/Layout";
import { textFilter } from "react-bootstrap-table2-filter";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import { IDeal } from "../Interfaces";
import { IsObjectNullOrEmpty } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import DataEntityTable from "./Components/DataTable";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import EditItemFormModalHelper from "./Components/EditItemFormModalHelper";
import {
  getDeals,
  addDealRequest,
  editDealRequest,
  deleteDealRequest,
} from "../API/Api";
import Loading from "./Components/Loading";
import { toast } from "react-toastify";

interface IState {
  isLoading: boolean;
  addItemModalOpen: boolean;
  dealData: IDeal[];
  editModalData: IDeal | undefined;
  editItemModalIsOpen: boolean;
}

export default class Deals extends React.Component<{}, IState> {
  public readonly state: IState = {
    isLoading: false,
    addItemModalOpen: false,
    dealData: [] as IDeal[],
    editModalData: undefined,
    editItemModalIsOpen: false,
  };

  componentDidMount() {
    this.fetchDeals();
  }

  private columns = [
    {
      dataField: "percent_discount",
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
          onClick={() => this.deleteDeal(row)}
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
          onClick={() => this.openEditItem(row)}
        />
      ),
    },
  ];

  private openEditItem = (row: IDeal) => {
    this.setState({
      editModalData: row,
      editItemModalIsOpen: true,
    });
  };

  private handleAddItemToggle = () => {
    this.setState((prevState) => ({
      addItemModalOpen: !prevState.addItemModalOpen,
    }));
  };
  private handleOpenAddItemModal = () => {
    this.setState({
      addItemModalOpen: true,
    });
  };

  private deleteDeal = async (deal: IDeal) => {
    try {
      await deleteDealRequest(deal.deal_id);
      const filteredData = this.state.dealData.filter(
        (p) => p.deal_id !== deal.deal_id
      );
      this.setState({
        dealData: filteredData,
      });
      toast.success(`Deleted deal ${deal.deal_id}!`);
    } catch (error) {
      toast.error(`Error deleting deal id ${deal.deal_id}: ${error}`, {
        autoClose: false,
      });
    }
  };

  private fetchDeals = () => {
    this.setState(
      {
        isLoading: true,
      },
      async () => {
        try {
          const deals = await getDeals();
          this.setState({
            dealData: deals,
            isLoading: false,
          });
        } catch (error) {
          this.setState({
            isLoading: false,
          });
        }
      }
    );
  };

  private addDeal = async (percent_discount: number) => {
    try {
      const response = await addDealRequest(percent_discount);
      const deal_id = response.insertId;
      const newDeal: IDeal = { percent_discount, deal_id };
      this.setState({
        dealData: [...this.state.dealData, newDeal],
      });
      toast.success(`Added deal ${deal_id} with discount ${percent_discount}!`);
    } catch (error) {
      toast.error(`Unable to add deal: ${error}`, {
        autoClose: false,
      });
    }
  };

  private editDeal = async (newDeal: IDeal) => {
    try {
      await editDealRequest(newDeal);
      let data: IDeal[] = [...this.state.dealData];
      let dealIndex = data?.findIndex((p) => p.deal_id === newDeal?.deal_id);
      if (dealIndex === -1) {
        return;
      }
      data[dealIndex] = {
        ...data[dealIndex],
        ...newDeal,
      };
      toast.success(
        `Updated deal id ${newDeal.deal_id} from a discount of ${this.state.dealData[dealIndex].percent_discount}% to ${newDeal.percent_discount}%`
      );
      this.setState({
        dealData: data,
      });
    } catch (error) {
      toast.error(`Error editing deal id ${newDeal.deal_id}: ${error}`, {
        autoClose: false,
      });
    }
  };

  private handleAddEntitySubmited = async (config: {}) => {
    const addData = { ...config } as IDeal;
    if (IsObjectNullOrEmpty(addData)) {
      toast.error(`Unable to add deal. Deal entry has no data`, {
        autoClose: false,
      });
      return;
    } else {
      await this.addDeal(addData.percent_discount);
    }
  };

  private toggleEditItem = () => {
    this.setState((prevState) => ({
      editItemModalIsOpen: !prevState.editItemModalIsOpen,
    }));
  };

  render() {
    const {
      isLoading,
      dealData,
      addItemModalOpen,
      editItemModalIsOpen,
      editModalData,
    } = this.state;
    return (
      <Layout>
        <div style={{ padding: "30px", maxWidth: "90%" }}>
          <div style={{ marginBottom: "10px" }}>
            <AddItem
              onClick={this.handleOpenAddItemModal}
              title={"Add new Deal"}
            />
          </div>
          <Loading isLoading={isLoading}>
            <DataEntityTable
              keyField="deal_id"
              data={dealData}
              columns={this.columns}
            />
          </Loading>
          <AddItemFormModalHelper
            handleAddEntitySubmited={this.handleAddEntitySubmited}
            formType={AddFormTypes.deal}
            handleAddItemToggle={this.handleAddItemToggle}
            addItemModalOpen={addItemModalOpen}
            title={"Add a New Deal"}
          />
          <EditItemFormModalHelper
            handleSubmit={this.editDeal}
            formType={AddFormTypes.deal}
            title={"Edit a Deal"}
            editItemModalIsOpen={editItemModalIsOpen}
            handleToggle={this.toggleEditItem}
            data={editModalData}
          />
        </div>
      </Layout>
    );
  }
}
