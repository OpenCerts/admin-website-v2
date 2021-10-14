import React, { FunctionComponent, useContext } from "react";
import { ShepherdOptionsWithType, ShepherdTour, ShepherdTourContext, Tour } from "react-shepherd";
import { InformationButton } from "../common/button";

function Button() {
  const tour = useContext(ShepherdTourContext);
  return tour && <InformationButton onClick={tour.start} />;
}

export const DeployInformationPanel: FunctionComponent = () => {
  const guideSteps: Array<ShepherdOptionsWithType> = [
    introduction,
    stepOne,
    stepTwo,
    stepThree,
    stepFour,
    stepComplete,
  ];

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
  title: "Guide to Deploy Document Store",
  text: `
      <p>The document store is a smart contract on the Ethereum network that records the issuance and revocation status of OA documents.</p>
      <p>In this guide, we will show you step by step instructions to deploy a new document store smart contract on the Ethereum.</p>
  `,
  buttons: [
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-secondary-default hover:bg-secondary-hover ",
      text: "Exit",
      type: "cancel",
    },
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-primary-default hover:bg-primary-hover ",
      text: "Start",
      type: "next",
    },
  ],
};

const stepOne: ShepherdOptionsWithType = {
  title: "Guide to Deploy Document Store ( Step 1 )",
  text: '<p>Click on the "Deploy New Document Store", This will open up pop-up.</p>',
  attachTo: { element: ".shepherd-deploy-modal-btn", on: "left" },
  buttons: [
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-secondary-default hover:bg-secondary-hover ",
      text: "Back",
      type: "back",
    },
  ],
  advanceOn: { selector: ".shepherd-deploy-modal-btn", event: "click" },
};

const stepTwo: ShepherdOptionsWithType = {
  title: "Guide to Deploy Document Store ( Step 2 )",
  text: `
      <p>Enter your organisation name into the field.</p>
      <p>Proceed to the next step.</p>
      `,
  attachTo: { element: ".shepherd-organisation-txt", on: "right" },
  buttons: [
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-primary-default hover:bg-primary-hover ",
      text: "Next",
      action() {
        const txtShepherdOrganisation = document.querySelector(".shepherd-organisation-txt");
        if (txtShepherdOrganisation instanceof HTMLInputElement) {
          if (txtShepherdOrganisation.value.length > 0) {
            return this.next();
          } else {
            const errorText = `
                <p>Enter your organisation name into the field.</p>
                <p>Proceed to the next step.</p>
                <p class="text-red-600">Please enter your organisation name*</p>
            `;
            const currentStep = this.getCurrentStep();
            currentStep ? currentStep.updateStepOptions({ text: errorText }) : null;
          }
        }
      },
    },
  ],
};

const stepThree: ShepherdOptionsWithType = {
  title: "Guide to Deploy Document Store ( Step 3 )",
  text: '<p>Click on the "Deploy" button to start the process.</p>',
  attachTo: { element: ".shepherd-deploy-btn", on: "left" },
  buttons: [
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-secondary-default hover:bg-secondary-hover ",
      text: "Back",
      type: "back",
    },
  ],
  advanceOn: { selector: ".shepherd-deploy-btn", event: "click" },
};

const stepFour: ShepherdOptionsWithType = {
  title: "Guide to Deploy Document Store ( Step 4 )",
  text: `
      <p>Metamask extension will display a notification that shows the transaction information.</p>
      <p>Click on the "Confirm" button and the status log will show the transaction progress.</p>
  `,
  attachTo: { element: ".shepherd-deploy-log", on: "top" },
  buttons: [
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-secondary-default hover:bg-secondary-hover ",
      text: "Back",
      type: "back",
    },
    {
      classes: "w-full inline-flex justify-center text-sm font-medium bg-primary-default hover:bg-primary-hover ",
      text: "Next",
      type: "next",
    },
  ],
};

const stepComplete: ShepherdOptionsWithType = {
  title: "Guide to Deploy Document Store ( Complete )",
  text: `
      <p>You have successfully created your document store, the new document store address will be auto populated.</p>
      <p>You can begin to issue or revoke documents using the new document store.</p> 
      <p>For more information on document store, Please visit 
          <a href="https://www.openattestation.com/docs/verifiable-document/document-store" class="text-blue-900 underline" target="_blank">
            OpenAttestation Document
          </a>
      </p>`,
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
