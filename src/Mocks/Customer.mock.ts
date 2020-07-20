import { ICustomer } from "../Interfaces";
import { uniqueNamesGenerator, Config, names } from "unique-names-generator";

const config: Config = {
  dictionaries: [names],
};

const list: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const CustomerMockList = [
  {
    discountCardNumber: 1,
    birthDate: "10/18/2003",
    lastName: "Ted",
    firstName: "Johnson",
  },
  {
    discountCardNumber: 2,
    birthDate: "9/10/2003",
    lastName: "Kimberly",
    firstName: "Rose",
  },
  {
    discountCardNumber: 3,
    birthDate: "2/01/2004",
    lastName: "Mike",
    firstName: "Davis",
  },
  {
    discountCardNumber: 4,
    birthDate: "10/15/2003",
    lastName: "Megan",
    firstName: "Harris",
  },
  {
    discountCardNumber: 5,
    birthDate: "01/12/2003",
    lastName: "John",
    firstName: "Johnson",
  },
  {
    discountCardNumber: 6,
    birthDate: "02/05/2003",
    lastName: "Zach",
    firstName: "Tindell",
  },
  {
    discountCardNumber: 7,
    birthDate: "10/18/2003",
    lastName: "Don",
    firstName: "Dondell",
  },
  {
    discountCardNumber: 8,
    birthDate: "10/18/2003",
    lastName: "Paige",
    firstName: "Pammery",
  },
  {
    discountCardNumber: 9,
    birthDate: "10/18/2003",
    lastName: "Xavier",
    firstName: "Zavier",
  },
  {
    discountCardNumber: 10,
    birthDate: "10/18/2003",
    lastName: "Maxwell",
    firstName: "Flaxwell",
  },
] as ICustomer[];

export default CustomerMockList;
