import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";
import logo from "../images/logo.svg";
import { OrangeButton } from "../components/common/Button";

const ErrorPageStyle = styled.div`
  a {
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: #000000;
    margin-left: 20px;
    margin-left: 20px;

    &.active {
      color: #ff9933;
      padding-bottom: 5px;
      border-bottom: 2px solid #ff9933;
    }
  }
`;

export const MetaMaskError: FunctionComponent = () => {
  const refreshPage = async () => {
    window.location.reload();
  };

  return (
    <ErrorPageStyle className="flex flex-col justify-center items-center align-middle h-full my-auto ">
      <img className="img-fluid h-12" src={logo} alt="OpenCert" />
      <h2 className="mt-8">Unable to detect Metamask</h2>
      <p className="mb-8">Please download MetaMask extension in google chrome browser.</p>
      <OrangeButton onClick={refreshPage} className="text-sm font-medium">
        Refresh Page
      </OrangeButton>
    </ErrorPageStyle>
  );
};
