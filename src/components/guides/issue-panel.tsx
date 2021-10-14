import React, { FunctionComponent, useContext } from "react";
import { ShepherdOptionsWithType, ShepherdTour, ShepherdTourContext, Tour } from "react-shepherd";
import { InformationButton } from "../common/button";

const Button = () => {
  const tour = useContext(ShepherdTourContext);
  return tour && <InformationButton onClick={tour.start} />;
};

export const IssueInformationPanel: FunctionComponent = () => {
  const guideSteps: Array<ShepherdOptionsWithType> = [introduction, stepOne, stepTwo, stepThree, stepComplete];
  const tourOptions: Tour.TourOptions = {
    defaultStepOptions: {
      cancelIcon: {
        enabled: true,
      },
      scrollTo: {
        behavior: "smooth",
        block: "center",
      },
      popperOptions: {
        modifiers: [{ name: "offset", options: { offset: [0, 12] } }],
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

const introduction = {
  title: "Guide to Issue Certificate Hash",
  text: `
      <p> After wrapping the documents and obtaining a certificate hash (merkle root), the documents are ready to be issued on the document store smart contract. </p>
      <p> In this guide, we will show you step by step instructions to issue the certificates or the certificate hash.</p>
  `,
  buttons: [
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-secondary-default hover:bg-secondary-hover",
      text: "Exit",
      type: "cancel",
    },
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-primary-default hover:bg-primary-hover",
      text: "Start",
      type: "next",
    },
  ],
};

const stepOne = {
  title: "Guide to Issue Certificate Hash ( Step 1 )",
  text: `
      <p>Enter the certificate hash (merkle root) into the field, note that this issuance only needs to be done once for all documents in a batch. </p>
      <p>Proceed to the next step.</p>
  `,
  attachTo: { element: ".shepard-issue-txt", on: "right" },
  buttons: [
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-secondary-default hover:bg-secondary-hover",
      text: "Back",
      type: "back",
    },
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-primary-default hover:bg-primary-hover",
      text: "Next",
      type: "next",
    },
  ],
};

const stepTwo = {
  title: "Guide to Issue Certificate Hash ( Step 2 )",
  text: `
      <p>Click on the "Issue" button to start the process.</p>
  `,
  attachTo: { element: ".shepard-issue-btn", on: "left" },
  buttons: [
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-secondary-default hover:bg-secondary-hover",
      text: "Back",
      type: "back",
    },
  ],
  advanceOn: { selector: ".shepard-issue-btn", event: "click" },
};

const stepThree = {
  title: "Guide to Issue Certificate Hash ( Step 3 )",
  text: `
      <p>Metamask extension will display a notification that shows the transaction information.</p>
      <p>Click on the "Confirm" button and the status log will show the transaction progress.</p>
  `,
  attachedTo: { element: ".shepherd-issue-log", on: "top" },
  buttons: [
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-secondary-default hover:bg-secondary-hover",
      text: "Back",
      type: "back",
    },
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-primary-default hover:bg-primary-hover",
      text: "Next",
      type: "next",
    },
  ],
};

const stepComplete = {
  title: "Guide to Issue Certificate Hash ( Complete )",
  text: `
      <p>You have successfully issued your document</p>
      <p>For more information on issuing documents, Please visit   
        <a href="https://www.openattestation.com/docs/verifiable-document/issuing-document" class="text-blue-900 underline" target="_blank"> 
          OpenAttestation Documentation.
        </a>
      </p>
  `,
  buttons: [
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-secondary-default hover:bg-secondary-hover ",
      text: "Back",
      type: "back",
    },
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-primary-default hover:bg-primary-hover ",
      text: "Done",
      type: "cancel",
    },
  ],
};
