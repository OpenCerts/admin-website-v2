import React, { ChangeEvent, FunctionComponent } from "react";

interface ButtonProp {
  className?: string;
  placeHolder?: string;
  onChange: (value: any) => void;
  value?: string;
  options?: Array<string>;
  dataTestId?: string;
}

export const TextInput: FunctionComponent<ButtonProp> = ({ className, placeHolder, onChange, value, dataTestId }) => {
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

export const DataList: FunctionComponent<ButtonProp> = ({
  className,
  placeHolder,
  onChange,
  value,
  options,
  dataTestId,
}) => {
  const _onChange: (event: ChangeEvent<HTMLInputElement>) => void = ({ target }) => {
    return onChange(target.value === "" ? "" : target.value);
  };

  return (
    <>
      <input
        className={`${className} py-2.5 px-5 border-2 border-gray-600 rounded `}
        type="text"
        list="data"
        onChange={_onChange}
        value={value}
        placeholder={placeHolder}
        data-testid={dataTestId}
      />
      {options != undefined && (
        <datalist id="data">
          {options.map((item: string, index: number) => {
            return <option key={index} value={item} />;
          })}
        </datalist>
      )}
    </>
  );
};
