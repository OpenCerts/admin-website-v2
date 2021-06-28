import React, { FunctionComponent, useState } from "react";
import { Header } from "../components/Header";
import { IssueBlock } from "../components/IssueBlock";
import { RevokeBlock } from "../components/RevokeBlock";
import { CancelBlock } from "../components/CancelBlock";
import { StoreDeployBlock } from "../components/StoreDeployBlock";

interface IssueType {
  trigger: "issue";
  text: "Issue Certificates";
}

interface RevokeType {
  trigger: "revoke";
  text: "Revoke Certificate";
}

interface CancelType {
  trigger: "cancel";
  text: "Cancel Pending Transaction";
}

type blocksType = IssueType | RevokeType | CancelType;

const issue: IssueType = {
  trigger: "issue",
  text: "Issue Certificates",
};

const revoke: RevokeType = {
  trigger: "revoke",
  text: "Revoke Certificate",
};

const cancel: CancelType = {
  trigger: "cancel",
  text: "Cancel Pending Transaction",
};

const blocks: blocksType[] = [issue, revoke, cancel];

export const MainPage: FunctionComponent = () => {
  const [documentStoreAddress, setDocumentStoreAddress] = useState("");
  const [documentStoreStatus, setDocumentStoreStatus] = useState(false);
  const [block, showBlock] = useState(blocks[0]);

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
                showBlock(blockData);
              }}
              data-testid={`show-${blockData.trigger}-btn`}
              className={`w-full cursor-pointer text-base font-medium ml-3 ${
                block === blockData ? `text-primary pb-1 border-b-2 border-primary` : ""
              }`}
            >
              {blockData.text}
            </a>
          );
        })}
      </div>

      {documentStoreStatus && block !== cancel && (
        <>
          {block === issue && <IssueBlock documentStoreAddress={documentStoreAddress} />}
          {block === revoke && <RevokeBlock documentStoreAddress={documentStoreAddress} />}
        </>
      )}

      {!documentStoreStatus && block !== cancel && (
        <p className="text-center mt-14 text-gray-700">Please enter valid document store address</p>
      )}

      {block === cancel && <CancelBlock />}
    </>
  );
};
