import { DocumentStoreFactory } from "@govtechsg/document-store";
import { Dispatch } from "react";
import { getSigner } from "./wallet";

export const deployDocumentStore = async (
  storeName: string,
  log?: Dispatch<string>
): Promise<{ contractAddress: string } | undefined> => {
  try {
    log ? log("Decrypting wallet.") : null;
    const signer = await getSigner();
    log ? log("Wallet successfully decrypted.") : null;
    const factory = new DocumentStoreFactory(signer);
    log
      ? log(
          `Deploying document store "${storeName}". It may take awhile, You can stay on the page or leave until it's successfully deployed.`
        )
      : null;
    const transaction = await factory.deploy(storeName);
    return transaction.deployTransaction.wait();
  } catch (e) {
    log ? log(e.message) : null;
  }
};
