import React, { FunctionComponent, useState } from "react";
import { TextInput, PrimaryButton, Spinner, Logger, ConfirmationModalDialog, SecondaryButton } from "./common";
import { isValidHash } from "./util/common";
import { getPendingTransaction, cancelPendingTransaction as cancelTransaction } from "./util/cancel";
import { BigNumber } from "ethers";

export const CancelBlock: FunctionComponent = () => {
  const [processing, setProcessing] = useState(false);

  const [transactionHash, setTransactionHash] = useState("");
  const [nonce, setNonce] = useState(0);
  const [currentGasPrice, setCurrentGasPrice] = useState(0);
  const [newGasPrice, setNewGasPrice] = useState(0);

  const [logs, setLogs] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

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

  const cancelPendingConfirmation = async () => {
    setErrorMessage("");

    if (transactionHash === "") {
      setErrorMessage("*Please enter valid transaction hash (32 characters).");
      setProcessing(false);
      return;
    }

    if (newGasPrice <= currentGasPrice) {
      setErrorMessage("*New gas price must be higher than current gas price.");
      setProcessing(false);
      return;
    }

    setShowConfirmationDialog(true);
  };

  const cancelPendingTransaction = async () => {
    setProcessing(true);
    await cancelTransaction(nonce, BigNumber.from(newGasPrice), setLogs);
    setProcessing(false);
  };

  return (
    <div className={"max-w-screen-lg w-full px-4 mx-auto mt-12"}>
      <p className={"text-red-600"}>
        *The new gas price is default set 2 times the current gas price. <br />
        The new gas price can be manually modified in the New Gas Price text input.
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
          <PrimaryButton
            onClick={() => cancelPendingConfirmation()}
            className="tw-full inline-flex justify-center text-sm font-medium"
            dataTestId="revoke-certificate-btn"
          >
            {processing && <Spinner className="w-5 h-5 mr-2" />}
            <span>Cancel Transaction</span>
          </PrimaryButton>
        </div>
      </div>
      <Logger log={logs} className="px-4" />
      <ConfirmationModalDialog
        title="Cancel Pending Transaction ?"
        message="*Please note that this action is irreversible."
        toggleOpen={showConfirmationDialog}
      >
        <SecondaryButton onClick={() => setShowConfirmationDialog(false)} className="w-full mr-5 text-sm font-medium">
          Cancel
        </SecondaryButton>
        <PrimaryButton
          onClick={() => {
            cancelPendingTransaction();
            setShowConfirmationDialog(false);
          }}
          className="w-full inline-flex justify-center text-sm font-medium"
        >
          Cancel Transaction
        </PrimaryButton>
      </ConfirmationModalDialog>
    </div>
  );
};
