import { TransactionReceipt } from "@ethersproject/providers";
import { connect } from "@govtechsg/document-store";
import { Dispatch } from "react";
import { getSigner } from "./wallet";

export const revokeCertificateHash = async (
  documentStoreAddress: string,
  certificateHash: string,
  log?: Dispatch<string>
): Promise<TransactionReceipt | undefined> => {
  try {
    const documentStore = await connect(documentStoreAddress, await getSigner());
    log ? log(`Sending transaction to waiting room (Mempool).`) : null;
    const transaction = await documentStore.revoke(certificateHash);
    log ? log(`Waiting for transaction ${transaction.hash} to be processed.`) : null;
    return transaction.wait();
  } catch (e) {
    log ? log(e.message) : null;
  }
};
