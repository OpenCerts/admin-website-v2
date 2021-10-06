import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";

const SpinnerStyle = styled.div`
  border-top-color: #3498db !important;
`;

interface SpinnerProp {
  className?: string;
}

export const Spinner: FunctionComponent<SpinnerProp> = ({ className }) => {
  return (
    <SpinnerStyle
      className={`animate-spin loader ease-linear rounded-full border-4 border-t-4 border-gray-200 ${className}`}
    />
  );
};
