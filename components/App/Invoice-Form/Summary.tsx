import { formatCurrency } from "lib/invoice/format";

type SummaryProps = {
  vatTotal: number;
  subtotal: number;
  total: number;
  vat: number;
};

export function Summary(props: SummaryProps) {
  const { subtotal, total } = props;

  const subTotalF = formatCurrency(subtotal);
  const totalF = formatCurrency(total);
  // const vatF = formatCurrency(vat);

  return (
    <div className="flex flex-col items-end">
      <span className="flex flex-row items-center mt-4 text-lg">
        <p className="text-md text-black capitalize mr-8">subtotal</p>
        <p className="text-md text-black capitalize">{subTotalF}</p>
      </span>
      {/* <span className="flex flex-row items-center mt-4 text-lg">
        <p className="text-md text-black uppercase mr-8">
          vat %{vatTotal.toFixed(2)}
        </p>
        <p className="text-md text-black capitalize">{vatF}</p>
      </span> */}
      <span className="flex flex-row items-center mt-4 text-lg">
        <p className="text-md text-black capitalize mr-8">balance due</p>
        <p className="text-md text-black capitalize">{totalF}</p>
      </span>
    </div>
  );
}
