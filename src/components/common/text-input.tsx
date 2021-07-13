import styled from "@emotion/styled";
import React, { ChangeEvent, FunctionComponent } from "react";
import Creatable, { makeCreatableSelect } from "react-select/creatable";

const DataListStyle = styled.datalist`
  width: 100%;
`;

interface ButtonProp {
  className?: string;
  placeHolder?: string;
  onChange: (value: any) => void;
  value?: string;
  options?: Array<Record<string, unknown>>;
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

export const DataList: FunctionComponent<ButtonProp> = ({ placeHolder, onChange, dataTestId, options }) => {
  const _onChange = (newValue: any): void => {
    return onChange(newValue.value);
  };

  return (
    <Creatable
      options={options}
      allowCreateWhileLoading={false}
      data-testid={dataTestId}
      placeholder={placeHolder}
      formatCreateLabel={(value) => `Enter ${value}`}
      onChange={_onChange}
    />
  );
};
