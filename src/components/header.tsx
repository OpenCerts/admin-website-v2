import React, { Dispatch, FunctionComponent, useState, useEffect, useCallback } from "react";
import { PrimaryButton } from "./common/button";
import { getWalletDetails as getWalletData } from "./util/wallet";
import { getEtherscanAddress } from "./util/common";
import logo from "../images/logo.svg";
import styled from "@emotion/styled";

const BreakLine = styled.div`
  flex-basis: 100%;
`;

interface walletInfoType {
  walletAddress?: string;
  walletNetwork?: string;
  walletBalance?: string;
}

interface HeaderProps {
  isConnected: boolean;
  setIsConnected: Dispatch<boolean>;
}
export const Header: FunctionComponent<HeaderProps> = ({ isConnected, setIsConnected }) => {
  const [wallet, setWalletInfo] = useState({} as walletInfoType);

  const getWalletDetails = useCallback(async () => {
    const walletDetails = await getWalletData();
    if (walletDetails) {
      setWalletInfo({
        walletAddress: walletDetails.address,
        walletNetwork: walletDetails.network,
        walletBalance: walletDetails.balance,
      });
      setIsConnected(true);
    }
  }, [setIsConnected]);

  useEffect(() => {
    const handleAccountsChanged = (accounts: Array<string>) => {
      accounts.length > 0 ? getWalletDetails() : null;
    };

    const handleGetWalletDetails = () => {
      getWalletDetails();
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged ", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleGetWalletDetails);
      window.ethereum.on("connect", handleGetWalletDetails);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleGetWalletDetails);
        window.ethereum.removeListener("connect", handleGetWalletDetails);
      }
    };
  }, [getWalletDetails]);

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
                {!wallet.walletAddress && "-"}
                {wallet.walletAddress && wallet.walletNetwork && (
                  <a
                    href={`${getEtherscanAddress({
                      network: wallet.walletNetwork,
                    })}/address/${wallet.walletAddress}`}
                    rel="noreferrer"
                    target="_blank"
                    className="text-blue-800 underline"
                  >
                    {wallet.walletAddress}
                  </a>
                )}
              </p>
            </div>
            <BreakLine className="md:hidden" />
            <div className="w-auto md:ml-12 mb-4 lg:mb-0">
              <p className="font-medium">Network</p>
              <p className="capitalize">{!wallet.walletNetwork ? "-" : wallet.walletNetwork}</p>
            </div>
            <BreakLine className="md:hidden" />
            <div className="w-auto md:ml-12 mb-4 lg:mb-0">
              <p className="font-medium">Account Balance</p>
              <p>{!wallet.walletBalance ? "-" : wallet.walletBalance} ETH</p>
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
