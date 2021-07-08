declare let window: any;
import React, { FunctionComponent, useEffect, useState } from "react";
import "./app.css";
import { MainPage } from "./page/main-page";
import { MetaMaskError } from "./page/metamask-error";
import { MetaMaskPending } from "./page/metamask-pending";

const App: FunctionComponent = () => {
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  useEffect(() => {
    checkMetaMaskAccount();
  });

  const checkMetaMaskAccount = async () => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    accounts.length > 0 ? setMetamaskConnected(true) : setMetamaskConnected(false);
  };

  if (!window.ethereum) {
    return <MetaMaskError />;
  }

  return metamaskConnected ? <MainPage /> : <MetaMaskPending />;
};

export default App;
