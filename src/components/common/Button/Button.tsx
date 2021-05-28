import { css, cx } from "@emotion/css";
import React, { FunctionComponent } from "react";

const base = css`
  cursor: pointer;
  border: none;
  padding: 10px 30px;
  user-select: none;
  text-decoration: none;
  min-width: 6rem;
  margin-top: 8px;
  margin-bottom: 8px;
  border-radius: 30px;
  background-color: white;
  color: black;
  -webkit-transition: background-color 0.3s ease-out;
  -moz-transition: background-color 0.3s ease-out;
  -o-transition: background-color 0.3s ease-out;
  transition: background-color 0.3s ease-out;

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
  dataTestId?: string;
  onClick: () => void;
}

export const Button: FunctionComponent<ButtonProp> = ({
  children,
  className,
  custom,
  dataTestId,
  onClick,
}) => {
  return (
    <button className={`${className} ${css(base, custom)} focus:outline-none`}  data-testid={dataTestId} onClick={()=>{onClick()}}>
      {children}
    </button>
  );
};



const orange = css`
color: white;
background-color: #ff6a33;
:hover{
  background-color: #DE8B38;
}
`

export const OrangeButton: FunctionComponent<ButtonProp> = ({
  children,
  className,
  dataTestId,
  onClick,
}) => {
  return (
    <Button className={className} custom={orange} dataTestId={dataTestId} onClick={()=>{onClick()}}>
      {children}
    </Button>
  );
};


const grey = css`
color: white;
background-color: #878787;
:hover{
  background-color: #616161;
}
`

export const GreyButton: FunctionComponent<ButtonProp> = ({
  children,
  className,
  dataTestId,
  onClick,
}) => {
  return (
    <Button className={className} custom={grey} dataTestId={dataTestId} onClick={()=>{onClick()}}>
      {children}
    </Button>
  );
};
