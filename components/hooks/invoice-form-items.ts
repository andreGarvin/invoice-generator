import { useState } from "react";
import { InvoiceItem } from "services/types";

export type useInvoiceItemHook = {
  items: InvoiceItem[];
  addItem: () => void;
  removeItem: (id: number) => void;
  updateItem: (id: number, partialItem: Partial<InvoiceItem>) => void;
};

export const useInvoiceItems = (): useInvoiceItemHook => {
  const defaultInvoiceItem = {
    description: "",
    quantity: 0,
    price: 0,
    vat: 0,
    id: new Date().getTime(),
  };

  const [items, setItems] = useState<InvoiceItem[]>([defaultInvoiceItem]);

  const addItem = () => {
    setItems((items) => [
      ...items,
      { ...defaultInvoiceItem, id: new Date().getTime(), },
    ]);
  };

  const removeItem = (id: number) => {
    const collection = items.filter((item) => {
      return id !== item.id;
    });

    setItems(collection);
  };

  const updateItem = (id: number, partialItem: Partial<InvoiceItem>) => {
    const collection = items.map((item) => {
      if (id === item.id) {
        return { ...item, ...partialItem };
      }
      return item;
    });

    setItems(collection);
  };

  return {
    items,
    addItem,
    removeItem,
    updateItem,
  };
};
