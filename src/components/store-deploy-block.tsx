import React, { Dispatch, FunctionComponent, useEffect, useState } from "react";
import { TextInput } from "./common/text-input";
import { SecondaryButton, PrimaryButton } from "./common/button";
import { ModalDialog } from "./common/modal-dialog";
import { Spinner } from "./common/spinner";
import { Logger } from "./common/logger";
import { getWalletNetwork } from "./util/wallet";
import { deployDocumentStore as deploy } from "./util/deploy";
import { getEtherscanAddress } from "./util/common";
import { isAddress } from "ethers/lib/utils";
import { retrieveDocumentStoreInformation, setDocumentStoreInformation } from "./util/document-store";
import { AutoCompleteInput } from "./common/autocomplete-input";

interface DocumentStoreAddressProps {
  documentStoreAddress: string;
  setDocumentStoreAddress: Dispatch<string>;
  setDocumentStoreStatus: Dispatch<boolean>;
}

export const StoreDeployBlock: FunctionComponent<DocumentStoreAddressProps> = ({
  documentStoreAddress,
  setDocumentStoreAddress,
  setDocumentStoreStatus,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [documentStoreName, setDocumentStoreName] = useState("");
  const [localDocumentStores, setLocalDocumentStores] = useState<string[]>([]);
  const [filteredSuggestion, setFilteredSuggestion] = useState<string[]>([]);
  const [log, setLog] = useState("");

  const validateStorageAddress = (value: string) => {
    setDocumentStoreAddress(value);
    if (isAddress(value)) {
      setDocumentStoreStatus(true);
    } else {
      setDocumentStoreStatus(false);
    }
  };

  const deployDocumentStore = async () => {
    if (documentStoreName !== "") {
      setProcessing(true);
      const transaction = await deploy(documentStoreName, setLog);
      if (transaction) {
        const walletNetwork = await getWalletNetwork();
        const etherscanNetwork = getEtherscanAddress({
          network: walletNetwork,
        });
        setLog(
          `Document Store Deployed. Find more details at <a href="${etherscanNetwork}/address/${transaction.contractAddress}" target="_blank">${etherscanNetwork}/address/${transaction.contractAddress}</a>.`
        );
        setDocumentStoreInformation(documentStoreAddress);
        validateStorageAddress(transaction.contractAddress);
        setShowModal(false);
      }
    }
    setProcessing(false);
  };

  useEffect(() => {
    async function getLocalStorageDocumentStore() {
      const documentStoreInformation = await retrieveDocumentStoreInformation();
      setLocalDocumentStores(documentStoreInformation);
    }

    getLocalStorageDocumentStore();
  }, []);

  const onSuggestionsFetchRequested = async (value: string, reason: string): Promise<void> => {
    setDocumentStoreAddress(value);
    if (reason == "input-focused") {
      const documentStoreInformation = await retrieveDocumentStoreInformation();
      setLocalDocumentStores(documentStoreInformation);
      setFilteredSuggestion(documentStoreInformation);
    } else {
      const filtered = localDocumentStores.filter((documentStore) => documentStore.startsWith(value.trim()));
      setFilteredSuggestion(filtered);
    }
  };

  return (
    <>
      <div className={`md:flex max-w-screen-lg w-full px-4 mt-10 mx-auto`}>
        <label className="max-w-lg w-full text-left">
          <p>Document Store Address</p>

          <AutoCompleteInput
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            filteredSuggestion={filteredSuggestion}
            inputValue={documentStoreAddress}
            inputOnChange={validateStorageAddress}
            placeHolder="Enter existing (0x…), or deploy new instance."
            id="document-store"
          />
        </label>
        <p className="text-center my-4 text-gray-400 md:hidden">Or</p>
        <div className="md:ml-auto mt-auto">
          <PrimaryButton
            onClick={() => {
              setShowModal(true);
              setDocumentStoreName("");
            }}
            className="text-sm w-full font-medium"
          >
            <span>Deploy New Instance</span>
          </PrimaryButton>
        </div>
      </div>

      <ModalDialog toggleOpen={showModal}>
        <div className="sm:items-start w-full">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Deploy Document Store</h3>
          <TextInput
            className={"w-full mt-3"}
            onChange={(value) => setDocumentStoreName(value)}
            placeHolder="Name of Organisation."
            value={documentStoreName}
          />
        </div>
        <div className="sm:flex pt-5">
          <SecondaryButton onClick={() => setShowModal(false)} className="w-full mr-5 text-sm font-medium">
            Cancel
          </SecondaryButton>
          <PrimaryButton
            onClick={deployDocumentStore}
            className="w-full inline-flex justify-center text-sm font-medium"
          >
            {processing && <Spinner className="w-5 h-5 mr-2" />}
            Deploy
          </PrimaryButton>
        </div>
        <Logger log={log} />
      </ModalDialog>
    </>
  );
};
