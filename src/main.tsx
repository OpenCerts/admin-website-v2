import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "shepherd.js/dist/css/shepherd.css";
import App from "./app";
import { initGTM } from "./gtm";

initGTM(import.meta.env.VITE_GTM_CONTAINER_ID);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
