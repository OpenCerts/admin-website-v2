import React, { FunctionComponent, ButtonHTMLAttributes } from "react";

type ButtonProp = ButtonHTMLAttributes<HTMLButtonElement> & {
  dataTestId?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button: FunctionComponent<ButtonProp> = ({
  children,
  className,
  disabled,
  dataTestId,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`py-2.5 px-10 cursor-pointer select-none no-underline border-0 rounded-3xl transition-colors ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className} `}
      data-testid={dataTestId}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const PrimaryButton: FunctionComponent<ButtonProp> = ({ children, className, ...props }) => {
  return (
    <Button className={`${className} bg-primary-default hover:bg-primary-hover text-white`} {...props}>
      {children}
    </Button>
  );
};

export const SecondaryButton: FunctionComponent<ButtonProp> = ({ children, className, ...props }) => {
  return (
    <Button className={`${className} bg-secondary-default hover:bg-secondary-hover text-white`} {...props}>
      {children}
    </Button>
  );
};

export const InformationButton: FunctionComponent<ButtonProp> = ({ onClick, ...props }) => {
  return (
    <button
      className="inline-flex h-4 w-4 border-2 rounded-full text-gray-400 border-gray-400 font-mono font-bold text-xs flex items-center justify-center focus:outline-none hover:text-gray-700 hover:border-gray-700 ml-3"
      onClick={onClick}
      {...props}
    >
      ?
    </button>
  );
};
