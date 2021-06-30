declare let window: any;
import React, { FunctionComponent } from "react";
import "./app.css";
import { MainPage } from "./page/main-page";
import { MetaMaskError } from "./page/metamask-error";

const App: FunctionComponent = () => {
  if (!window.ethereum) {
    return <MetaMaskError />;
  }

  return <MainPage />;
};

export default App;
