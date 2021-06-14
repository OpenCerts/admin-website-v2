import React, { FunctionComponent, useState } from "react";
import { TextInput } from "./common/TextInput";
import { OrangeButton } from "./common/Button";
import { Spinner } from "./common/Spinner";
import { isValidHash, getEtherscanAddress } from "./util/util";
import { issueCertificateHash as issue } from "./util/issue";
import { getWalletNetwork } from "./util/wallet";
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

interface DocumentStoreAddressProp {
  documentStoreAddress: string;
}

export const IssueBlock: FunctionComponent<DocumentStoreAddressProp> = ({ documentStoreAddress }) => {
  const [processing, setProcessing] = useState(false);
  const [certificateHash, setCertificateHash] = useState("");
  const [logs, setLogs] = useState("");
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
      setErrorMessage("*Please enter valid merkle root hash (32 character).");
      setProcessing(false);
      return;
    }

    if (certificateHash !== "") {
      const transaction = await issue(documentStoreAddress, certificateHash, setLogs);
      if (transaction) {
        const etherscanNetwork = getEtherscanAddress({
          network: await getWalletNetwork(),
        });

        setSuccessMessage(
          `Document/Document Batch with hash ${certificateHash} has been issued on ${documentStoreAddress}`
        );

        setLogs(
          `Find more details at <a href="${etherscanNetwork}/tx/${transaction.transactionHash}" target="_blank">${etherscanNetwork}/tx/${transaction.transactionHash}</a>.`
        );
      }
    }

    setProcessing(false);
  };

  return (
    <div className="mb-16">
      <div className={`md:flex max-w-screen-lg w-full px-4 mx-auto mt-12`}>
        <label className="max-w-lg w-full text-left">
          <p>Issue certificates with the Merkle Root Hash</p>
          <TextInput
            className={`w-full mt-3`}
            placeHolder="0x..."
            onChange={validateCertificateHash}
            dataTestId="issue-certificate"
          />
          <p className={"text-red-600 break-all"} data-testid="error-message">
            {errorMessage}
          </p>
          <p className={"text-green-600 break-all"} data-testid="success-message">
            {successMessage}
          </p>
        </label>
        <div className="w-auto md:w-fit md:ml-auto mt-9">
          <OrangeButton
            onClick={() => issueCertificateHash()}
            className="w-full inline-flex justify-center text-sm font-medium"
            dataTestId="issue-certificate-btn"
          >
            {processing && <Spinner className="w-5 h-5 mr-2" />}
            <span>Issue</span>
          </OrangeButton>
        </div>
      </div>

      <div className="w-100 h-20 max-w-screen-lg w-full px-4 mt-6 mx-auto ">
        <p className={"my-2 text-sm text-gray-700"}>Status </p>
        <LoggerStyle className={"w-full h-16 bg-gray-100 p-2 overflow-scroll break-all"} data-testid="issue-log">
          {parse(logs)}
        </LoggerStyle>
      </div>
    </div>
  );
};
