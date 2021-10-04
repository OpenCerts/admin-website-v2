import React, { FunctionComponent, useContext } from "react";
import { ShepherdOptionsWithType, ShepherdTour, ShepherdTourContext } from "react-shepherd";
import { InformationButton } from "../common/button";

function Button() {
  const tour = useContext(ShepherdTourContext);
  return tour && <InformationButton onClick={tour.start} />;
}

export const DeployInformationPanel: FunctionComponent = () => {
  const guideSteps: Array<ShepherdOptionsWithType> = [
    {
      title: "Guide to Deploy Document Store",
      text: "<p>The document store is a smart contract on the Ethereum network that records the issuance and revocation status of OA documents.<br/><br/>In this guide, we will show you step by step instructions to deploy a new document store smart contract on the Ethereum.</p>",
      buttons: [
        {
          classes:
            "w-full inline-flex justify-center text-sm font-medium bg-secondary-default hover:bg-secondary-hover ",
          text: "Exit",
          type: "cancel",
        },
        {
          classes: "w-full inline-flex justify-center text-sm font-medium bg-primary-default hover:bg-primary-hover ",
          text: "Start",
          type: "next",
        },
      ],
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
    },
    {
      title: "Guide to Deploy Document Store ( Step 1 )",
      text: '<p>Click on the "Deploy New Instance" and pop-up dialog will appear.</p>',
      attachTo: { element: ".shepherd-deploy-modal-btn", on: "left" },
      buttons: [
        {
          classes:
            "w-full inline-flex justify-center text-sm font-medium bg-secondary-default hover:bg-secondary-hover ",
          text: "Back",
          type: "back",
        },
      ],
      scrollTo: {
        behavior: "smooth",
        block: "center",
      },
      advanceOn: { selector: ".shepherd-deploy-modal-btn", event: "click" },
    },
    {
      title: "Guide to Deploy Document Store ( Step 2 )",
      text: "<p>Please enter your organisation name into the text-input. Proceed to next step.</p>",
      attachTo: { element: ".shepherd-organisation-txt", on: "left" },
      buttons: [
        {
          classes: "w-full inline-flex justify-center text-sm font-medium bg-primary-default hover:bg-primary-hover ",
          text: "Next",
          type: "next",
        },
      ],
      scrollTo: {
        behavior: "smooth",
        block: "center",
      },
    },
    {
      title: "Guide to Deploy Document Store ( Step 3 )",
      text: '<p>Click on the "Deploy" button to start the creation process.</p>',
      attachTo: { element: ".shepherd-deploy-btn", on: "left" },
      buttons: [
        {
          classes:
            "w-full inline-flex justify-center text-sm font-medium bg-secondary-default hover:bg-secondary-hover ",
          text: "Back",
          type: "back",
        },
      ],
      scrollTo: {
        behavior: "smooth",
        block: "center",
      },
      advanceOn: { selector: ".shepherd-deploy-btn", event: "click" },
    },
    {
      title: "Guide to Deploy Document Store ( Step 4 )",
      text: "<p>There will be popup-dialog from the browser metamask extension. \
              Select Confirm button on the prompt to confirm the transaction. \
              The status log will show the progress of the transaction </p>",
      attachTo: { element: ".shepherd-deploy-log", on: "top" },
      buttons: [
        {
          classes: "w-full inline-flex justify-center text-sm font-medium bg-primary-default hover:bg-primary-hover ",
          text: "Next",
          type: "next",
        },
      ],
      scrollTo: {
        behavior: "smooth",
        block: "center",
      },
    },
    {
      title: "Guide to Deploy Document Store ( Step 5 )",
      text: '<p> You have successfully create your document store and can issue or revoke documents using the new document store.\
      <br/><br/>For more information on document store, Please visit OpenAttestation Document  <a href="https://www.openattestation.com/docs/verifiable-document/document-store" className="text-blue-900 underline"> Document Store Documentation </a></p>',
      buttons: [
        {
          classes: "w-full inline-flex justify-center text-sm font-medium bg-primary-default hover:bg-primary-hover ",
          text: "Done",
          type: "cancel",
        },
      ],
      scrollTo: {
        behavior: "smooth",
        block: "center",
      },
    },
  ];

  const tourOptions = {
    defaultStepOptions: {
      cancelIcon: {
        enabled: true,
      },
    },
    useModalOverlay: true,
  };
  return (
    <ShepherdTour steps={guideSteps} tourOptions={tourOptions}>
      <Button />
    </ShepherdTour>
  );
};
