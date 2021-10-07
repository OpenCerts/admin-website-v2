import React, { FunctionComponent, useContext } from "react";
import { ShepherdOptionsWithType, ShepherdTour, ShepherdTourContext, Tour } from "react-shepherd";
import { InformationButton } from "../common/button";

const Button = () => {
  const tour = useContext(ShepherdTourContext);
  return tour && <InformationButton onClick={tour.start} />;
};

export const RevokeInformationPanel: FunctionComponent = () => {
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
  title: "Guide to Revoke Certificate Hash",
  text: `
      <p> After issuing a document, you might want to revoke it for any reason: </p>
      <ul class="list-disc pl-5"> 
          <li>the information provided by the recipient was wrong.</li>
          <li>the information in the document are outdated.</li>
          <li>there is a problem in the document.</li>
          <li>etc.</li>
      </ul>
      <br/>
      <p>In this guide, we will show you step by step instructions to revoke the issued document.</p>
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
  title: "Guide to Revoke Certificate Hash ( Step 1 )",
  text: `
      <p>Revoking document require the document targetHash. The targetHash can be found in the field of one of the previously wrapped documents (open one of the document, check for the targetHash under signature).</p>
      <p>Enter the targetHash into the field and proceed to next step.</p>
  `,
  attachTo: { element: ".shepard-revoke-txt", on: "left" },
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
  title: "Guide to Revoke Certificate Hash ( Step 2 )",
  text: `
      <p>Click on the "Revoke" button to start the process.</p>
  `,
  attachTo: { element: ".shepard-revoke-btn", on: "left" },
  buttons: [
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-secondary-default hover:bg-secondary-hover",
      text: "Back",
      type: "back",
    },
  ],
  advanceOn: { selector: ".shepard-revoke-btn", event: "click" },
};

const stepThree = {
  title: "Guide to Revoke Certificate Hash ( Step 3 )",
  text: `
      <p>Metamask extension will display a notification that shows the transaction information.</p>
      <p>Click on the "Confirm" button and the status log will show the transaction progress.</p>
  `,
  attachedTo: { element: ".shepherd-revoke-log", on: "top" },
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
  title: "Guide to Revoke Certificate Hash ( Complete )",
  text: `
      <p>You have successfully revoked your document</p>
      <p>For more information on revoking documents, Please visit   
        <a href="https://www.openattestation.com/docs/verifiable-document/revoking-document" class="text-blue-900 underline" target="_blank"> 
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
