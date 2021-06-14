declare let window: any;
import React, { FunctionComponent } from "react";
import "./App.css";
import { MainPage } from "./page/MainPage";
import { MetaMaskError } from "./page/MetaMaskError";

const App: FunctionComponent = () => {
  if (!window.ethereum) {
    return <MetaMaskError />;
  }

  return <MainPage />;
};

export default App;
