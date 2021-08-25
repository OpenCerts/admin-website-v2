import React, { ChangeEvent, FunctionComponent } from "react";

interface TextInputProp {
  className?: string;
  placeHolder?: string;
  onChange: (value: any) => void;
  value?: string;
  dataTestId?: string;
}

export const TextInput: FunctionComponent<TextInputProp> = ({
  className,
  placeHolder,
  onChange,
  value,
  dataTestId,
}) => {
  const _onChange: (event: ChangeEvent<HTMLInputElement>) => void = ({ target }) => {
    return onChange(target.value === "" ? "" : target.value);
  };

  return (
    <input
      className={`${className} py-2.5 px-5 border-2 border-gray-600 rounded `}
      placeholder={placeHolder}
      onChange={_onChange}
      value={value}
      data-testid={dataTestId}
    />
  );
};
