import React, { FunctionComponent, useState } from "react";
import { TextInput } from "./common/TextInput";
import { OrangeButton } from "./common/Button";
import { Spinner } from "./common/Spinner";
import { isValidCertificateHash, getEtherscanAddress } from "./util/util";
import { issueCertificateHash as issue } from "./util/issue";
import { getWalletNetwork } from "./util/wallet";

interface DocumentStoreAddressProp {
  documentStoreAddress: string;
}

export const IssueBlock: FunctionComponent<DocumentStoreAddressProp> = ({
  documentStoreAddress,
}) => {
  const [processing, setProcessing] = useState(false);
  const [validateStatus, setValidateStatus] = useState("");

  const [certificateHash, setCertificateHash] = useState("");
  const [logs, setLogs] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateCertificateHash = (value: string) => {
    if (value === "") {
      setValidateStatus("");
    } else if (isValidCertificateHash(value)) {
      setCertificateHash(value);
      setValidateStatus("valid");
    } else {
      setCertificateHash("");
      setValidateStatus("invalid");
    }
  };

  const issueCertificateHash = async () => {
    setSuccessMessage("");
    setErrorMessage("");
    if (certificateHash !== "" && validateStatus === "valid") {
      setProcessing(true);
      const transaction = await issue(
        documentStoreAddress,
        certificateHash,
        setLogs
      );
      if (transaction) {
        setSuccessMessage(
          `Document/Document Batch with hash ${certificateHash} has been issued on ${documentStoreAddress}`
        );

        setLogs(
          `Find more details at ${getEtherscanAddress({
            network: await getWalletNetwork(),
          })}/tx/${transaction.transactionHash}`
        );
      }
    } else {
      setErrorMessage("*Please enter valid merkle root hash.");
    }

    setProcessing(false);
  };

  return (
    <>
      <div className={`md:flex max-w-screen-lg px-4 mx-auto mt-12`}>
        <label className="max-w-lg w-full text-left">
          <p>Issue certificates with the Merkle Root Hash</p>
          <TextInput
            className={`${validateStatus} w-full mt-3`}
            placeHolder="0x..."
            onChange={validateCertificateHash}
            dataTestId="issue-certificate"
          />
        </label>
        <div className="w-auto md:w-fit md:ml-auto mt-auto">
          <OrangeButton
            onClick={() => issueCertificateHash()}
            className="w-full inline-flex justify-center text-sm font-medium"
            dataTestId="issue-certificate-btn"
          >
            {processing && <Spinner className="w-5 h-5 mr-2" />}
            <span>Issue Certificate Batch</span>
          </OrangeButton>
        </div>
      </div>
      <div className={`max-w-screen-lg px-4 mx-auto`}>
        <p className={"text-red-600 break-all"} data-testid="error-message">{errorMessage}</p>
        <p className={"text-green-600 break-all"} data-testid="success-message">{successMessage}</p>
      </div>

      <div className="w-100 h-20 max-w-screen-lg px-4 mt-6 mx-auto ">
        <p className={"my-2 text-sm text-gray-700"}>Status </p>
        <textarea
          className={
            "w-full h-16 bg-gray-100 p-2 text-sm resize-none overflow-scroll"
          }
          disabled
          data-testid="issue-log"
          value={logs}
        />
      </div>
    </>
  );
};
