import React, { FunctionComponent, useState } from "react";
import { TextInput } from "./common/text-input";
import { PrimaryButton } from "./common/button";
import { Spinner } from "./common/spinner";
import { Logger } from "./common/logger";
import { isValidHash, getEtherscanAddress } from "./util/common";
import { issueCertificateHash as issue } from "./util/issue";
import { getWalletNetwork } from "./util/wallet";
import { IssueInformationPanel } from "./guides/information-panels";
import { storeDocumentStoreInLocalStorage } from "./util/document-store";

interface DocumentStoreAddressProp {
  documentStoreAddress: string;
}

export const IssueBlock: FunctionComponent<DocumentStoreAddressProp> = ({ documentStoreAddress }) => {
  const [processing, setProcessing] = useState(false);
  const [certificateHash, setCertificateHash] = useState("");
  const [log, setLog] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateCertificateHash = (value: string) => {
    if (isValidHash(value)) {
      setCertificateHash(value);
    } else {
      setCertificateHash("");
    }
  };

  const issueCertificateHash = async () => {
    setSuccessMessage("");
    setErrorMessage("");
    setProcessing(true);

    if (certificateHash === "") {
      setErrorMessage("*Please enter valid merkle root hash (32 characters).");
      setProcessing(false);
      return;
    }

    if (certificateHash !== "") {
      const transaction = await issue(documentStoreAddress, certificateHash, setLog);
      if (transaction) {
        const etherscanNetwork = getEtherscanAddress({
          network: await getWalletNetwork(),
        });
        storeDocumentStoreInLocalStorage(documentStoreAddress);
        setSuccessMessage(
          `Document/Document Batch with hash ${certificateHash} has been issued to ${documentStoreAddress}`
        );
        setLog(
          `Find more details at <a href="${etherscanNetwork}/tx/${transaction.transactionHash}" target="_blank">${etherscanNetwork}/tx/${transaction.transactionHash}</a>.`
        );
      }
    }

    setProcessing(false);
  };

  return (
    <div className="mb-16">
      <div className={`md:flex max-w-screen-lg w-full px-4 mx-auto mt-8`}>
        <div className={"max-w-lg w-full text-left"}>
          <label className="inline">Issue certificates with the Merkle Root Hash</label>
          <IssueInformationPanel />
          <TextInput
            className={`w-full mt-3 shepard-issue-txt`}
            placeHolder="Enter merkle root hash (0x...)"
            onChange={validateCertificateHash}
            dataTestId="issue-certificate"
          />
          <p className={"text-red-600 break-all"} data-testid="error-message">
            {errorMessage}
          </p>
          <p className={"text-green-600 break-all"} data-testid="success-message">
            {successMessage}
          </p>
        </div>
        <div className="w-auto md:w-fit md:ml-auto mt-9">
          <PrimaryButton
            onClick={() => issueCertificateHash()}
            className="w-full inline-flex justify-center text-sm font-medium shepard-issue-btn"
            dataTestId="issue-certificate-btn"
            disabled={processing}
          >
            {processing && <Spinner className="w-5 h-5 mr-2" />}
            <span>Issue</span>
          </PrimaryButton>
        </div>
      </div>

      <Logger log={log} className="px-4 shepherd-issue-log" />
    </div>
  );
};
