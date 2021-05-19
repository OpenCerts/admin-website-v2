import { deploy, deployAndWait } from "@govtechsg/document-store";
import signale from "signale";
import { DocumentStoreFactory } from "@govtechsg/document-store";
import { FunctionComponent } from "react";
import { getSigner } from "./wallet";

export const deployDocumentStore = async (
  storeName: string
): Promise<{ contractAddress: string }>  => {
  signale.await(`Connecting to Metamask`);
  const signer = await getSigner();
  const factory = new DocumentStoreFactory(signer);
  signale.await(`Sending transaction to pool`);
  const transaction = await factory.deploy(storeName);
  signale.await(`Waiting for transaction ${transaction.deployTransaction.hash} to be mined`);
  return transaction.deployTransaction.wait();
};
