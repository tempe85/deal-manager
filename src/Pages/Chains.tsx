import React, { useState, useEffect } from "react";
import Layout from "../Containers/Layout";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import { IRestaurantChain } from "../Interfaces";
import { IsObjectNullOrEmpty } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import {
  getChains,
  deleteChainRequest,
  addChainRequest,
  filterChainsAsync,
} from "../API/Api";
import { toast } from "react-toastify";
import Loading from "./Components/Loading";
import BootstrapTable from "react-bootstrap-table-next";

//Implementing Restaurant Chain Table

export default function Chains() {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    //Triggers fetchChains
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      fetchChains();
    }
  }, [isLoading]);

  //Implementing Display for Restaurant Chain
  const fetchChains = async () => {
    try {
      const chains = await getChains();
      setChainData(chains);
      setIsLoading(false);
    } catch (error) {
      toast.error(`Unable to fetch chains. ${error}`);
      setIsLoading(false);
    }
  };

  const columns = [
    {
      dataField: "chain_name",
      text: "Restaurant Chain Name",
      filter: textFilter(),
    },
    {
      dataField: "df1",
      isDummyField: true,
      text: "Remove",
      editable: false,
      formatter: (cellContent: any, row: IRestaurantChain) => (
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          color="red"
          icon={faMinusCircle}
          onClick={() => deleteChain(row)}
        />
      ),
    },
  ];
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [chainData, setChainData] = useState<IRestaurantChain[]>();

  const handleAddItemToggle = () => {
    setAddItemModalOpen(!addItemModalOpen);
  };
  const handleOpenAddItemModal = () => {
    setAddItemModalOpen(true);
  };

  //Implementing Delete for Restaurant Chain
  const deleteChain = async (restaurantChain: IRestaurantChain) => {
    console.log(restaurantChain);
    const { chain_name } = restaurantChain;
    try {
      const response = await deleteChainRequest(chain_name);
      if (response.affectedRows <= 0) {
        toast.error(
          `Error deleting ${chain_name}. Zero rows were updated in query`
        );
        return;
      }
      await fetchChains();
      toast.success(`Deleted chain ${chain_name}!`);
    } catch (error) {
      toast.error(`Error deleting ${chain_name}: ${error}`, {
        autoClose: false,
      });
    }
  };

    //Implementing Filter for Restaurant Chain
  const fetchfilterChains = async (chainName: string) => {
    try {
      console.log("chainname", chainName);
      const chains = await filterChainsAsync(chainName);
      console.log("fetched chains", chains);
      setChainData(chains);
      setIsLoading(false);
    } catch (error) {
      toast.error(`Unable to fetch chains. ${error}`);
      setIsLoading(false);
    }
  };

    //Implementing Update for Restaurant Chain
  const handleAddEntitySubmited = async (config: Partial<IRestaurantChain>) => {
    console.log("config", config);
    const addData = { ...config } as IRestaurantChain;
    if (IsObjectNullOrEmpty(addData) || !config.chain_name) {
      toast.error(`Unable to add Chain. Chain has no data`, {
        autoClose: false,
      });
      return;
    } else {
      await addChain(config.chain_name);
    }
  };

  const addChain = async (chainName: string) => {
    try {
      const response = await addChainRequest(chainName);
      if (response.affectedRows <= 0) {
        toast.error(`Unable to add chain, 0 rows were updated in query`);
      }
      setChainData(
        chainData
          ? [...chainData, { chain_name: chainName }]
          : [{ chain_name: chainName }]
      );
      toast.success(`Added chain ${chainName}!`);
    } catch (error) {
      toast.error(`Unable to add chain: ${error}`, {
        autoClose: false,
      });
    }
  };

  const onTableChange = (type: any, { filters }: any) => {
    if (!filters?.chain_name?.filterVal) {
      fetchChains();
      return;
    }
    fetchfilterChains(filters.chain_name.filterVal);
  };

  return (
    <Layout>
      <div style={{ padding: "30px", maxWidth: "90%" }}>
        <div style={{ marginBottom: "10px" }}>
          <AddItem
            onClick={handleOpenAddItemModal}
            title={"Add new Restaurant Chain"}
          />
        </div>
        <Loading isLoading={isLoading}>
          {chainData && (
            <BootstrapTable
              remote={{ filter: true }}
              keyField={"chain_name"}
              data={chainData}
              columns={columns}
              filter={filterFactory()}
              bordered
              onTableChange={onTableChange}
              striped
            />
          )}
        </Loading>
        <AddItemFormModalHelper
          handleAddEntitySubmited={handleAddEntitySubmited}
          formType={AddFormTypes.restaurantChain}
          handleAddItemToggle={handleAddItemToggle}
          addItemModalOpen={addItemModalOpen}
          title={"Add a New Restaurant Chain"}
        />
      </div>
    </Layout>
  );
}
