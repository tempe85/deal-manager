import React, { useState, useEffect } from "react";
import Layout from "../Containers/Layout";
import { textFilter } from "react-bootstrap-table2-filter";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import {
  IRestaurantChainLocation,
  IChainLocationAddRequest,
  IChainLocationUpdateRequest,
} from "../Interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import DataEntityTable from "./Components/DataTable";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import EditItemFormModalHelper from "./Components/EditItemFormModalHelper";
import {
  getLocations,
  deleteLocationRequest,
  addLocationRequest,
  updateLocationRequest,
} from "../API/Api";
import { toast } from "react-toastify";
import Loading from "./Components/Loading";

export default function RestaurantChainLocations() {
  const columns = [
    {
      dataField: "chain_location_id",
      text: "Chain Location Id",
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
      formatter: (cellContent: any, row: IRestaurantChainLocation) => (
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          color="red"
          icon={faMinusCircle}
          onClick={() => deleteLocation(row)}
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
  >();
  const [editModalData, setEditModalData] = useState<
    IRestaurantChainLocation | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //Triggers fetchTransactions
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      fetchLocations();
    }
  }, [isLoading]);

  const fetchLocations = async () => {
    try {
      const locations = await getLocations();
      setChainLocationData(locations);
      setIsLoading(false);
    } catch (error) {
      toast.error(`Unable to fetch transactions. ${error}`);
      setIsLoading(false);
    }
  };

  const handleAddItemToggle = () => {
    setAddItemModalOpen(!addItemModalOpen);
  };
  const handleOpenAddItemModal = () => {
    setAddItemModalOpen(true);
  };

  const deleteLocation = async (chainLocation: IRestaurantChainLocation) => {
    const { chain_location_id } = chainLocation;
    try {
      const response = await deleteLocationRequest(chain_location_id);
      if (response.affectedRows <= 0) {
        toast.error(
          `Error deleting location Id ${chain_location_id}. Zero rows were updated in query`
        );
        return;
      }
      await fetchLocations();
      //TODO: Figure out why useState is being dumb
      // setChainLocationData(
      //   chainLocationData?.filter(
      //     (p) => !(p.chain_location_id === deal.chain_location_id)
      //   )
      // );
      toast.success(`Deleted transaction ${chain_location_id}!`);
    } catch (error) {
      toast.error(
        `Error deleting transaction Id ${chain_location_id}: ${error}`,
        {
          autoClose: false,
        }
      );
    }
  };

  const isValidLocationAddRequest = (
    config: Partial<IRestaurantChainLocation>
  ) => {
    if (config.chain_name && config.city && config.state) {
      return true;
    }
    return false;
  };

  const getLocationAddRequestObject = (
    config: Partial<IRestaurantChainLocation>
  ) => {
    const locationAddRequest: IChainLocationAddRequest = {
      chain_name: config.chain_name!,
      city: config.city!,
      state: config.state!,
    };
    return locationAddRequest;
  };
  const getRestaurantChainLocationObject = (
    addRequest: IChainLocationAddRequest,
    insertId: number
  ): IRestaurantChainLocation => {
    const chainLocationObject: IRestaurantChainLocation = {
      chain_location_id: insertId,
      chain_name: addRequest.chain_name,
      city: addRequest.city,
      state: addRequest.state,
    };
    return chainLocationObject;
  };

  const handleAddEntitySubmited = async (
    config: Partial<IRestaurantChainLocation>
  ) => {
    if (!isValidLocationAddRequest(config)) {
      toast.error(`Invalid add request. Some fields are undefined.`, {
        autoClose: false,
      });
      return;
    } else {
      const addData = getLocationAddRequestObject(config);
      const response = await addLocationRequest(addData);
      if (response.affectedRows > 0) {
        toast.success(`Added location Id: ${response.insertId}!`);
      } else {
        toast.error(`Failed to add location. Affected rows was 0`);
        return;
      }
      const insertId = response.insertId;
      const newLocation = getRestaurantChainLocationObject(addData, insertId);
      setChainLocationData(
        chainLocationData ? [...chainLocationData, newLocation] : [newLocation]
      );
    }
  };

  const [editItemModalIsOpen, setEditItemModalOpen] = useState(false);

  const getLocationEditObject = (
    config: Partial<IRestaurantChainLocation>,
    originalObject: IRestaurantChainLocation
  ): IChainLocationUpdateRequest => {
    const editLocationRequest: IChainLocationUpdateRequest = {
      chain_location_id:
        config.chain_location_id ?? originalObject.chain_location_id,
      chain_name: config.chain_name ?? originalObject.chain_name,
      city: config.city ?? originalObject.city,
      state: config.state ?? originalObject.state,
    };
    return editLocationRequest;
  };

  const handleEntityEditedSubmited = async (
    config: Partial<IRestaurantChainLocation>
  ) => {
    console.log("editing shit", config);
    if (Object.keys(config).length <= 1) {
      toast.info(
        `Did not update transaction ${config?.chain_location_id}, no data was changed`
      );
      return;
    }
    let data: IRestaurantChainLocation[] = [...chainLocationData!];
    let customerIndex = data?.findIndex(
      (p) => p.chain_location_id === config?.chain_location_id
    );
    if (customerIndex === -1) {
      return;
    }
    const locationEditRequest = getLocationEditObject(
      config,
      data[customerIndex]
    );
    try {
      const response = await updateLocationRequest(locationEditRequest);
      if (response.affectedRows <= 0) {
        toast.error(
          `Did not update any rows with edit request for location ${config.chain_location_id}`
        );
      }
      data[customerIndex] = {
        ...data[customerIndex],
        ...config,
      };
      setChainLocationData(data);
      toast.success(`Updated transaction ${config.chain_location_id}!`);
    } catch (error) {
      toast.error(
        `Error updating transaction ${config.chain_location_id}: ${error}`
      );
    }
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
        <Loading isLoading={isLoading}>
          {chainLocationData && (
            <DataEntityTable
              keyField="chain_location_id"
              data={chainLocationData}
              columns={columns}
            />
          )}
        </Loading>
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
