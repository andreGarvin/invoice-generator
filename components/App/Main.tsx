import { PropsWithChildren } from "react";

const Main: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="bg-white w-full flex flex-col justify-center items-center">
      {/* <div className="bg-white w-full px-4 md:px-4 flex flex-col self-center h-screen lg:w-3/4"> */}
      {props.children}
    </div>
  );
};

export default Main;
