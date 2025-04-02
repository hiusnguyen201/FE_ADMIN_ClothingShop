import moment from "moment";

moment.locale("vi");

export const formatDateString = (date: Date) => {
  return moment(date).format("DD/MM/YYYY");
};
