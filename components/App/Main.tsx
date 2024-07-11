import { PropsWithChildren } from "react";

const Main: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="bg-white w-full flex flex-col justify-center items-center">
      {props.children}
    </div>
  );
};

export default Main;
