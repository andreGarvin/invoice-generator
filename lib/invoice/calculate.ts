import { InvoiceNumeralFields } from "types/invoice";

const calculateVAT = (amount, vat) => (amount * vat) / 100;

export const calculateVatTotal = (items: InvoiceNumeralFields[]) => {
  return items.reduce((prev, item) => {
    return item.vat + prev;
  }, 0);
};

// #TODO: might want to refactor later to only return the total and vat
export const calculateInvoiceItem = (item: InvoiceNumeralFields) => {
  const subtotal = item.price * item.quantity;
  const vat = calculateVAT(subtotal, item.vat);
  const total = subtotal + vat;
  return { total, subtotal, vat };
};

// #TODO: might want to refactor only return the subtotal in this function
export const calculateInvoiceItems = (items: InvoiceNumeralFields[]) => {
  const calculation = {
    subtotal: 0,
    total: 0,
    vat: 0,
  };

  for (let item of items) {
    const { total, subtotal, vat } = calculateInvoiceItem(item);

    calculation.subtotal += subtotal;
    calculation.total += total;
    calculation.vat += vat;
  }

  return calculation;
};
