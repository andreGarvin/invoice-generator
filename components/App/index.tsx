import Form from "components/App/Invoice-Form";

import Header from "components/App/Header";
import Main from "components/App/Main";


export default function Home() {
  return (
    <Main>
      <div className="w-5/6 flex flex-col justify-center pb-10">
        <Header />
        <Form />
      </div>
    </Main>
  );
};
