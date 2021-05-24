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
  const [certificateHash, setCertificateHash] = useState("");
  const [validateStatus, setValidateStatus] = useState("");
  const [issueStatus, setIssueStatus] = useState(false);
  const [issueLogs, setIssueLogs] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateCertificateHash = (value: string) => {
    if (value === "") {
      setValidateStatus("");
    } else {
      if (isValidCertificateHash(value)) {
        setCertificateHash(value);
        setValidateStatus("valid");
      } else {
        setCertificateHash("");
        setValidateStatus("invalid");
      }
    }
  };

  const issueCertificateHash = async () => {
    if (certificateHash !== "" && validateStatus === "valid") {
      setIssueStatus(true);
      const transaction = await issue(
        documentStoreAddress,
        certificateHash,
        setIssueLogs
      );
      if (transaction) {
        setSuccessMessage(
          `Document/Document Batch with hash ${certificateHash} has been issued on ${documentStoreAddress}`
        );

        setIssueLogs(
          `Find more details at ${getEtherscanAddress({
            network: await getWalletNetwork(),
          })}/tx/${transaction.transactionHash}`
        );
      }

      setErrorMessage("");
      setIssueStatus(false);
    } else {
      setErrorMessage("*Please enter valid merkle root hash.");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <div
        className={`container md:flex max-w-screen-lg px-4 md:mx-auto mt-12`}
      >
        <label className="block md:flex-grow md:max-w-lg md:mr-10 text-left">
          <p>Issue certificates with the Merkle Root Hash</p>
          <TextInput
            className={`${validateStatus} w-full mt-3`}
            placeHolder="0x..."
            onChange={validateCertificateHash}
          />
        </label>
        <div className="w-auto md:w-fit md:ml-auto mt-auto">
          <OrangeButton
            onClick={() => issueCertificateHash()}
            className="tw-full inline-flex justify-center text-sm font-medium"
          >
            {issueStatus && <Spinner className="w-5 h-5 mr-2" />}
            <span>Issue Certificate Batch</span>
          </OrangeButton>
        </div>
      </div>
      <div className={`container max-w-screen-lg px-4 md:mx-auto`}>
        <p className={"text-red-600"}>{errorMessage}</p>
        <p className={"text-green-600"}>{successMessage}</p>
      </div>

      <div className="w-100 h-20 max-w-screen-lg px-4 mt-6 mx-auto ">
        <p className={"my-2 text-sm text-gray-700"}>Status </p>
        <textarea
          className={
            "w-full h-16 bg-gray-100 p-2 text-sm resize-none overflow-scroll"
          }
          disabled
          value={issueLogs}
        />
      </div>
    </>
  );
};
