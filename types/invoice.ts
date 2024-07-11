export type InvoiceNumeralFields = {
  quantity: number;
  price: number;
  vat: number;
}

export type InvoiceItem = InvoiceNumeralFields & {
  id: number;
  description?: string;
};

type InvoicePaymentFields = {
  bic_swift: string;
  reference: string;
  business_id: string;
  back_account: string;
}

type InvoiceBase = {
  notes?: string;
  number: string;
  due_date?: Date;
  issued_date: Date;
  items: InvoiceItem[];
  sender_contact: string;
  recipient_contact: string;
  paymentFields: InvoicePaymentFields;
};

export type Invoice = InvoiceBase & {
  logo: string;
};


export type InvoiceFormData = InvoiceBase & {
  logo: FileList;
};
