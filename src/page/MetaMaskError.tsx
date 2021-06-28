import React, { FunctionComponent } from "react";
import logo from "../images/logo.svg";
import { PrimaryButton } from "../components/common/Button";

export const MetaMaskError: FunctionComponent = () => {
  const refreshPage = async () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col justify-center items-center align-middle h-full my-auto ">
      <img className="img-fluid h-12" src={logo} alt="OpenCert" />
      <h2 className="mt-8">Unable to detect Metamask</h2>
      <p className="mb-8">Please download MetaMask extension in google chrome browser.</p>
      <PrimaryButton onClick={refreshPage} className="text-sm font-medium">
        Refresh Page
      </PrimaryButton>
    </div>
  );
};
