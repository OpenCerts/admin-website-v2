import React, { FunctionComponent, useState } from "react";
import { TextInput } from "./common/TextInput";
import { OrangeButton } from "./common/Button";
import { Spinner } from "./common/Spinner";
import { isValidHash } from "./util/util";
import { getPendingTransaction, cancelPendingTransaction as cancelTransaction } from "./util/cancel";
import { BigNumber } from "ethers";
import parse from "html-react-parser";
import styled from "@emotion/styled";

const LoggerStyle = styled.p`
  a {
    color: blue;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  a:active {
    color: black;
  }
`;

export const CancelBlock: FunctionComponent = () => {
  const [processing, setProcessing] = useState(false);

  const [transactionHash, setTransactionHash] = useState("");
  const [nonce, setNonce] = useState(0);
  const [currentGasPrice, setCurrentGasPrice] = useState(0);
  const [newGasPrice, setNewGasPrice] = useState(0);

  const [logs, setLogs] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateTransactionHash = async (value: string): Promise<boolean> => {
    setErrorMessage("");
    const trimmed_value = value.trim();
    if (isValidHash(trimmed_value)) {
      const transactionData = await getPendingTransaction(trimmed_value, setLogs);
      if (transactionData) {
        setNonce(transactionData.nonce);
        setCurrentGasPrice(transactionData.gasPrice.toNumber());
        setNewGasPrice(transactionData.gasPrice.mul(2).toNumber());
        setTransactionHash(trimmed_value);
        return true;
      }
    } else {
      setTransactionHash("");
      setNonce(0);
      setCurrentGasPrice(0);
      setNewGasPrice(0);
    }
    return false;
  };

  const cancelPendingTransaction = async () => {
    setErrorMessage("");
    setProcessing(true);

    if (newGasPrice <= currentGasPrice) {
      setErrorMessage("*New gas price must be higher than current gas price.");
      setProcessing(false);
      return;
    }

    if (transactionHash === "") {
      setErrorMessage("*Please enter valid transaction hash.");
      setProcessing(false);
      return;
    }

    if (confirm(`Are you sure you want to cancel this pending transaction ?`)) {
      await cancelTransaction(nonce, BigNumber.from(newGasPrice), setLogs);
    } else {
      setLogs("Revoke certificate hash has been cancelled by the user.");
    }

    setProcessing(false);
  };

  return (
    <div className={"max-w-screen-lg w-full px-4 mx-auto mt-12"}>
      <p className={"text-red-600"}>
        *The new gas price is default set 2 times the current gas price. <br />
        The new gas price can be manually modified in the New Gas Price's text input.
      </p>
      <div className={`md:flex`}>
        <div className="mt-6 max-w-lg w-full">
          <label className="w-full text-left">
            <p>Pending Transaction</p>
            <TextInput
              className={`w-full mt-3`}
              placeHolder="0x..."
              dataTestId="revoke-certificate"
              onChange={validateTransactionHash}
            />
            <p className={"text-red-600 break-all"} data-testid="error-message">
              {errorMessage}
            </p>
          </label>
          <label className="inline-block w-4/12 text-left mt-6">
            <p>Transaction Nonce</p>
            <p className={`w-full mt-3`}>{nonce}</p>
          </label>
          <label className="inline-block w-4/12 text-left mt-6">
            <p>Current Gas Price</p>
            <p className={`w-full mt-3`}>{currentGasPrice} Wei</p>
          </label>
          <label className="inline-block w-4/12 text-left mt-6">
            <p>New Gas Price (Wei)</p>
            <input
              className={`w-full mt-3 pl-2 border-2`}
              type="number"
              min="1000000000"
              value={newGasPrice}
              onChange={(e) => {
                setNewGasPrice(Number(e.currentTarget.value));
              }}
            />
          </label>
        </div>
        <div className="w-auto md:w-fit md:ml-auto mt-14">
          <OrangeButton
            onClick={() => cancelPendingTransaction()}
            className="tw-full inline-flex justify-center text-sm font-medium"
            dataTestId="revoke-certificate-btn"
          >
            {processing && <Spinner className="w-5 h-5 mr-2" />}
            <span>Cancel Transaction</span>
          </OrangeButton>
        </div>
      </div>

      <div className="w-100 h-20 max-w-screen-lg w-full mt-6 mx-auto ">
        <p className={"my-2 text-sm text-gray-700"}>Status </p>
        <LoggerStyle
          className={"w-full h-16 bg-gray-100 p-2 text-sm resize-none overflow-scroll"}
          data-testid="cancel-log"
        >
          {parse(logs)}
        </LoggerStyle>
      </div>
    </div>
  );
};
