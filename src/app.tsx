import React, { FunctionComponent, useEffect, useState } from "react";
import "./app.css";
import { MainPage } from "./page/main-page";
import { MetaMaskError } from "./page/metamask-error";
import { MetaMaskPending } from "./page/metamask-pending";
import { EthereumProviderError } from "eth-rpc-errors";

const App: FunctionComponent = () => {
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  useEffect(() => {
    checkMetaMaskAccount();
  }, []);

  // The documentation and error code referenced from :
  // https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider
  // https://docs.metamask.io/guide/ethereum-provider.html#errors
  const checkMetaMaskAccount = async () => {
    try {
      if (window.ethereum.request) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        accounts.length > 0 ? setMetamaskConnected(true) : setMetamaskConnected(false);
      }
    } catch (e) {
      if (e instanceof EthereumProviderError) {
        e.code === 4001 ? setMetamaskConnected(true) : console.error("Unable to connect to Metamask", e);
      } else {
        console.error("Unable to connect to Metamask", e);
      }
    }
  };

  if (!window.ethereum) {
    return <MetaMaskError />;
  }

  return metamaskConnected ? <MainPage /> : <MetaMaskPending />;
};

export default App;
