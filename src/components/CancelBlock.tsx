import React, { FunctionComponent, useState } from "react";
import { TextInput } from "./common/TextInput";
import { OrangeButton } from "./common/Button";
import { Spinner } from "./common/Spinner";
import { isValidHash } from "./util/util";
import { getPendingTransaction, cancelPendingTransaction as cancelTransaction } from "./util/cancel";
import { BigNumber } from "ethers";

export const CancelBlock: FunctionComponent = () => {
  const [processing, setProcessing] = useState(false);
  const [validateStatus, setValidateStatus] = useState("");

  const [transactionHash, setTransactionHash] = useState("");
  const [nonce, setNonce] = useState(0);
  const [gasPrice, setGasPrice] = useState(BigNumber.from(0));

  const [logs, setLogs] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateTransactionHash = async (value: string): Promise<boolean> => {
    setTransactionHash("");
    setValidateStatus("invalid");
    setNonce(0);
    setGasPrice(BigNumber.from(0));
    const trimmed_value = value.trim();
    if (isValidHash(trimmed_value)) {
      const transactionData = await getPendingTransaction(trimmed_value, setLogs);
      if (transactionData) {
        setNonce(transactionData.nonce);
        setGasPrice(transactionData.gasPrice);
        setTransactionHash(trimmed_value);
        setValidateStatus("valid");
        return true;
      }
    }
    return false;
  };

  const cancelPendingTransaction = async () => {
    setErrorMessage("");
    if (transactionHash !== "" && validateStatus === "valid") {
      if (
        confirm(
          `Are you sure you want to cancel this pending transaction?\n*There will be an increase of gas price scale by 2 times by default.\nGas price scale can be manually modified at metamask transaction popup.`
        )
      ) {
        setProcessing(true);
        await cancelTransaction(nonce, gasPrice, setLogs);
      } else {
        setLogs("Revoke certificate hash cancelled.");
      }
    } else {
      setErrorMessage("*Please enter valid transaction hash.");
    }
    setProcessing(false);
  };

  return (
    <>
      <div className={`md:flex max-w-screen-lg px-4 mx-auto mt-12`}>
        <div className="max-w-lg w-full">
          <label className="w-full text-left">
            <p>Pending Transaction</p>
            <TextInput
              className={`${validateStatus} w-full mt-3`}
              placeHolder="0x..."
              dataTestId="revoke-certificate"
              onChange={validateTransactionHash}
            />
          </label>
          <label className="inline-block w-6/12 text-left mt-3">
            <p>Transaction Nonce</p>
            <input className={`w-full`} value={nonce} disabled />
          </label>
          <label className="inline-block w-6/12 text-left mt-3">
            <p>Current Gas Price</p>
            <input className={`w-full`} value={gasPrice.toString()} disabled />
          </label>
        </div>
        <div className="w-auto md:w-fit md:ml-auto mt-auto">
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
      <div className={`max-w-screen-lg px-4 mx-auto`}>
        <p className={"text-red-600 break-all"} data-testid="error-message">
          {errorMessage}
        </p>
      </div>

      <div className="w-100 h-20 max-w-screen-lg px-4 mt-6 mx-auto ">
        <p className={"my-2 text-sm text-gray-700"}>Status </p>
        <textarea
          className={"w-full h-16 bg-gray-100 p-2 text-sm resize-none overflow-scroll"}
          disabled
          data-testid="revoke-log"
          value={logs}
        />
      </div>
    </>
  );
};
