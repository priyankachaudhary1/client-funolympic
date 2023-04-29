import clsx from "clsx";
import { HTMLInputTypeAttribute } from "react";

type InputProps = {
  type?: HTMLInputTypeAttribute;
  label?: string;
  name: string;
  inputClassName?: string;
  labelClassName?: string;
  error?: string | undefined;
  [key: string]: any;
};

export default function Input({
  type = "text",
  label = "",
  name,
  inputClassName = "",
  labelClassName = "",
  error,
  ...rest
}: InputProps) {
  const errorClass = error
    ? "border-red-500 focus:border-red-800 bg-red-50"
    : "";
  return (
    <div className='space-y-1 my-1'>
      {label && (
        <label
          htmlFor={label}
          className={clsx(
            "block text-sm font-semibold text-gray-700",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <div className='mt-1'>
        <input
          id={label}
          type={type}
          name={name}
          className={clsx(
            "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-100 focus:border-primary-100 sm:text-sm",
            inputClassName,
            errorClass
          )}
          {...rest}
          autoComplete='off'
        />
        <div className='text-red-500 text-xs my-2 px-1'>{error}</div>
      </div>
    </div>
  );
}
