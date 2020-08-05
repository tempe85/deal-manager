import { ChainMockList } from "../../Mocks";
import { ISelect } from "../../Interfaces/ISelect";
import { ICustomerSelection, IDeal } from "../../Interfaces";
import {
  getCustomerSelections,
  getChainLocationSelections,
  getDeals,
} from "../../API/Api";
import { IChainLocationSelection } from "../../Interfaces/IChainLocationSelection";
import { toast } from "react-toastify";

export const GetCustomerSelectionsAsync = async (): Promise<ISelect[]> => {
  let customerSelections: ICustomerSelection[] = [];
  try {
    customerSelections = await getCustomerSelections();
    let selections: ISelect[] = [];
    customerSelections.forEach((p) => {
      selections.push({
        value: {
          discount_card_number: p.discount_card_number,
          last_name: p.last_name,
          first_name: p.first_name,
        },
        label: `${p.discount_card_number}: ${p.last_name}, ${p.first_name}`,
      });
    });
    return selections;
  } catch (errror) {
    toast.error("unable to fetch customer selections", {
      autoClose: false,
    });
    return Promise.reject();
  }
};

export const GetChainLocationSelectionsAsync = async (): Promise<ISelect[]> => {
  let chainLocationSelections: IChainLocationSelection[] = [];
  try {
    chainLocationSelections = await getChainLocationSelections();
    let selections: ISelect[] = [];
    chainLocationSelections.forEach((p) => {
      selections.push({
        value: {
          chain_location_id: p.chain_location_id,
          chain_name: p.chain_name,
          city: p.city,
          state: p.state,
        },
        label: `${p.chain_location_id}: ${p.chain_name} ${p.city}, ${p.state}`,
      });
    });
    return selections;
  } catch (error) {
    return Promise.reject();
  }
};

export const GetDealSelectionsAsync = async (): Promise<ISelect[]> => {
  let dealSelections: IDeal[] = [];
  try {
    dealSelections = await getDeals();
    let selections: ISelect[] = [];
    dealSelections.forEach((p) => {
      selections.push({
        value: {
          deal_id: p.deal_id,
          percent_discount: p.percent_discount,
        },
        label: `${p.deal_id}: ${p.percent_discount}%`,
      });
    });
    return selections;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ChainSelections = (): ISelect[] => {
  let selections: ISelect[] = [];
  ChainMockList.forEach((p) => {
    selections.push({
      value: { chain_name: p.chain_name },
      label: p.chain_name,
    });
  });
  return selections;
};
