import React from "react";

import { Page, Text, View, Image, Document, StyleSheet } from "@react-pdf/renderer";

import { Invoice, InvoiceItem } from "types/invoice";
import { calculateInvoiceItem, calculateInvoiceItems } from "lib/invoice/calculate";
import { formatCurrency, formatDate } from "lib/invoice/format";

// Create styles
const styles = StyleSheet.create({
  page: {
    color: "#000",
    display: "flex",
    padding: "15px 25px",
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "column",
  },
  body: {
    padding: 10,
    margin: 20,
    flexGrow: 1,
  },
  footer: {
    padding: 10,
    margin: 20,
    flexGrow: 1,
  },
  header_text_container: {
    width: "100%",
    display: "flex",
    padding: "12px 0",
    flexDirection: "row",
  },
  logo: {
    width: 120,
  },
  invoice_number: {
    width: "100%",
    fontSize: 20,
    fontWeight: 100,
    textTransform: "capitalize",
  },
  date_container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  date_label: {
    margin: 2,
    fontSize: 11,
    color: "gray",
    textTransform: "capitalize",
  },
  date: {
    fontSize: 10,
    display: "flex",
    flexDirection: "column",
    textTransform: "capitalize",
  },
  issued_date: {
    marginBottom: 5,
  },
  contact_information_container: {
    display: "flex",
    marginBottom: 20,
    flexDirection: "row",
  },
  contact_information: {
    width: "100%",
    fontSize: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  contact_information_label: {
    fontSize: 11,
    color: "gray",
    marginBottom: 2,
    textTransform: "capitalize",
  },
  contact_information_recipient: {
    display: "flex",
    paddingLeft: 30,
    alignItems: "center",
  },
  note_container: {
    fontSize: 10,
  },
  note_label: {
    fontSize: 11,
    color: "gray",
    marginBottom: 2,
    textTransform: "capitalize",
  },
  items_container: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  items_container_column: {
    display: "flex",
    flexDirection: "column",
  },
  items_container_row: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  items_container_header_label: {
    fontSize: 12,
    color: "black",
    marginBottom: 10,
    fontWeight: "thin",
    textTransform: "capitalize",
  },
  items_container_content_text: {
    fontSize: 11,
    margin: "10 0",
    fontWeight: "normal",
  },
  summary_container: {
    width: "100%",
    marginTop: 40,
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "column",
  },
  summary_container_text: {
    fontSize: 12,
    margin: "10 0",
  },
  total_text: {
    fontWeight: "semibold",
  },
});


const columns = [
  { label: "description", tag: "description" },
  { label: "quantity", tag: "quantity" },
  { label: "unit price", tag: "price" },
  // { label: "vat" },
];

type PDFDocumentProps = {
  invoice: Invoice;
};

export function PDFDocument(props: PDFDocumentProps) {
  const { invoice } = props;

  const formattedIssuedDate = formatDate(invoice.issued_date as Date);
  const formattedDueDate = formatDate(invoice.due_date as Date);

  const { subtotal, total} = calculateInvoiceItems(invoice.items);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          { invoice.logo ? <Image style={styles.logo} src={invoice.logo} /> : null}
          <View style={styles.header_text_container}>
            <Text style={styles.invoice_number}>invoice #{invoice.number}</Text>

            <View style={styles.date_container}>
              <View style={{ ...styles.date, ...styles.issued_date }}>
                <Text style={styles.date_label}>issued date</Text>
                <Text>{formattedIssuedDate}</Text>
              </View>
              <View style={styles.date}>
                <Text style={styles.date_label}>due date</Text>
                <Text>{formattedDueDate}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.contact_information_container}>
          <View style={styles.contact_information}>
            <Text style={styles.contact_information_label}>sender</Text>
            <Text>{invoice.sender_contact}</Text>
          </View>
          <View
            style={{
              ...styles.contact_information,
              ...styles.contact_information_recipient,
            }}
          >
            <View>
              <Text style={styles.contact_information_label}>recipient</Text>
              <Text>{invoice.recipient_contact}</Text>
            </View>
          </View>
        </View>

        <View style={styles.note_container}>
          <Text style={styles.note_label}>notes</Text>
          <Text>{invoice.notes}</Text>
        </View>

        <Table columns={columns} data={invoice.items} />

        <Summary subtotal={subtotal} total={total} />
      </Page>
    </Document>
  );
}

type SummaryProps = {
  subtotal: number;
  total: number;
};

const Summary: React.FC<SummaryProps> = (props) => {

  const subtotal = formatCurrency(props.subtotal)
  const total = formatCurrency(props.total)

  return (
    <View style={styles.summary_container}>
      <Text style={styles.summary_container_text}>subtotal: {subtotal}</Text>
      <Text style={{...styles.summary_container_text, ...styles.total_text}}>balance due: {total}</Text>
    </View>
  );
}

type TableProps = {
  columns: { label: string, tag: string }[];
  data: InvoiceItem[];
}

const Table: React.FC<TableProps> = (props) => {
  const { columns, data  } = props;

  // const calculation = calculateInvoiceItems(data);
  const invoiceItemAmounts = data.map(d => {
    return calculateInvoiceItem(d);
  }).map((calculation) => {
    return formatCurrency(calculation.total);
  });

  return (
    <View style={styles.items_container}>
      {columns.map((column) => (
        <Row
          key={column.tag}
          header={column.label}
          row={data.map((d) => d[column.tag])}
        />
      ))}
      <Row header="amount" row={invoiceItemAmounts} />
    </View>
  );
}


type RowProps = {
  header: string;
  row: any[];
}


const Row: React.FC<RowProps> = (props) => {
  const { header, row } = props;

  return (
    <View style={styles.items_container_column}>
      <Text style={styles.items_container_header_label}>{header}</Text>
      <View style={styles.items_container_row}>
        {row.map((data, index) => (
          <Text key={index} style={styles.items_container_content_text}>
            {data}
          </Text>
        ))}
      </View>
    </View>
  );
}
