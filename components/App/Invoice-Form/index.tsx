import dynamic from "next/dynamic";

import { PropsWithChildren, useMemo, useState } from "react";

import { FieldError, UseFormRegister, useForm } from "react-hook-form";
import { pdf } from "@react-pdf/renderer";
import { twJoin } from "tailwind-merge";
import { addDays } from "date-fns";

import "react-tooltip/dist/react-tooltip.css";

import { InvoiceFormData } from "types/invoice";

import {
  calculateVatTotal,
  calculateInvoiceItems,
} from "lib/invoice/calculate";

import { Icon } from "components/ui/icons";
import Button from "components/ui/Button";
import Label from "components/ui/Label";
import Input from "components/ui/Input";

import { DueDatePicker, NET_30 } from "components/App/Invoice-Form/DueDatePicker";
import { FormTextArea } from "components/App/Invoice-Form/FormTextArea";
import { AttachLogo } from "components/App/Invoice-Form/AttachLogo";
import InvoiceItemList from "components/App/Invoice-Form/ItemList";
import { Sidebar } from "components/App/Invoice-Form/Sidebar";
import { Summary } from "components/App/Invoice-Form/Summary";

import { useInvoiceItems } from "components/hooks/invoice-form-items";

import { PDFDocument } from "components/App/Invoice-Form/PDF";
import { downloadBlob, getDataURL } from "lib/file";
import { formatDate } from "lib/invoice/format";

type FormSectionProps = {
  row?: boolean;
};

const FormSection: React.FC<PropsWithChildren<FormSectionProps>> = (props) => {
  const className = twJoin(
    "flex",
    props.row ? "flex-row" : "flex-col",
    "justify-between mt-10 last:mb-10"
  );

  return <div className={className}>{props.children}</div>;
};

type InvoiceNumberInputProps = {
  error?: FieldError;
  register: UseFormRegister<InvoiceFormData>;
};

function InvoiceNumberInput(props: InvoiceNumberInputProps) {
  const { error, register } = props;

  const formRegister = register("number", {
    required: "please provide a invoice number",
  });

  const InputClassName = twJoin(
    "rounded-l-none rounded-r-md text-lg border-transparent placeholder:text-gray-500/50 placeholder:italic placeholder:capitalize",
    error
      ? "!border-red-400 ring-2 ring-red-600 ring-offset-1 focus:ring-2 focus:ring-red-600 focus:ring-offset-1"
      : "focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
  );

  return (
    <div className="flex flex-col mb-4">
      {/* <Label required>invoice number</Label> */}
      <div className="flex flex-row border border-gray-400 rounded-md mb-2 pt-0">
        <div className="bg-gray-300 border-r border-r-gray-400 text-gray-500 p-4 rounded-l text-md">
          <Icon as="HashTag" />
        </div>
        <Input
          type="text"
          placeholder="invoice number"
          className={InputClassName}
          {...formRegister}
        />
      </div>
      <p className="text-red-600 first-letter:capitalize">{error?.message}</p>
    </div>
  );
}

type FooterProps = {
  register: UseFormRegister<InvoiceFormData>;
};

function Footer(props: FooterProps) {
  const { register } = props;
  const fields = [
    { label: "back account", name: "paymentFields.back_account" },
    { label: "BIC/Swift", name: "paymentFields.bic_swift" },
    { label: "reference", name: "paymentFields.reference" },
    { label: "business ID", name: "paymentFields.business_id" },
  ];

  const formFields = fields.map((field) => (
    <span
      key={field.label}
      className="w-full flex flex-col items-start mt-4 text-lg"
    >
      <Label className="text-md text-black capitalize mb-1">
        {field.label}
      </Label>
      <Input
        type="text"
        className="w-full"
        {...register(field.name as keyof InvoiceFormData)}
      />
    </span>
  ));

  return (
    <div className="grid grid-rows-2 grid-flow-col gap-4">{formFields}</div>
  );
}

function InvoiceForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    defaultValues: {
      due_date: addDays(new Date(), NET_30),
      issued_date: new Date(),
    },
  });

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const { items, addItem, removeItem, updateItem } = useInvoiceItems();

  // The total of the invoice including the VAT
  const calculation = useMemo(() => {
    return calculateInvoiceItems(items);
  }, [items]);

  // The total amount of the invoice items VAT
  const vatTotal = useMemo(() => {
    return calculateVatTotal(items);
  }, [items]);

  // handle on submit
  async function onHandleSubmit(data: InvoiceFormData) {
    const file = data.logo?.item(0);
    const invoice = {
      ...data,
      items: items.length ? items : [],
      logo: file ? await getDataURL(file) : ""
    }

    const InvoicePDF = (
      <PDFDocument
        invoice={invoice}
      />
    );

    pdf(InvoicePDF).toBlob().then(blob => {
      downloadBlob(data.number,  blob);
    });
  }

  const resolveError = (name, errors) => {
    return errors[name];
  };

  const currentDate = formatDate(new Date());

  return (
    <form
      className="flex flex-col justify-end lg:flex-row"
      onSubmit={handleSubmit(onHandleSubmit)}
    >
      <div className="h-full w-2/3 bg-red-white border border-gray-200 rounded-md shadow-md px-10 mr-4">
        <FormSection row>
          <AttachLogo register={register} />
          <div className="flex flex-col items-start">
            <InvoiceNumberInput
              error={resolveError("number", errors)}
              register={register}
            />
            <p className="text-black text-lg font-semibold mb-6">
              {currentDate}
            </p>
            <DueDatePicker control={control} />
          </div>
        </FormSection>
        <FormSection row>
          <FormTextArea
            required
            name="sender_contact"
            placeholder={`your company name\naddress\ncontact details (email, phone number)`}
            className="mr-12"
            register={register}
            error={resolveError("sender_contact", errors)}
          />
          <FormTextArea
            required
            name="recipient_contact"
            placeholder={`recipient company name\naddress\ncontact details (email, phone number)`}
            register={register}
            error={resolveError("recipient_contact", errors)}
          />
        </FormSection>
        <FormSection>
          <FormTextArea
            optional
            name="notes"
            className="h-36 w-full"
            placeholder="Optional: Message to the recipient explaining what is this invoice for"
            register={register}
          />
        </FormSection>
        <FormSection>
          <InvoiceItemList
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
          <Footer register={register} />
        </FormSection>
      </div>
      <Sidebar>
        <Button
          type="submit"
          loading={isGeneratingPDF}
          rightIcon={isGeneratingPDF ? "Download" : undefined}
          className="w-full bg-indigo-700 justify-center text-white py-3 px-4 mb-6 focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
        >
          {isGeneratingPDF ? "generating invoice pdf" : "download invoice"}
        </Button>
      </Sidebar>
    </form>
  );
}

export default dynamic(() => Promise.resolve(InvoiceForm), {
  ssr: false,
});
