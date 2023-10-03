import { DocumentStoreFactory } from "@govtechsg/document-store";
import { Dispatch } from "react";
import { getEtherscanAddress } from "./common";
import { getSigner, getWalletNetwork } from "./wallet";

export const deployDocumentStore = async (
  storeName: string,
  log?: Dispatch<string>
): Promise<{ contractAddress: string } | undefined> => {
  try {
    log ? log("Decrypting wallet.") : null;
    const signer = await getSigner();
    const signerAddress = await signer.getAddress();
    log ? log("Wallet successfully decrypted.") : null;
    const factory = new DocumentStoreFactory(signer);
    log ? log(`Please confirm transaction at MetaMask extension.`) : null;
    const transaction = await factory.deploy(storeName, signerAddress);
    const transactioHash = transaction.deployTransaction.hash;
    const etherscanNetwork = getEtherscanAddress({
      network: await getWalletNetwork(),
    });
    log
      ? log(
          `Deploying document store "${storeName}". Waiting for transaction ${transactioHash} to be processed. It may take awhile, <br/><br/> You can stay on the page or close the popup until it's successfully deployed. Find more details at <a href="${etherscanNetwork}/tx/${transactioHash}" target="_blank">${etherscanNetwork}/tx/${transactioHash}</a>. `
        )
      : null;
    return transaction.deployTransaction.wait();
  } catch (e: any) {
    log ? log(e.message) : null;
  }
};
