import React, { FunctionComponent, useState } from "react";
import { TextInput } from "./common/text-input";
import { SecondaryButton, PrimaryButton } from "./common/button";
import { ConfirmationModalDialog } from "./common/modal-dialog";
import { Spinner } from "./common/spinner";
import { Logger } from "./common/logger";
import { isValidHash, getEtherscanAddress } from "./util/common";
import { revokeCertificateHash as revoke } from "./util/revoke";
import { getWalletNetwork } from "./util/wallet";
import { RevokeInformationPanel } from "./guides/information-panels";
import { storeDocumentStoreInLocalStorage } from "./util/document-store";

interface DocumentStoreAddressProp {
  documentStoreAddress: string;
}

export const RevokeBlock: FunctionComponent<DocumentStoreAddressProp> = ({ documentStoreAddress }) => {
  const [processing, setProcessing] = useState(false);

  const [certificateHash, setCertificateHash] = useState("");
  const [log, setLog] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

    if (certificateHash === "") {
      setErrorMessage("*Please enter valid merkle root hash (32 characters).");
      return;
    }
    setShowConfirmationDialog(true);
  };

  const revokeCertificateHash = async () => {
    setProcessing(true);
    const transaction = await revoke(documentStoreAddress, certificateHash, setLog);
    if (transaction) {
      const etherscanNetwork = getEtherscanAddress({
        network: await getWalletNetwork(),
      });
      storeDocumentStoreInLocalStorage(documentStoreAddress);
      setLog(
        `Document/Document Batch with hash ${certificateHash} has been revoked on ${documentStoreAddress}.<br/><br/>Find more details at <a href="${etherscanNetwork}/tx/${transaction.transactionHash}" target="_blank">${etherscanNetwork}/tx/${transaction.transactionHash}</a>.`
      );
    }

    setProcessing(false);
  };

  return (
    <>
      <div className={`md:flex max-w-screen-lg w-full px-4 mx-auto mt-8`}>
        <div className="max-w-lg w-full text-left">
          <label className="inline">Certificate hash to revoke</label>
          <RevokeInformationPanel />
          <TextInput
            className={`w-full mt-3 shepard-revoke-txt`}
            placeHolder="Enter certificate hash (0x...)"
            dataTestId="revoke-certificate"
            onChange={validateCertificateHash}
          />
          <p className={"text-red-600 break-all"} data-testid="error-message">
            {errorMessage}
          </p>
        </div>
        <div className="w-auto md:w-fit md:ml-auto mt-9">
          <PrimaryButton
            onClick={() => revokeConfirmation()}
            className="tw-full inline-flex justify-center text-sm font-medium shepard-revoke-btn"
            dataTestId="revoke-btn"
            disabled={processing}
          >
            {processing && <Spinner className="w-5 h-5 mr-2" />}
            <span>Revoke</span>
          </PrimaryButton>
        </div>
      </div>
      <Logger log={log} className="px-4 shepherd-revoke-log" dataTestId="revoke-log" />

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
