import styled from "@emotion/styled";
import React, { FunctionComponent, useState } from "react";
import { CancelBlock } from "../components/CancelBlock";
import { Header } from "../components/Header";
import { IssueBlock } from "../components/IssueBlock";
import { RevokeBlock } from "../components/RevokeBlock";
import { StoreDeployBlock } from "../components/StoreDeployBlock";

const BlockNavigationStyle = styled.div`
  margin-top: 20px;

  a {
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: #000000;
    margin-left: 20px;
    margin-left: 20px;

    &.active {
      color: #ff9933;
      padding-bottom: 5px;
      border-bottom: 2px solid #ff9933;
    }
  }
`;

const blocks = [
  {
    trigger: "issue",
    text: "Issue Certificates",
  },
  {
    trigger: "revoke",
    text: "Revoke Certificate",
  },
  {
    trigger: "cancel",
    text: "Cancel Pending Transaction",
  },
];

export const MainPage: FunctionComponent = () => {
  const [documentStoreAddress, setDocumentStoreAddress] = useState("");
  const [documentStoreStatus, setDocumentStoreStatus] = useState(false);
  const [block, showBlock] = useState(blocks[0].trigger);

  return (
    <>
      <Header />
      <div className={"container max-w-screen-lg px-4 md:mx-auto mt-16 text-center sm:text-left"}>
        <h2>Administrator Portal</h2>
      </div>

      <StoreDeployBlock
        documentStoreAddress={documentStoreAddress}
        setDocumentStoreAddress={setDocumentStoreAddress}
        setDocumentStoreStatus={setDocumentStoreStatus}
      />
      <hr className={`mt-16 max-w-screen-lg w-full mx-auto px-4`} />

      <BlockNavigationStyle className={"container max-w-screen-lg mx-auto"}>
        {blocks.map((blockData, index) => {
          return (
            <a
              key={index}
              onClick={() => {
                showBlock(blockData["trigger"]);
              }}
              data-testid={`show-${blockData["trigger"]}-btn`}
              className={block === blockData["trigger"] ? `w-full active` : "w-full "}
            >
              {blockData["text"]}
            </a>
          );
        })}
      </BlockNavigationStyle>

      {documentStoreStatus && (
        <>
          {block === "issue" && <IssueBlock documentStoreAddress={documentStoreAddress} />}

          {block === "revoke" && <RevokeBlock documentStoreAddress={documentStoreAddress} />}
        </>
      )}

      {!documentStoreStatus && block !== "cancel" && (
        <p className="text-center mt-14 text-gray-700">Please enter valid document store address</p>
      )}

      {block === "cancel" && <CancelBlock />}
    </>
  );
};
