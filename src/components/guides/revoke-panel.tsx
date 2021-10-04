import React, { FunctionComponent } from "react";

export const RevokeInformationPanel: FunctionComponent = () => {
  return (
    <>
      <hr className="max-w-screen-lg w-full px-4 mt-10 mx-auto" />
      <div className={`max-w-screen-lg w-full text-left px-4 my-10 mx-auto`}>
        <h3 className="">Guide to Revoke Certificate Hash</h3>
        <ol className="mt-4 ml-5 list-outside list-decimal">
          <li className="mb-2">
            Revoking document require targetHash. targetHash can be found in the field of one of the previously wrapped
            documents (open one of the file, head to the bottom and check for the targetHash in the signature object.
          </li>
          <li className="mb-2">Enter the targetHash into the text input.</li>
          <li className="mb-2">Select the Revoke button</li>
          <li className="mb-2">
            There will be a prompt from Metamask chrome extension that display transaction details.
          </li>
          <li className="mb-2">Select Confirm button on the prompt to confirm the transaction.</li>
          <li className="mb-2">The log status should display transaction is being processed.</li>
          <li className="mb-2">
            The dialog status log will show completed message with the transaction details upon completion.
          </li>
          <li className="mb-2">
            You have successfully revoke your document merkle root. You can now verify the document using OpenCerts
            verifier and check if there is an error displayed by the portal.
          </li>
        </ol>
        <p className="mt-5">
          For more information on revoking documents, Please visit OpenAttestation{" "}
          <a
            href="https://www.openattestation.com/docs/verifiable-document/revoking-document"
            className="text-blue-900 underline"
          >
            Revoke Documentation
          </a>
        </p>
      </div>
    </>
  );
};
