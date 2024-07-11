import Link from "next/link";

import Button from "components/ui/Button";
import { PropsWithChildren } from "react";

function CurrencySelect() {
  const currencies = [
    { label: "$ USD", value: "USD" }
  ];

  const options = currencies.map((currency) => (
    <option key={currency.label} value={currency.value}>
      {currency.label}
    </option>
  ));

  return (
    <>
      <p className="text-gray-800 capitalize mb-1">currency</p>
      <select
        className="border border-gray-400 rounded focus:ring-2 focus:ring-indigo-400rounded mb-6"
        defaultValue={currencies[0].value}
      >
        {options}
      </select>
    </>
  );
}

export function Sidebar(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className="sticky top-0 bg-white flex flex-col justify-start h-full py-9 px-4 pl-0">
      {/* <CurrencySelect /> */}
      {children}
      <Link
        href={process.env.NEXT_PUBLIC_REPOSITORY_URI as string}
        target="_blank"
      >
        <Button
          leftIcon="Github"
          rightIcon="OpenInNewTab"
          className="w-full flex flex-row items-center border border-gray-400 py-3 px-4 capitalize hover:text-indigo-600 focus:text-indigo-600 focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
        >
          GitHub repository
        </Button>
      </Link>
    </div>
  );
}
