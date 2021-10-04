import React, { FunctionComponent, useState } from "react";
import { Header } from "../components/header";
import { IssueBlock } from "../components/issue-block";
import { RevokeBlock } from "../components/revoke-block";
import { CancelBlock } from "../components/cancel-block";
import { StoreDeployBlock } from "../components/store-deploy-block";
import { IssueInformationPanel, RevokeInformationPanel } from "../components/guides/information-panels";

type Feature = "issue-revoke" | "cancel-pending";
type SubFeature = "issue" | "revoke";

type FeatureType = {
  feature: Feature;
  text: string;
};

type SubFeatureType = {
  subFeature: SubFeature;
  feature: FeatureType["feature"];
  text: string;
};

const issueAndRevoke: FeatureType = {
  feature: "issue-revoke",
  text: "Revoke/Issue Certificate",
};

const cancel: FeatureType = {
  feature: "cancel-pending",
  text: "Cancel Pending Transaction",
};

const issue: SubFeatureType = {
  subFeature: "issue",
  feature: "issue-revoke",
  text: "Issue Certificates",
};

const revoke: SubFeatureType = {
  subFeature: "revoke",
  feature: "issue-revoke",
  text: "Revoke Certificate",
};

const featureBlocks: FeatureType[] = [issueAndRevoke, cancel];
const subFeatureBlocks: SubFeatureType[] = [issue, revoke];

export const MainPage: FunctionComponent = () => {
  const [documentStoreAddress, setDocumentStoreAddress] = useState("");
  const [documentStoreStatus, setDocumentStoreStatus] = useState(false);
  const [activeFeatureBlock, setActiveFeatureBlock] = useState(featureBlocks[0].feature);
  const [activeSubFeatureBlock, setActiveSubFeatureBlock] = useState(subFeatureBlocks[0].subFeature);
  const subFeatureBlockArray = subFeatureBlocks.filter((blockData) => blockData.feature === activeFeatureBlock);
  const [isConnected, setIsConnected] = useState(false);
  return (
    <>
      <Header isConnected={isConnected} setIsConnected={setIsConnected} />
      {!isConnected && (
        <h4 className="flex flex-col justify-center items-center align-middle h-full my-auto ">
          Please connect your metamask wallet.
        </h4>
      )}
      {isConnected && (
        <>
          <div className={"container max-w-screen-lg px-4 md:mx-auto mt-4 text-center sm:text-left"}>
            <h2>Administrator Portal</h2>
          </div>

          {/* Display Feature Block */}
          <div className={"container max-w-screen-lg mx-auto mt-10"}>
            {featureBlocks.map((blockData, index) => {
              return (
                <a
                  key={index}
                  onClick={() => {
                    setActiveFeatureBlock(blockData.feature);
                  }}
                  data-testid={`show-${blockData.feature}-btn`}
                  className={`w-full cursor-pointer text-base font-medium ml-3 ${
                    activeFeatureBlock === blockData.feature ? `text-primary pb-1 border-b-2 border-primary` : ""
                  }`}
                >
                  {blockData.text}
                </a>
              );
            })}
          </div>
          {activeFeatureBlock === "issue-revoke" && (
            <>
              <StoreDeployBlock
                documentStoreAddress={documentStoreAddress}
                setDocumentStoreAddress={setDocumentStoreAddress}
                setDocumentStoreStatus={setDocumentStoreStatus}
              />
            </>
          )}
          {activeFeatureBlock === "cancel-pending" && <CancelBlock />}

          {/* Display SubFeature Block */}
          <div className={"container max-w-screen-lg mx-auto mt-8"}>
            {documentStoreStatus && subFeatureBlockArray.length > 0 && (
              <hr className={`my-4 mb-8 max-w-screen-lg w-full mx-auto`} />
            )}
            {documentStoreStatus &&
              subFeatureBlockArray.length > 0 &&
              subFeatureBlockArray.map((blockData, index) => {
                return (
                  <a
                    key={index}
                    onClick={() => {
                      setActiveSubFeatureBlock(blockData.subFeature);
                    }}
                    data-testid={`show-${blockData.subFeature}-btn`}
                    className={`w-full cursor-pointer text-base font-medium ml-3 ${
                      activeSubFeatureBlock === blockData.subFeature
                        ? `text-primary pb-1 border-b-2 border-primary`
                        : ""
                    }`}
                  >
                    {blockData.text}
                  </a>
                );
              })}
          </div>

          {documentStoreStatus && activeFeatureBlock === "issue-revoke" && activeSubFeatureBlock === "revoke" && (
            <>
              <RevokeBlock documentStoreAddress={documentStoreAddress} />
              <RevokeInformationPanel />
            </>
          )}
          {documentStoreStatus && activeFeatureBlock === "issue-revoke" && activeSubFeatureBlock === "issue" && (
            <>
              <IssueBlock documentStoreAddress={documentStoreAddress} />
              <IssueInformationPanel />
            </>
          )}
        </>
      )}
    </>
  );
};
