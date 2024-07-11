import { twMerge } from "tailwind-merge";

type LabelProps = {
  children: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
};

const Label: React.FC<LabelProps> = (props) => {
  const { children, required, optional, className } = props;

  const joinedClassName = twMerge("capitalize", className);

  const requiredComp = <p className="text-red-600 ml-1">*</p>;
  const optionalComp = (
    <p className="text-gray-400 text-sm capitalize font-thin italic ml-2">
      (optional)
    </p>
  );

  return (
    <span className="text-lg flex flex-row items-center">
      <p className={joinedClassName}>{children}</p>
      {required && requiredComp}
      {optional && optionalComp}
    </span>
  );
};

export default Label;
