declare let window: any;
import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, OrangeButton } from "./common/Button";
import logo from "../images/logo.svg";
import { getWalletDetails as getWalletData } from "./util/wallet";

// const deploy = async () => {
//   var storeName = "Test storename"
//   const documentStore = await deployDocumentStore(storeName)
//   signale.success(`Document store ${storeName} deployed at ${documentStore.contractAddress}`);
// }

const BreakLine = styled.div`
  flex-basis: 100%;
`;

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

    window.ethereum.on("chainChanged", function () {
      getWalletDetails();
    });

    window.ethereum.on("connect", function () {
      getWalletDetails();
    });
  });

  const getWalletDetails = async () => {
    const walletDetails = await getWalletData();
    setWalletAddress(walletDetails.address);
    setWalletNetwork(walletDetails.network);
    setWalletBalance(walletDetails.balance);
    setIsConnected(true);
  };

  if (window.ethereum.isConnected()) {
    getWalletDetails();
  }

  return (
    <div className={`shadow-md`}>
      <div
        className={`container mx-auto px-4 py-2 flex flex-wrap items-center text-sm`}
      >
        <div className="flex-shrink-0 mx-auto lg:mx-0 my-4 lg:my-0">
          <a href="https://admin.opencerts.io/">
            <img className="img-fluid h-12" src={logo} alt="OpenCert" />
          </a>
        </div>
        <BreakLine className="lg:hidden" />
        <div className="mx-auto lg:mx-0 lg:ml-auto ">
          <div className="flex flex-wrap h-full items-center">
            {isConnected && (
              <>
                <div className="w-auto md:w-auto mb-4 lg:mb-0 lg:my-auto">
                  <p className="font-medium">Current Account</p>
                  <a href="">
                    <p className=" break-all">{walletAddress}</p>
                  </a>
                </div>
                <BreakLine className="md:hidden" />
                <div className="w-auto md:ml-12 mb-4 lg:mb-0 lg:my-auto">
                  <p className="font-medium">Network</p>
                  <p className="capitalize">{walletNetwork}</p>
                </div>
                <BreakLine className="md:hidden" />
                <div className="w-auto md:ml-12 mb-4 lg:mb-0 lg:my-auto">
                  <p className="font-medium">Account Balance</p>
                  <p>{walletBalance} ETH</p>
                </div>
              </>
            )}

            {!isConnected && (
              <div className="w-auto">
                <OrangeButton
                  onClick={getWalletDetails}
                  className="text-sm font-medium"
                >
                  Connect Metamask
                </OrangeButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
