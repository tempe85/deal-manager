import moment from "moment";

export const GenerateRandomNDigitNumber = (digits: number) => {
  const constant = Math.pow(10, digits);
  return Math.round(Math.random() * constant);
};

export const OffsetDateByNDays = (date: string, offset: number) => {
  return new Date(date).setDate(new Date(date).getDate() + offset);
};

export const IsObjectNullOrEmpty = (obj: object) => {
  return !obj || Object.keys(obj).length === 0;
};

export const DateFormatter = (date: string | Date) => {
  return moment(date).format("l");
};

export const GetDateInputFormat = (date: string | Date) => {
  return moment(date).format("YYYY-MM-DD");
};
