import React, { FunctionComponent, useState } from "react";
import { TextInput } from "./common/TextInput";
import { OrangeButton } from "./common/Button";
import { Spinner } from "./common/Spinner";
import { isValidCertificateHash, getEtherscanAddress } from "./util/util";
import { revokeCertificateHash as revoke } from "./util/revoke";
import { getWalletNetwork } from "./util/wallet";

interface DocumentStoreAddressProp {
  documentStoreAddress: string;
}

export const RevokeBlock: FunctionComponent<DocumentStoreAddressProp> = ({
  documentStoreAddress,
}) => {
  const [certificateHash, setCertificateHash] = useState("");
  const [validateStatus, setValidateStatus] = useState("");
  const [revokeStatus, setRevokeStatus] = useState(false);
  const [revokeLogs, setRevokeLogs] = useState("");
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

  const revokeCertificateHash = async () => {
    if (
      certificateHash !== "" &&
      validateStatus === "valid" &&
      confirm("Are you sure you want to revoke this hash?")
    ) {
      setRevokeStatus(true);
      const transaction = await revoke(
        documentStoreAddress,
        certificateHash,
        setRevokeLogs
      );
      if (transaction) {
        setSuccessMessage(
          `Document/Document Batch with hash ${certificateHash} has been revoked on ${documentStoreAddress}`
        );

        setRevokeLogs(
          `Find more details at ${getEtherscanAddress({
            network: await getWalletNetwork(),
          })}/tx/${transaction.transactionHash}`
        );
      }

      setErrorMessage("");
      setRevokeStatus(false);
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
          <p>Certificate hash to revoke</p>
          <TextInput
            className={`${validateStatus} w-full mt-3`}
            placeHolder="0x..."
            onChange={validateCertificateHash}
          />
        </label>
        <div className="w-auto md:w-fit md:ml-auto mt-auto">
          <OrangeButton
            onClick={() => revokeCertificateHash()}
            className="tw-full inline-flex justify-center text-sm font-medium"
          >
            {revokeStatus && <Spinner className="w-5 h-5 mr-2" />}
            <span>Revoke</span>
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
          value={revokeLogs}
        />
      </div>
    </>
  );
};
