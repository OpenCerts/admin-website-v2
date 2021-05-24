import React, { FunctionComponent, useState } from "react";
import { TextInput } from "./common/TextInput";
import { GreyButton, OrangeButton } from "./common/Button";
import { Modal } from "./common/Modal";
import { Spinner } from "./common/Spinner";
import { isAddress } from "ethers/lib/utils";
import { getWalletNetwork } from "./util/wallet";

import { deployDocumentStore as deploy } from "./util/deploy";
import { getEtherscanAddress } from "./util/util";

interface DocumentStoreAddressProp {
  documentStoreAddress: string;
  setDocumentStoreAddress: Function;
  setDocumentStoreStatus: Function;
}

export const StoreDeployBlock: FunctionComponent<DocumentStoreAddressProp> = ({
  documentStoreAddress,
  setDocumentStoreAddress,
  setDocumentStoreStatus,
}) => {
  const [deployModal, toggleDeployModal] = useState(false);
  const [deployStatus, setDeployStatus] = useState(false);
  const [validateStatus, setValidateStatus] = useState("");
  const [documentStoreName, setDocumentStoreName] = useState("");
  const [deployLogs, setDeployLogs] = useState("");

  const validateStorageAddress = (value: string) => {
    if (value === "") {
      setValidateStatus("");
    } else {
      if (isAddress(value)) {
        setDocumentStoreStatus(true);
        setValidateStatus("valid");
      } else {
        setDocumentStoreStatus(false);
        setValidateStatus("invalid");
      }
    }
    setDocumentStoreAddress(value);
  };

  const validateStorageName = (value: string) => {
    setDocumentStoreName(value);
  };

  const deployDocumentStore = async () => {
    if (documentStoreName != "") {
      setDeployStatus(true);
      const documentStore = await deploy(documentStoreName, setDeployLogs);
      if (documentStore) {
        const documentNetwork = await getWalletNetwork();
        setDeployLogs(
          `Document Store Deployed. Find more details at ${getEtherscanAddress({
            network: documentNetwork,
          })}/address/${documentStore.contractAddress}`
        );
        setDeployStatus(false);
        setDocumentStoreAddress(documentStore.contractAddress);
        validateStorageAddress(documentStore.contractAddress);
      } else {
        setDeployStatus(false);
      }
    } else {
      setDeployStatus(false);
    }
  };

  return (
    <>
      <div
        className={`md:flex max-w-screen-lg px-4 md:mx-auto mt-12`}
      >
        <label className="block md:flex-grow md:max-w-lg md:mr-10 text-left">
          <p>Store Address</p>
          <TextInput
            className={`${validateStatus} w-full mt-3`}
            placeHolder="Enter existing (0x…), or deploy new instance."
            onChange={validateStorageAddress}
            value={documentStoreAddress}
          />
        </label>
        <p className="text-center my-4 text-gray-400 md:hidden">Or</p>
        <div className="w-auto md:w-fit md:ml-auto mt-auto">
          <OrangeButton
            onClick={() => {
              toggleDeployModal(true);
              setDeployLogs("");
              setDocumentStoreName("");
            }}
            className="text-sm w-full font-medium"
          >
            <span>Deploy New Instance</span>
          </OrangeButton>
        </div>
      </div>

      <Modal toggleOpen={deployModal}>
        <div className="sm:flex sm:items-start w-100 ">
          <div className="w-full mt-3 sm:mt-0 sm:text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Deploy Document Store
            </h3>
            <div className="w-full mt-10">
              <TextInput
                className={"w-full"}
                onChange={validateStorageName}
                placeHolder="Name of organisation."
                value={documentStoreName}
              />
            </div>
          </div>
        </div>
        <div className="px-4 pt-5 md:pt-6 pb-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <OrangeButton
            onClick={deployDocumentStore}
            className="w-full inline-flex justify-center text-sm font-medium "
          >
            {deployStatus && <Spinner className="w-5 h-5 mr-2" />}
            Deploy
          </OrangeButton>
          <GreyButton
            onClick={() => toggleDeployModal(false)}
            className="w-full text-sm font-medium mr-5"
          >
            Cancel
          </GreyButton>
        </div>
        <div className="my-3 w-100 h-20">
          <hr />
          <p className={"my-2 text-sm text-gray-700"}>Status </p>
          <textarea
            className={
              "w-full h-16 bg-gray-100 p-2 text-sm resize-none overflow-scroll"
            }
            disabled
            value={deployLogs}
          />
        </div>
      </Modal>
    </>
  );
};
