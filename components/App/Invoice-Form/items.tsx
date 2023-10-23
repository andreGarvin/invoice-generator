import { useState } from "react";

import { Icon } from "components/Common/icons";
import Button from "components/Common/Button";
import Input from "components/Common/Input";

import { useInvoiceItemHook } from "components/hooks/invoice-form-items";
import { calculateInvoiceItem } from "services/invoice-calculate";
import { InvoiceItem } from "services/types"

type InvoiceItemProps = InvoiceItem & {
  removeItem: (index: number) => void;
  updateItem: (index: number, partialItem: Partial<InvoiceItem>) => void;
};

const InvoiceItem: React.FC<InvoiceItemProps> = (props) => {
  const { id, vat, quantity, price, description, removeItem, updateItem } = props;

  const { total } = calculateInvoiceItem({
    price, quantity, vat
  });

  return (
    <tr>
      <td className="py-2 pr-24">
        <Input
          type="text"
          name="description"
          className="w-full rounded"
          placeholder="description"
          defaultValue={description}
          onChange={(e) => updateItem(id, { [e.target.name]: e.target.value })}
        />
      </td>
      <td className="py-2">
        <Input
          type="text"
          name="quantity"
          placeholder="0.0"
          className="text-center w-14 rounded"
          defaultValue={quantity.toFixed(1)}
          onChange={(e) =>
            updateItem(id, { [e.target.name]: Number(e.target.value) })
          }
        />
      </td>
      <td className="py-2">
        <Input
          type="text"
          name="price"
          placeholder="0.0"
          className="text-center w-20 rounded"
          defaultValue={price.toFixed(1)}
          onChange={(e) =>
            updateItem(id, { [e.target.name]: Number(e.target.value) })
          }
        />
      </td>
      <td className="py-2">
        <Input
          type="text"
          name="vat"
          placeholder="0.0"
          className="text-center w-14 rounded"
          defaultValue={quantity.toFixed(1)}
          onChange={(e) =>
            updateItem(id, { [e.target.name]: Number(e.target.value) })
          }
        />
      </td>
      <td className="py-2 px-8">${total.toFixed(2)}</td>
      <td className="flex justify-end py-2">
        <Button
          type="button"
          className="text-lg focus:outline-none hover:text-red-600"
          onClick={() => removeItem(id)}
        >
          <Icon as="Trash" />
        </Button>
      </td>
    </tr>
  );
};

type InvoiceItemsProps = useInvoiceItemHook & {};

const InvoiceItems: React.FC<InvoiceItemsProps> = (props) => {
  const { items, addItem, removeItem, updateItem } = props;

  const collection = items.map(item => (
    <InvoiceItem key={item.id} {...item} removeItem={removeItem} updateItem={updateItem} />
  ));

  return (
    <div>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-start capitalize">description</th>
            <th className="text-start capitalize">quantity</th>
            <th className="text-start capitalize">unit price</th>
            <th className="text-start uppercase">vat %</th>
            <th className="text-start capitalize px-8">amount</th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto">{collection}</tbody>
      </table>
      <Button
        leftIcon="Plus"
        className="bg-indigo-700 text-white text-md capitalize px-4 focus:ring-2 focus:ring-indigo-300 focus:ring-offset-1"
        onClick={addItem}
      >
        add item
      </Button>
    </div>
  );
};

export default InvoiceItems;
