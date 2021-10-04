import React, { FunctionComponent } from "react";

export const IssueInformationPanel: FunctionComponent = () => {
  return (
    <>
      <hr className="max-w-screen-lg w-full px-4 mt-10 mx-auto" />
      <div className={`max-w-screen-lg w-full text-left px-4 my-10 mx-auto`}>
        <h3 className="">Guide to Issue Certificate Hash</h3>
        <ol className="mt-4 ml-5 list-outside list-decimal">
          <li className="mb-2">
            Certificate hash can be retrieve by following{" "}
            <a
              href="https://www.openattestation.com/docs/verifiable-document/raw-document"
              className="text-blue-900 underline"
            >
              OpenAttestation guide
            </a>{" "}
            on Configuration DNS, Creating Raw Document and Wrapping Documents.
          </li>
          <li className="mb-2">
            After wrapping the documents and obtaining a certificate hash (merkle root), the documents are ready to be
            issued on the document store smart contract. Enter the merkle root into the text input.
          </li>
          <li className="mb-2">Select the Issue button</li>
          <li className="mb-2">
            There will be a prompt from Metamask chrome extension that display transaction details.
          </li>
          <li className="mb-2">Select Confirm button on the prompt to confirm the transaction.</li>
          <li className="mb-2">The log status should display transaction is being processed.</li>
          <li className="mb-2">
            The dialog status log will show completed message with the transaction details upon completion.
          </li>
          <li className="mb-2">
            You have successfully issued your document merkle root into blockchain. You can now verify the document
            using OpenCerts verifier.
          </li>
        </ol>
        <p className="mt-5">
          For more information on issuing documents, Please visit OpenAttestation{" "}
          <a
            href="https://www.openattestation.com/docs/verifiable-document/issuing-document"
            className="text-blue-900 underline"
          >
            Issue Documentation
          </a>
        </p>
      </div>
    </>
  );
};
