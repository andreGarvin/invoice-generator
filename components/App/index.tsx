import Link from "next/link";

import Form from "components/App/Invoice-Form";
import Button from "components/Common/Button";

import Header from "components/App/Header";
import Main from "components/App/Main";

function CurrencySelect() {
  const currencies = [
    { label: '$ USD', value: 'USD' },
  ];

  const options = currencies.map((currency) => (
    <option key={currency.label} value={currency.value}>{currency.label}</option>
  ));

  return (
    <>
      <p className="text-gray-800 capitalize mb-1">currency</p>
      <select className="border border-gray-400 rounded focus:ring-2 focus:ring-indigo-400rounded mb-6" defaultValue={currencies[0].value}>
        {options}
      </select>
    </>
  );
}

function Sidebar() {
  return (
    <div className="bg-white flex flex-col justify-start h-full py-8 px-4 pl-0">
      <CurrencySelect />
      <Button
        rightIcon="Download"
        className="w-full bg-indigo-700 justify-center text-white py-3 px-4 mb-6 focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
      >
        download invoice
      </Button>
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

export default function Home() {
  // handle on submit
  function onHandleSubmit(data) {
    // create request to backend to generate invoice
    // console.log(data)
  }


  return (
    <Main>
      <div className="w-5/6 flex flex-col justify-center pb-10">
        <Header />
        <div className="flex flex-row justify-end">
          <Form onHandleSubmit={onHandleSubmit} />
          <Sidebar />
        </div>
      </div>
    </Main>
  );
};
