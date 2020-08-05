import React, { useState, useEffect } from "react";
import Layout from "../Containers/Layout";
import { textFilter } from "react-bootstrap-table2-filter";
import AddItem from "../Components/AddItem";
import { AddFormTypes } from "../Enums";
import { IRestaurantChain } from "../Interfaces";
import { IsObjectNullOrEmpty } from "../Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { ChainMockList } from "../Mocks/Chains.mock";
import DataEntityTable from "./Components/DataTable";
import AddItemFormModalHelper from "./Components/AddItemFormModalHelper";
import { getChains, deleteChainRequest, addChainRequest } from "../API/Api";
import { toast } from "react-toastify";
import Loading from "./Components/Loading";

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
  const [chainData, setChainData] = useState<IRestaurantChain[]>(ChainMockList);

  const handleAddItemToggle = () => {
    setAddItemModalOpen(!addItemModalOpen);
  };
  const handleOpenAddItemModal = () => {
    setAddItemModalOpen(true);
  };

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
      setIsLoading(true);
      toast.success(`Deleted chain ${chain_name}!`);
    } catch (error) {
      toast.error(`Error deleting ${chain_name}: ${error}`, {
        autoClose: false,
      });
    }
  };

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
      setChainData([...chainData, { chain_name: chainName }]);
      toast.success(`Added chain ${chainName}!`);
    } catch (error) {
      toast.error(`Unable to add chain: ${error}`, {
        autoClose: false,
      });
    }
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
            <DataEntityTable
              keyField="chain_name"
              data={chainData}
              columns={columns}
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
