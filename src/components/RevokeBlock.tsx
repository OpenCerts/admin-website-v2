import React, { FunctionComponent, useState } from "react";
import { TextInput, PrimaryButton, Spinner, Logger, ConfirmationModalDialog, SecondaryButton } from "./common";
import { isValidHash, getEtherscanAddress } from "./util/common";
import { revokeCertificateHash as revoke } from "./util/revoke";
import { getWalletNetwork } from "./util/wallet";

interface DocumentStoreAddressProp {
  documentStoreAddress: string;
}

export const RevokeBlock: FunctionComponent<DocumentStoreAddressProp> = ({ documentStoreAddress }) => {
  const [processing, setProcessing] = useState(false);

  const [certificateHash, setCertificateHash] = useState("");
  const [logs, setLogs] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const validateCertificateHash = (value: string) => {
    if (isValidHash(value)) {
      setCertificateHash(value);
    } else {
      setCertificateHash("");
    }
  };

  const revokeConfirmation = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (certificateHash === "") {
      setErrorMessage("*Please enter valid merkle root hash (32 characters).");
      return;
    }
    setShowConfirmationDialog(true);
  };

  const revokeCertificateHash = async () => {
    setProcessing(true);
    const transaction = await revoke(documentStoreAddress, certificateHash, setLogs);
    if (transaction) {
      const etherscanNetwork = getEtherscanAddress({
        network: await getWalletNetwork(),
      });

      setSuccessMessage(
        `Document/Document Batch with hash ${certificateHash} has been revoked on ${documentStoreAddress}.`
      );

      setLogs(
        `Find more details at <a href="${etherscanNetwork}/tx/${transaction.transactionHash}" target="_blank">${etherscanNetwork}/tx/${transaction.transactionHash}</a>.`
      );
    }

    setProcessing(false);
  };

  return (
    <>
      <div className={`md:flex max-w-screen-lg w-full px-4 mx-auto mt-12`}>
        <label className="max-w-lg w-full text-left">
          <p>Certificate hash to revoke</p>
          <TextInput
            className={`w-full mt-3`}
            placeHolder="0x..."
            dataTestId="revoke-certificate"
            onChange={validateCertificateHash}
          />
          <p className={"text-red-600 break-all"} data-testid="error-message">
            {errorMessage}
          </p>
          <p className={"text-green-600 break-all"} data-testid="success-message">
            {successMessage}
          </p>
        </label>
        <div className="w-auto md:w-fit md:ml-auto mt-9">
          <PrimaryButton
            onClick={() => revokeConfirmation()}
            className="tw-full inline-flex justify-center text-sm font-medium"
            dataTestId="revoke-btn"
          >
            {processing && <Spinner className="w-5 h-5 mr-2" />}
            <span>Revoke</span>
          </PrimaryButton>
        </div>
      </div>
      <Logger log={logs} className="px-4" />

      <ConfirmationModalDialog
        title="Confirm Revoke Certification Hash ?"
        message="*Please note that this action is irreversible."
        toggleOpen={showConfirmationDialog}
      >
        <SecondaryButton onClick={() => setShowConfirmationDialog(false)} className="w-full mr-5 text-sm font-medium">
          Cancel
        </SecondaryButton>
        <PrimaryButton
          onClick={() => {
            revokeCertificateHash();
            setShowConfirmationDialog(false);
          }}
          dataTestId="confirm-revoke-btn"
          className="w-full inline-flex justify-center text-sm font-medium"
        >
          Revoke
        </PrimaryButton>
      </ConfirmationModalDialog>
    </>
  );
};
