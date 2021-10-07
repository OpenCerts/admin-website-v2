import React, { FunctionComponent } from "react";

interface ButtonProp {
  children?: React.ReactNode;
  className?: string;
  custom?: string;
  disabled?: boolean;
  dataTestId?: string;
  onClick: () => void;
}

export const Button: FunctionComponent<ButtonProp> = ({ children, className, disabled, dataTestId, onClick }) => {
  return (
    <button
      className={`py-2.5 px-10 cursor-pointer select-none no-underline border-0 rounded-3xl transition-colors ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className} `}
      data-testid={dataTestId}
      onClick={() => {
        onClick();
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const PrimaryButton: FunctionComponent<ButtonProp> = ({
  children,
  className,
  disabled,
  dataTestId,
  onClick,
}) => {
  return (
    <Button
      className={`${className} bg-primary-default hover:bg-primary-hover text-white`}
      dataTestId={dataTestId}
      onClick={() => {
        onClick();
      }}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export const SecondaryButton: FunctionComponent<ButtonProp> = ({
  children,
  className,
  disabled,
  dataTestId,
  onClick,
}) => {
  return (
    <Button
      className={`${className} bg-secondary-default hover:bg-secondary-hover text-white`}
      dataTestId={dataTestId}
      onClick={() => {
        onClick();
      }}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export const InformationButton: FunctionComponent<ButtonProp> = ({ onClick }) => {
  return (
    <button
      className="inline-flex items-center justify-center rounded-full font-mono font-bold border-2 text-gray-400 text-sm border-gray-400 w-5 h-5 focus:outline-none hover:text-gray-700 hover:border-gray-700 ml-3"
      onClick={() => {
        onClick();
      }}
    >
      ?
    </button>
  );
};
