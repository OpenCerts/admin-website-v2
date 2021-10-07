import React, { FunctionComponent } from "react";
import parse from "html-react-parser";
import styled from "@emotion/styled";

const LoggerStyle = styled.p`
  a {
    color: blue;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  a:active {
    color: black;
  }
`;

interface LoggerProp {
  log: string;
  className?: string;
}

export const Logger: FunctionComponent<LoggerProp> = ({ log, className }) => {
  return (
    <div className={`w-full h-full text-sm max-w-screen-lg mt-6 mb-4 mx-auto ${className}`}>
      <p className={"mb-2 text-gray-700"}>Status </p>
      <LoggerStyle
        className={"w-full min-h-20 max-h-40 rounded overflow-scroll break-words bg-gray-100 px-3 py-2"}
        data-testid="cancel-log"
      >
        {parse(log)}
      </LoggerStyle>
    </div>
  );
};
