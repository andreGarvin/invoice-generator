type LabelProps = {
  children: string;
  required?: boolean;
  optional?: boolean;
};

const Label: React.FC<LabelProps> = (props) => {
  const { children, required, optional } = props;

  return (
    <span className="text-lg flex flex-row items-center">
      <p className="capitalize">{children}</p>
      {required && <p className="text-red-600 ml-1">*</p>}
      {optional && <p className="text-gray-400 text-sm capitalize font-thin italic ml-2">(optional)</p>}
    </span>
  );
};

export default Label;
