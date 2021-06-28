import React, { FunctionComponent } from "react";

interface ButtonProp {
  children: React.ReactNode;
  className?: string;
  custom?: string;
  dataTestId?: string;
  onClick: () => void;
}

export const Button: FunctionComponent<ButtonProp> = ({ children, className, dataTestId, onClick }) => {
  return (
    <button
      className={`py-2.5 px-10 cursor-pointer select-none no-underline border-0 rounded-3xl transition-colors ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className} `}
      data-testid={dataTestId}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
};

export const PrimaryButton: FunctionComponent<ButtonProp> = ({ children, className, dataTestId, onClick }) => {
  return (
    <Button
      className={`${className} bg-primary-default hover:bg-primary-hover text-white`}
      dataTestId={dataTestId}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </Button>
  );
};

export const SecondaryButton: FunctionComponent<ButtonProp> = ({ children, className, dataTestId, onClick }) => {
  return (
    <Button
      className={`${className} bg-secondary-default hover:bg-secondary-hover text-white`}
      dataTestId={dataTestId}
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </Button>
  );
};
