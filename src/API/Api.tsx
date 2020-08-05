import axios from "axios";
import {
  IDeal,
  ICustomer,
  IAddApiResponse,
  ICustomerRestaurantTransaction,
  ICustomerSelection,
  ITransactionAddRequest,
  ITransactionEditRequest,
  IRestaurantChain,
  IRestaurantChainLocation,
  IChainLocationAddRequest,
  IChainLocationUpdateRequest,
} from "../Interfaces";
import { IChainLocationSelection } from "../Interfaces/IChainLocationSelection";

const baseUrl = "http://localhost:8420";

export const getDeals = async () => {
  return axios
    .get<IDeal[]>(`${baseUrl}/deals`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const editDealRequest = async (newDeal: IDeal) => {
  return axios
    .put(
      `${baseUrl}/deals?percent_discount=${newDeal.percent_discount}&deal_id=${newDeal.deal_id}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteDealRequest = async (deal_id: number) => {
  return axios
    .delete(`${baseUrl}/deals?deal_id=${deal_id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const addDealRequest = async (percent_discount: number) => {
  return axios
    .post<IAddApiResponse>(
      `${baseUrl}/deals?percent_discount=${percent_discount}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getCustomers = async () => {
  return axios
    .get<ICustomer[]>(`${baseUrl}/customers/select`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getTransactions = async () => {
  return axios
    .get<ICustomerRestaurantTransaction[]>(`${baseUrl}/transactions`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteTransactionRequest = async (transaction_id: number) => {
  return axios
    .delete<IAddApiResponse>(
      `${baseUrl}/transactions?transaction_id=${transaction_id}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const addTransactionRequest = async (
  newTransaction: ITransactionAddRequest
) => {
  return axios
    .post<IAddApiResponse>(`${baseUrl}/transactions`, newTransaction)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const editTransactionRequest = async (
  updatedTransaction: ITransactionEditRequest
) => {
  return axios
    .put<IAddApiResponse>(`${baseUrl}/transactions`, updatedTransaction)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getCustomerSelections = async () => {
  return axios
    .get<ICustomerSelection[]>(`${baseUrl}/transactions/modal/customers`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getChainLocationSelections = async () => {
  return axios
    .get<IChainLocationSelection[]>(`${baseUrl}/transactions/modal/locations`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getChains = async () => {
  return axios
    .get<IRestaurantChain[]>(`${baseUrl}/chains`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
export const deleteChainRequest = async (chainName: string) => {
  return axios
    .delete<IAddApiResponse>(`${baseUrl}/chains?chain_name=${chainName}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const addChainRequest = async (chainName: string) => {
  return axios
    .post<IAddApiResponse>(`${baseUrl}/chains`, {
      chain_name: chainName,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getLocations = async () => {
  return axios
    .get<IRestaurantChainLocation[]>(`${baseUrl}/locations`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const addLocationRequest = async (
  chainLocationRequest: IChainLocationAddRequest
) => {
  return axios
    .post<IAddApiResponse>(`${baseUrl}/locations`, chainLocationRequest)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const updateLocationRequest = async (
  chainLocationRequest: IChainLocationUpdateRequest
) => {
  return axios
    .put<IAddApiResponse>(`${baseUrl}/locations`, chainLocationRequest)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteLocationRequest = async (chainLocationId: number) => {
  return axios
    .delete<IAddApiResponse>(
      `${baseUrl}/locations?chain_location_id=${chainLocationId}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
