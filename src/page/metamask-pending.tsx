import React, { FunctionComponent } from "react";
import logo from "../images/logo.svg";
import { Spinner } from "../components/common/spinner";

export const MetaMaskPending: FunctionComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center align-middle h-full my-auto ">
      <img className="img-fluid h-12" src={logo} alt="OpenCert" />
      <Spinner className="w-14 h-14 mr-2 mt-8" />
      <h2 className="mt-3">Waiting For Metamask</h2>
      <p className="mb-8">Please login your metamask extension and connect to a wallet.</p>
    </div>
  );
};
