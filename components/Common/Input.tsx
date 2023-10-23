import { InputHTMLAttributes } from "react";

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type = "text", name, className, placeholder, defaultValue, disabled, inputMode, pattern, onChange } = props;

  return (
    <input
      ref={ref}
      type={type}
      name={name}
      pattern={pattern}
      onChange={onChange}
      inputMode={inputMode}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={twMerge(
        "border border-gray-400 rounded p-2 focus:outline-none",
        className,
        disabled && "opacity-60"
      )}
    />
  );
});


export default Input;
