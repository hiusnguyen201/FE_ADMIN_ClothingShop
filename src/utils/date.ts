import moment from "moment";

moment.locale("vi");

export const formatDateString = (date: Date, type: "short" | "long" | "date" | "time" = "short") => {
  switch (type) {
    case "short":
      return moment(date).format("DD/MM/YYYY");
    case "long":
      return moment(date).format("MMMM D, YYYY [at] h:mm A");
    case "date":
      return moment(date).format("MMMM D, YYYY");
    case "time":
      return moment(date).format("h:mm A");
  }
};
