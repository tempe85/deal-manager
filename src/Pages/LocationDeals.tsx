import React, { useState, useEffect } from "react";
import Layout from "../Containers/Layout";
import { textFilter } from "react-bootstrap-table2-filter";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import { ILocationDeal, ILocationDealAddRequest } from "../Interfaces";
import { IsObjectNullOrEmpty } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import DataEntityTable from "./Components/DataTable";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import EditItemFormModalHelper from "./Components/EditItemFormModalHelper";
import Loading from "./Components/Loading";
import {
  getLocationDeals,
  deleteLocationDealRequest,
  addLocationDealsRequest,
} from "../API/Api";
import { toast } from "react-toastify";

//Implementing Location Deal Table

export default function LocationDeals() {
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [editItemModalIsOpen, setEditItemModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dealLocationData, setDealLocationData] = useState<ILocationDeal[]>();

  useEffect(() => {
    //Triggers fetchLocationDeals
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      fetchLocationDeals();
    }
  }, [isLoading]);

  const fetchLocationDeals = async () => {
    try {
      const locationDeals = await getLocationDeals();
      setDealLocationData(locationDeals);
      setIsLoading(false);
    } catch (error) {
      toast.error(`Unable to fetch location deals. ${error}`);
      setIsLoading(false);
    }
  };

  const columns = [
    {
      dataField: "table_key",
      hidden: true,
    },
    {
      dataField: "percent_discount",
      text: "Discount",
      filter: textFilter(),
    },
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
      formatter: (cellContent: any, row: ILocationDeal) => (
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          color="red"
          icon={faMinusCircle}
          onClick={() => deleteLocationDeal(row)}
        />
      ),
    },
  ];

  const handleAddItemToggle = () => {
    setAddItemModalOpen(!addItemModalOpen);
  };

  const handleOpenAddItemModal = () => {
    setAddItemModalOpen(true);
  };

  const deleteLocationDeal = async (locationDeal: ILocationDeal) => {
    const { deal_id, chain_location_id } = locationDeal;
    try {
      const response = await deleteLocationDealRequest(
        chain_location_id,
        deal_id
      );
      if (response.affectedRows <= 0) {
        toast.error(`Error deleting entry. Zero rows were updated in query`);
        return;
      }
      await fetchLocationDeals();
      //TODO: Figure out why useState is being dumb
      // setDealLocationData(
      //   dealLocationData?.filter((p) => !(p.deal_id === deal.deal_id))
      // );
      toast.success(`Deleted location deal!`);
    } catch (error) {
      toast.error(`Error deleting location deal: ${error}`, {
        autoClose: false,
      });
    }
  };

  const getLocationDealAddRequestObject = (config: {
    [key: string]: any;
  }): ILocationDealAddRequest => {
    const locationDealAddRequest: ILocationDealAddRequest = {
      chain_location_id: config.chain_location_id,
      deal_id: config.deal_id,
    };
    return locationDealAddRequest;
  };

  const isValidLocationDealAddRequest = (
    locationDealAddRequest: ILocationDealAddRequest
  ) => {
    if (
      locationDealAddRequest.chain_location_id === undefined ||
      locationDealAddRequest.deal_id === undefined
    ) {
      return false;
    }
    return true;
  };

  const handleAddEntitySubmited = async (config: Partial<ILocationDeal>) => {
    const addData = getLocationDealAddRequestObject(config);
    if (IsObjectNullOrEmpty(addData)) {
      return;
    } else if (!isValidLocationDealAddRequest(addData)) {
      toast.error(`Invalid add request. Some fields are undefined.`, {
        autoClose: false,
      });
      return;
    } else {
      try {
        const response = await addLocationDealsRequest(addData);
        if (response.affectedRows > 0) {
          toast.success(`Added location deal!`);
        } else {
          toast.error(`Failed to add location deal. Affected rows was 0`);
          return;
        }
        const newLocationDeal = {
          ...config,
          table_key: `${config.deal_id}${config.chain_location_id}`,
        } as ILocationDeal;
        setDealLocationData(
          dealLocationData
            ? [...dealLocationData, newLocationDeal]
            : [newLocationDeal]
        );
      } catch (error) {
        toast.error(`Failed to add location deal. ${error}`);
      }
    }
  };

  const handleEntityEditedSubmited = (config: Partial<ILocationDeal>) => {};

  const toggleEditItem = () => {
    setEditItemModalOpen(!editItemModalIsOpen);
  };

  return (
    <Layout>
      <div style={{ padding: "30px", maxWidth: "90%" }}>
        <div style={{ marginBottom: "10px" }}>
          <AddItem
            onClick={handleOpenAddItemModal}
            title={"Add new Location Deal"}
          />
        </div>
        <Loading isLoading={isLoading}>
          {dealLocationData && (
            <DataEntityTable
              keyField="table_key"
              data={dealLocationData}
              columns={columns}
            />
          )}
        </Loading>
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
