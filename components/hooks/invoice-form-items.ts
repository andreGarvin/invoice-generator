import { useState } from "react";

import { InvoiceItem } from "types/invoice";

export type useInvoiceItemHook = {
  items: InvoiceItem[];
  addItem: () => void;
  removeItem: (id: number) => void;
  updateItem: (id: number, partialItem: Partial<InvoiceItem>) => void;
};

const DEFAULT_INVOICE_ITEM = {
  id: new Date().getTime(),
  description: "",
  quantity: 0,
  price: 0,
  vat: 0,
};

export const useInvoiceItems = (): useInvoiceItemHook => {

  const [items, setItems] = useState<InvoiceItem[]>([DEFAULT_INVOICE_ITEM]);

  const addItem = () => {
    setItems((items) => [
      ...items,
      { ...DEFAULT_INVOICE_ITEM, id: new Date().getTime(), },
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
