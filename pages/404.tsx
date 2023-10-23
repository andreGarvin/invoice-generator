import { NextPage } from "next";

// components
import Main from "components/App/Main";
import Link from "next/link";

const Page: NextPage = (props) => {
  return (
    <Main>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white p-8 flex flex-col justify-center items-center border border-gray-300 rounded-2xl drop-shadow-md">
          <p className="text-4xl font-semibold capitalize my-4">page not found</p>
          <Link href="/" className="text-lg capitalize text-black leading-relaxed underline">
            return to home page
          </Link>
        </div>
      </div>
    </Main>
  );
};

export default Page;
