import React, { FunctionComponent, useEffect, useState } from "react";
import "./app.css";
import "./definition.ts";

import { MainPage } from "./page/main-page";
import { MetaMaskError } from "./page/metamask-error";
import { MetaMaskPending } from "./page/metamask-pending";

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
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      accounts.length > 0 ? setMetamaskConnected(true) : setMetamaskConnected(false);
    } catch (e) {
      e.code === 4001 ? setMetamaskConnected(true) : console.debug(e);
    }
  };

  if (!window.ethereum) {
    return <MetaMaskError />;
  }

  return metamaskConnected ? <MainPage /> : <MetaMaskPending />;
};

export default App;
