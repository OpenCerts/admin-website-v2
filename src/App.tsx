import styled from "@emotion/styled";
import React, { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { IssueBlock } from "./components/IssueBlock";
import { RevokeBlock } from "./components/RevokeBlock";
import { StoreDeployBlock } from "./components/StoreDeployBlock";

const BlockNavigationStyle = styled.div`
  margin-top: 20px;

  a {
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: #000000;
    margin-left: 20px;

    &.active {
      color: #ff9933;
      padding-bottom: 5px;
      border-bottom: 2px solid #ff9933;
    }
  }
`;

function App() {
  const [documentStoreAddress, setDocumentStoreAddress] = useState("");
  const [documentStoreStatus, setDocumentStoreStatus] = useState(false);
  
  const blocks = [
    {
      trigger: "issue",
      text: "Issue Certificates",
    },
    {
      trigger: "revoke",
      text: "Revoke Certificate",
    },
  ];
  const [block, showBlock] = useState(blocks[0].trigger);
  return (
    <div className="App">
      <Header />
      <div
        className={
          "container max-w-screen-lg px-4 md:mx-auto mt-16 text-center sm:text-left"
        }
      >
        <h2>Administrator Portal</h2>
      </div>

      <StoreDeployBlock
        documentStoreAddress={documentStoreAddress}
        setDocumentStoreAddress={setDocumentStoreAddress}
        setDocumentStoreStatus={setDocumentStoreStatus}
      />
      <hr className={`mt-16 max-w-screen-lg mx-auto px-4`} />

      {documentStoreStatus && (
        <>
          <BlockNavigationStyle className={"container max-w-screen-lg mx-auto"}>
            {blocks.map((blockData) => {
              return (
                <a
                  onClick={() => {
                    showBlock(blockData["trigger"]);
                  }}
                  data-testid={`show-${blockData["trigger"]}-btn`}
                  className={block === blockData["trigger"] ? `active` : ""}
                >
                  {blockData["text"]}
                </a>
              );
            })}
          </BlockNavigationStyle>

          {block === "issue" && (
            <IssueBlock documentStoreAddress={documentStoreAddress} />
          )}

          {block === "revoke" && (
            <RevokeBlock documentStoreAddress={documentStoreAddress} />
          )}
        </>
      )}

      {!documentStoreStatus && (
        <p className="text-center mt-14 text-gray-700">
          Please enter valid document store address
        </p>
      )}

      {/* {showContainer === "revoke" && (
          <RevokeHash documentStoreAddress={documentStoreAddress}/>
      )} */}
    </div>
  );
}

export default App;
