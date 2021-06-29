import React, { FunctionComponent, useState } from "react";
import { Header } from "../components/Header";
import { IssueBlock } from "../components/IssueBlock";
import { RevokeBlock } from "../components/RevokeBlock";
import { CancelBlock } from "../components/CancelBlock";
import { StoreDeployBlock } from "../components/StoreDeployBlock";

type Feature = "issue" | "revoke" | "cancel";
type FeatureType = {
  feature: Feature;
  text: string;
};

const issue: FeatureType = {
  feature: "issue",
  text: "Issue Certificates",
};

const revoke: FeatureType = {
  feature: "revoke",
  text: "Revoke Certificate",
};

const cancel: FeatureType = {
  feature: "cancel",
  text: "Cancel Pending Transaction",
};

const blocks: FeatureType[] = [issue, revoke, cancel];

export const MainPage: FunctionComponent = () => {
  const [documentStoreAddress, setDocumentStoreAddress] = useState("");
  const [documentStoreStatus, setDocumentStoreStatus] = useState(false);
  const [activeBlock, setActiveBlock] = useState(blocks[0].feature);

  return (
    <>
      <Header />
      <div className={"container max-w-screen-lg px-4 md:mx-auto mt-4 text-center sm:text-left"}>
        <h2>Administrator Portal</h2>
      </div>

      <StoreDeployBlock
        documentStoreAddress={documentStoreAddress}
        setDocumentStoreAddress={setDocumentStoreAddress}
        setDocumentStoreStatus={setDocumentStoreStatus}
      />
      <hr className={`mt-16 max-w-screen-lg w-full mx-auto px-4`} />

      <div className={"container max-w-screen-lg mx-auto mt-8"}>
        {blocks.map((blockData, index) => {
          return (
            <a
              key={index}
              onClick={() => {
                setActiveBlock(blockData.feature);
              }}
              data-testid={`show-${blockData.feature}-btn`}
              className={`w-full cursor-pointer text-base font-medium ml-3 ${
                activeBlock === blockData.feature ? `text-primary pb-1 border-b-2 border-primary` : ""
              }`}
            >
              {blockData.text}
            </a>
          );
        })}
      </div>

      {documentStoreStatus && activeBlock !== "cancel" && (
        <>
          {activeBlock === "issue" && <IssueBlock documentStoreAddress={documentStoreAddress} />}
          {activeBlock === "revoke" && <RevokeBlock documentStoreAddress={documentStoreAddress} />}
        </>
      )}

      {!documentStoreStatus && activeBlock !== "cancel" && (
        <p className="text-center mt-14 text-gray-700">Please enter valid document store address</p>
      )}

      {activeBlock === "cancel" && <CancelBlock />}
    </>
  );
};
