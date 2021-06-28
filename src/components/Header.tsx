declare let window: any;
import React, { FunctionComponent, useEffect, useState } from "react";
import { PrimaryButton } from "./common";
import { getWalletDetails as getWalletData } from "./util/wallet";
import { getEtherscanAddress } from "./util/common";
import logo from "../images/logo.svg";
import styled from "@emotion/styled";

const BreakLine = styled.div`
  flex-basis: 100%;
`;

export const Header: FunctionComponent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [wallet, setWalletInfo] = useState({
    walletAddress: "-",
    walletNetwork: "-",
    walletBalance: "-",
  });

  useEffect(() => {
    if (window.ethereum) {
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

      if (window.ethereum.isConnected()) {
        getWalletDetails();
      }
    }
  });

  const getWalletDetails = async () => {
    const walletDetails = await getWalletData();
    if (walletDetails !== undefined) {
      setWalletInfo({
        walletAddress: walletDetails.address,
        walletNetwork: walletDetails.network,
        walletBalance: walletDetails.balance,
      });
      setIsConnected(true);
    }
  };

  return (
    <div className={`shadow-md flex flex-wrap items-center text-sm px-4 py-2 `}>
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
              <p className="break-all">
                {wallet.walletAddress === "-" && wallet.walletAddress}
                {wallet.walletAddress !== "-" && (
                  <a
                    href={`${getEtherscanAddress({
                      network: wallet.walletNetwork,
                    })}/address/${wallet.walletAddress}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {wallet.walletAddress}
                  </a>
                )}
              </p>
            </div>
            <BreakLine className="md:hidden" />
            <div className="w-auto md:ml-12 mb-4 lg:mb-0">
              <p className="font-medium">Network</p>
              <p className="capitalize">{wallet.walletNetwork}</p>
            </div>
            <BreakLine className="md:hidden" />
            <div className="w-auto md:ml-12 mb-4 lg:mb-0">
              <p className="font-medium">Account Balance</p>
              <p>{wallet.walletBalance} ETH</p>
            </div>
          </>
        )}

        {!isConnected && (
          <PrimaryButton onClick={getWalletDetails} className="text-sm font-medium" dataTestId="connectToWallet">
            Connect Metamask
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};
