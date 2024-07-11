import { format } from "date-fns";

export const formatCurrency = (number: number, currency: string = "USD") => {
  return new Intl.NumberFormat(currency, {
    currency,
    style: "currency"
  }).format(number);
};

export const formatDate = (date: Date) => {
  return format(date, "MMMM do yyyy");
};
