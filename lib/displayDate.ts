import moment from "moment";

moment.locale("fr");

export const displayDate = (date: Date) => {
  return moment(date).format("DD/MM/YYYY");
};

export const displayDateTime = (date: Date) => {
  return moment(date).format("DD/MM/YYYY HH:mm");
};
