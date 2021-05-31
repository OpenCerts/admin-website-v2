import { css } from "@emotion/css";
import styled from "@emotion/styled";
import React, { ChangeEvent, FunctionComponent } from "react";

const InputStyle = styled.div`
  input {
    padding: 10px 20px;
    border-radius: 5px;
    border: 2px solid #848484;
  }

  .valid {
    border-color: #22b43a;
  }

  .invalid {
    border-color: #ed7c7c;
  }
`;
interface ButtonProp {
  className?: string;
  custom?: string;
  placeHolder?: string;
  onChange: (value: any) => void;
  value?: string;
  dataTestId?: string;
}

export const TextInput: FunctionComponent<ButtonProp> = ({
  className,
  custom,
  placeHolder,
  onChange,
  value,
  dataTestId,
}) => {
  const _onChange: (event: ChangeEvent<HTMLInputElement>) => void = ({ target }) => {
    return onChange(target.value === "" ? "" : target.value);
  };

  return (
    <InputStyle>
      <input
        className={`${css(custom)} ${className} `}
        placeholder={placeHolder}
        onChange={_onChange}
        value={value}
        data-testid={dataTestId}
      />
    </InputStyle>
  );
};
