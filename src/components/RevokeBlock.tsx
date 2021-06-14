import React, { FunctionComponent, useState } from "react";
import { TextInput } from "./common/TextInput";
import { OrangeButton } from "./common/Button";
import { Spinner } from "./common/Spinner";
import { isValidHash, getEtherscanAddress } from "./util/util";
import { revokeCertificateHash as revoke } from "./util/revoke";
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

export const RevokeBlock: FunctionComponent<DocumentStoreAddressProp> = ({ documentStoreAddress }) => {
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

  const revokeCertificateHash = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setProcessing(true);

    if (certificateHash === "") {
      setErrorMessage("*Please enter valid merkle root hash.");
      setProcessing(false);
      return;
    }

    if (confirm("Are you sure you want to revoke this hash?")) {
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
    } else {
      setLogs("Revoke certificate hash cancelled.");
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
          <OrangeButton
            onClick={() => revokeCertificateHash()}
            className="tw-full inline-flex justify-center text-sm font-medium"
            dataTestId="revoke-certificate-btn"
          >
            {processing && <Spinner className="w-5 h-5 mr-2" />}
            <span>Revoke</span>
          </OrangeButton>
        </div>
      </div>
      <div className="w-100 h-20 max-w-screen-lg w-full px-4 mt-6 mx-auto ">
        <p className={"my-2 text-sm text-gray-700"}>Status </p>
        <LoggerStyle className={"w-full h-16 bg-gray-100 p-2 overflow-scroll break-all"} data-testid="revoke-log">
          {parse(logs)}
        </LoggerStyle>
      </div>
    </>
  );
};
