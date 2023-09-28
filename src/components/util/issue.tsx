import { TransactionReceipt } from "@ethersproject/providers";
import { connect } from "@govtechsg/document-store";
import { Dispatch } from "react";
import { getSigner } from "./wallet";

export const issueCertificateHash = async (
  documentStoreAddress: string,
  certificateHash: string,
  log?: Dispatch<string>
): Promise<TransactionReceipt | undefined> => {
  try {
    log ? log("Decrypting wallet.") : null;
    const signer = await getSigner();
    log ? log("Wallet successfully decrypted.") : null;
    const documentStore = await connect(documentStoreAddress, signer);
    log ? log(`Please confirm transaction at MetaMask extension.`) : null;
    const transaction = await documentStore.issue(certificateHash);
    log ? log(`Waiting for transaction ${transaction.hash} to be processed.`) : null;
    return transaction.wait();
  } catch (e) {
    if (e instanceof Error) {
      log ? log(e.message) : null;
    } else {
      log ? log("Unable to issue certificate") : null;
    }
  }
};
