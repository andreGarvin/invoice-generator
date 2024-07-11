import { FieldError, UseFormRegister } from "react-hook-form";
import { twMerge, twJoin } from "tailwind-merge";

import { InvoiceFormData } from "types/invoice";

import Label from "components/ui/Label";

type FormTextAreaProps = {
  error?: FieldError;
  required?: boolean;
  optional?: boolean;
  className?: string;
  placeholder: string;
  name: keyof InvoiceFormData;
  register: UseFormRegister<InvoiceFormData>;
};

export const FormTextArea: React.FC<FormTextAreaProps> = (props) => {
  const { name, error, required, optional, className, placeholder, register } = props;

  return (
    <div className={twMerge("flex flex-col items-start w-full", className)}>
      <Label required={required} optional={optional}>
        {name.split("_").join(" ")}
      </Label>
      <textarea
        className={twJoin(
          "resize-none border rounded h-32 w-full placeholder:capitalize placeholder:text-gray-500/50",
          error
            ? "!border-red-400 ring-2 ring-red-600 ring-offset-1 focus:ring-2 focus:ring-red-600 focus:ring-offset-1"
            : "border-gray-400"
        )}
        placeholder={placeholder}
        {...register(name as keyof InvoiceFormData, { required })}
      />
    </div>
  );
};
