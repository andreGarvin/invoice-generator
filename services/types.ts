export type InvoiceNumeralFields = {
  quantity: number;
  price: number;
  vat: number;
}

export type InvoiceItem = InvoiceNumeralFields & {
  description?: string;
  id: number;
};

type InvoicePaymentFields = {
  bicSwift: string;
  reference: string;
  businessID: string;
  backAccount: string;
}

export type InvoiceFormData = {
  number: string;
  notes?: string;
  sender_contact: string;
  recipient_contact: string;
  items: InvoiceItem[];
  paymentFields: InvoicePaymentFields;
};
