declare let window: any;
import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button } from "./common/Button";
import logo from "../images/logo.svg";
import { getWalletDetails as getWalletData } from "./util/wallet";

// const deploy = async () => {
//   var storeName = "Test storename"
//   const documentStore = await deployDocumentStore(storeName)
//   signale.success(`Document store ${storeName} deployed at ${documentStore.contractAddress}`);
// }

export const Header: FunctionComponent<{}> = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("-");
  const [walletNetwork, setWalletNetwork] = useState("-");
  const [walletBalance, setWalletBalance] = useState("-");

  useEffect(() => {
    window.ethereum.on("accountsChanged", function (accounts: Array<string>) {
      if (accounts.length > 0) {
        getWalletDetails();
      }
    });
  });

  const getWalletDetails = async () => {
    const walletDetails = await getWalletData();
    setWalletAddress(walletDetails.address);
    setWalletNetwork(walletDetails.network);
    setWalletBalance(walletDetails.balance);
    setIsConnected(true);
  };

  return (
    <div className={`shadow-md`}>
      <div
        className={`container relative mx-auto px-4 py-2 flex flex-wrap items-center`}
      >
        <div className="flex-shrink-0 mx-auto lg:mx-0 my-4 lg:my-0">
          <a href="https://admin.opencerts.io/">
            <img className="img-fluid h-12" src={logo} alt="OpenCert" />
          </a>
        </div>
        <div className="mx-auto lg:mx-0 lg:ml-auto ">
          <div className="flex flex-wrap h-full items-center">
            {isConnected && (
              <>
                <div className="w-100 md:w-auto text-left mb-4">
                  <p className="text-sm font-medium">Current Account</p>
                  <a href="">
                    <p className="text-sm break-all">{walletAddress}</p>
                  </a>
                </div>
                <div className="w-100 md:ml-12 ">
                  <p className="text-sm font-medium">Network</p>
                  <p className="text-sm capitalize">{walletNetwork}</p>
                </div>
                <div className="w-auto md:ml-12">
                  <p className="text-sm font-medium">Account Balance</p>
                  <p className="text-sm">{walletBalance} ETH</p>
                </div>
              </>
            )}

            {!isConnected && (
              <div className="w-auto">
                <Button
                  onClick={getWalletDetails}
                  className="text-sm font-medium"
                >
                  Connect Metamask
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
