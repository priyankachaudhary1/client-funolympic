import clsx from "clsx";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  buttonType?: "primary" | "secondary" | "link";
  loading?: boolean;
  disabled?: boolean;
  label?: string | React.ComponentProps<"svg">;
  className?: string;
  fullWidth?: boolean;
  icon?: JSX.Element;
  [key: string]: any;
};

export default function Button({
  type = "button",
  buttonType = "primary",
  loading = false,
  disabled = false,
  label,
  fullWidth = false,
  className = "",
  icon,
  ...props
}: ButtonProps) {
  let buttonTypeClass = "";
  switch (buttonType) {
    case "primary":
      buttonTypeClass =
        "text-white bg-primary-300 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500";
      break;
    case "secondary":
      buttonTypeClass =
        "text-gray-600 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 bg-gray-100 hover:bg-gray-200";
      break;
    case "link":
      buttonTypeClass =
        "text-purple-600 bg-transparent justify-start focus:text-red-500 underline text-xs font-medium normal-case focus:ring-white";
      break;
    default:
      buttonTypeClass =
        "text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500";
      break;
  }
  return (
    <button
      disabled={disabled}
      type={type}
      className={clsx(
        className,
        fullWidth ? "w-full" : "",
        buttonType !== "link"
          ? "flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium disabled:opacity-75 disabled:cursor-not-allowed"
          : "py-3 flex justify-start",

        buttonTypeClass
      )}
      {...props}
    >
      <>
        {loading && (
          <svg
            className='animate-spin -ml-0  h-5 w-4 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        )}
        {label && label}
        {icon && icon}
      </>
    </button>
  );
}
