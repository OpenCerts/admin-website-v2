import { css } from "@emotion/css";
import React, { FunctionComponent } from "react";

const SpinnerStyle = css`
  border-top-color: #3498db;
`;

interface SpinnerProp {
  className?: string;
}

export const Spinner: FunctionComponent<SpinnerProp> = ({ className }) => {
  return (
    <div
      className={`animate-spin loader ease-linear rounded-full border-4 border-t-4 border-gray-200 ${className} ${css(
        SpinnerStyle
      )}`}
    />
  );
};
