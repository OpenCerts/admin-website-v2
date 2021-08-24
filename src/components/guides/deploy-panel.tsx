import React, { FunctionComponent } from "react";

export const DeployPanel: FunctionComponent = () => {
  return (
    <>
      <hr className="max-w-screen-lg w-full px-4 mt-10 mx-auto" />
      <div className={`max-w-screen-lg w-full text-left px-4 my-10 mx-auto`}>
        <h3 className="">Guides to Deploy Document Store</h3>
        <ol className="mt-4 ml-5 list-outside list-decimal">
          <li className="mb-2">Select Deploy New Instance Button, a dialog will appear</li>
          <li className="mb-2">Please enter your organisation name into the text input</li>
          <li className="mb-2">Select the deploy button.</li>
          <li className="mb-2">
            There will be a prompt from Metamask chrome extension that display transaction details.
          </li>
          <li className="mb-2">Select Confirm button on the prompt to confirm the transaction.</li>
          <li className="mb-2">
            The log status should display document store is deploying. You may close the dialog or keep it open till
            document store are deployed.
          </li>
          <li className="mb-2">
            The dialog status log will show completed message with the transaction details upon completion. The document
            store text input should be automatically populate with the new document store address.
          </li>
          <li className="mb-2">
            You have successfully create your document store and can issue or revoke documents using the new document
            store.
          </li>
        </ol>
        <p className="mt-5">
          For more information on document store, Please visit OpenAttestation{" "}
          <a
            href="https://www.openattestation.com/docs/verifiable-document/document-store"
            className="text-blue-900 underline"
          >
            Document Store Documentation
          </a>
        </p>
      </div>
    </>
  );
};
