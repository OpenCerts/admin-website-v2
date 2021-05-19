import { css, cx } from "@emotion/css";
import React, { FunctionComponent } from "react";

const base = css`
  cursor: pointer;
  border: none;
  padding: 10px 30px;
  user-select: none;
  text-decoration: none;
  color: white;
  background-color: #ff6a33;
  min-width: 10rem;
  margin: 8px;
  border-radius: 30px;

  :disabled,
  [disabled] {
    cursor: not-allowed;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
`;

interface ButtonProp {
  children: React.ReactNode;
  className?: string;
  custom?: string;
  onClick: Function
}

export const Button: FunctionComponent<ButtonProp> = ({
  children,
  className,
  custom,
  onClick,
}) => {
  return (
    <button className={`${className} ${css(base, custom)}`} onClick={()=>{onClick()}}>
      {children}
    </button>
  );
};
