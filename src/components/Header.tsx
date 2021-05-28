declare let window: any;
import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { OrangeButton } from "./common/Button";
import logo from "../images/logo.svg";
import { getWalletDetails as getWalletData } from "./util/wallet";

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

    window.ethereum.on("connect", function (chainId: string) {
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
    <div
      className={`shadow-md flex flex-wrap items-center text-sm px-4 py-2 `}
    >
      <div className="mx-auto my-4 lg:my-0">
        <a href="https://admin.opencerts.io/">
          <img className="img-fluid h-12" src={logo} alt="OpenCert" />
        </a>
      </div>
      <BreakLine className="lg:hidden" />
      <div className="flex flex-wrap mx-auto items-center">
        {isConnected && (
          <>
            <div className="w-auto mb-4 lg:mb-0">
              <p className="font-medium">Current Account</p>
              <p className="break-all">{walletAddress}</p>
            </div>
            <BreakLine className="md:hidden" />
            <div className="w-auto md:ml-12 mb-4 lg:mb-0">
              <p className="font-medium">Network</p>
              <p className="capitalize">{walletNetwork}</p>
            </div>
            <BreakLine className="md:hidden" />
            <div className="w-auto md:ml-12 mb-4 lg:mb-0">
              <p className="font-medium">Account Balance</p>
              <p>{walletBalance} ETH</p>
            </div>
          </>
        )}

        {!isConnected && (
            <OrangeButton
              onClick={getWalletDetails}
              className="text-sm font-medium"
              dataTestId="connectToWallet"
            >
              Connect Metamask
            </OrangeButton>
        )}
      </div>
    </div>
  );
};
