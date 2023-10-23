import { PropsWithChildren, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

import InvoiceItems from "components/App/Invoice-Form/items";
import { Icon } from "components/Common/icons";
import Button from "components/Common/Button";
import Input from "components/Common/Input";
import Label from "components/Common/Label";

import { calculateInvoiceItems, calculateVatTotal } from "services/invoice-calculate";
import { useInvoiceItems } from "components/hooks/invoice-form-items";
import { InvoiceFormData } from "services/types";


type FormSectionProps = {
  row?: boolean;
};

const FormSection: React.FC<PropsWithChildren<FormSectionProps>> = (props) => {
  return (
    <div
      className={
        twMerge(
          "flex",
          props.row ? "flex-row" : "flex-col",
          "justify-between mt-10 last:mb-10"
        )
      }
    >
      {props.children}
    </div>
  );
};


function Header() {
  const currentDate = format(new Date(), "MMMM do yyyy");

  return (
    <>
      <div className="flex flex-col">
        <Label required>invoice number</Label>
        <div className="flex flex-row border border-gray-400 rounded-md mt-2">
          <div className="bg-gray-300 border-r border-r-gray-400 text-gray-500 p-4 rounded-l text-md">
            <Icon as="HashTag" />
          </div>
          <Input
            type="text"
            placeholder="invoice number"
            className="rounded-l-none rounded-r-md text-lg border-transparent focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 placeholder:capitalize"
          />
        </div>
      </div>
      <p className="text-black text-lg">{currentDate}</p>
    </>
  );
}

function DueDate() {
  return (
    <div className="flex flex-col justify-start">
      <p>Due Date</p>
      <Button
        leftIcon="Calendar"
        className="flex flex-row text-gray-500 px-0 hover:underline items-start"
      >
        select due date
      </Button>
    </div>
  );
}


function AttachLogo() {
  return (
    <div className="flex flex-col items-start">
      <Button className="bg-white border border-gray-300 h-32 w-80 flex justify-center text-2xl text-gray-400">
        <Icon as="Plus" />
      </Button>
      <p className="capitalize text-sm italic text-gray-400 pt-1">
        attach your company logo
      </p>
    </div>
  );
}


type SummaryProps = {
  vatTotal: number;
  subtotal: number;
  total: number;
  vat: number;
}

function Summary(props: SummaryProps) {
  const { subtotal, total, vat, vatTotal } = props;

  return (
    <div className="flex flex-col items-end">
      <span className="flex flex-row items-center mt-4 text-lg">
        <p className="text-md text-black capitalize mr-8">subtotal</p>
        <p className="text-md text-black capitalize">${subtotal.toFixed(2)}</p>
      </span>
      <span className="flex flex-row items-center mt-4 text-lg">
        <p className="text-md text-black uppercase mr-8">
          vat %{vatTotal.toFixed(2)}
        </p>
        <p className="text-md text-black capitalize">${vat.toFixed(2)}</p>
      </span>
      <span className="flex flex-row items-center mt-4 text-lg">
        <p className="text-md text-black capitalize mr-8">total</p>
        <p className="text-md text-black capitalize">${total.toFixed(2)}</p>
      </span>
    </div>
  );
}

function Footer() {
  const fields = [
    { label: "back account", field: "back-account" },
    { label: "BIC/Swift", field: "bic-swift" },
    { label: "reference", field: "reference" },
    { label: "business ID", field: "business-id" },
  ];

  const formFields = fields.map((item) => (
    <span key={item.label} className="w-full flex flex-col items-start mt-4 text-lg">
      <p className="text-md text-black capitalize mb-1">{item.label}</p>
      <Input name={item.field} type="text" className="w-full" />
    </span>
  ));

  return (
    <div className="grid grid-rows-2 grid-flow-col gap-4">
      {formFields}
    </div>
  );
}


type FormTextAreaProps = {
  name: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
  placeholder: string;
};

const FormTextArea: React.FC<FormTextAreaProps> = (props) => {
  const { name, required, optional, className, placeholder } = props;

  return (
    <div className={twMerge("flex flex-col items-start w-full", className)}>
      <Label required={required} optional={optional}>
        {name}
      </Label>
      <textarea
        className="resize-none border border-gray-400 rounded h-32 capitalize w-full placeholder:text-gray-500/50"
        placeholder={placeholder}
      />
    </div>
  );
}

type InvoiceFormProps = {
  onHandleSubmit: SubmitHandler<InvoiceFormData>;
};

export default function InvoiceForm(props: InvoiceFormProps) {
  const { items, addItem, removeItem, updateItem } = useInvoiceItems();
  const {
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm<InvoiceFormData>();

  const calculation = useMemo(() => {
    return calculateInvoiceItems(items);
  }, [items]);

  const vatTotal = useMemo(() => {
    return calculateVatTotal(items);
  }, [items]);

  return (
    <div className="h-full w-2/3 bg-red-white border border-gray-200 rounded-md shadow-md px-10 mr-4">
      <form onSubmit={handleSubmit(props.onHandleSubmit)}>
        <FormSection row>
          <Header />
        </FormSection>
        <FormSection row>
          <DueDate />
          <AttachLogo />
        </FormSection>
        <FormSection row>
          <FormTextArea
            name="sender"
            required
            placeholder={`your company name\naddress\ncontact details (email, phone number)`}
            className="mr-12"
          />
          <FormTextArea
            name="recipient"
            required
            placeholder={`recipient company name\naddress\ncontact details (email, phone number)`}
          />
        </FormSection>
        <FormSection>
          <FormTextArea
            optional
            name="notes"
            className="h-28 w-full"
            placeholder="Optional: Message to the recipient explaining what is this invoice for"
          />
        </FormSection>
        <FormSection>
          <InvoiceItems
            items={items}
            addItem={addItem}
            removeItem={removeItem}
            updateItem={updateItem}
          />
        </FormSection>
        <FormSection>
          <Summary vatTotal={vatTotal} {...calculation} />
        </FormSection>
        <FormSection>
          <Footer />
        </FormSection>
      </form>
    </div>
  );
};
