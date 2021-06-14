import { connect } from "@govtechsg/document-store";
import { getSigner } from "./wallet";
import { TransactionReceipt } from "@ethersproject/providers";
import { Dispatch } from "react";

export const issueCertificateHash = async (
  documentStoreAddress: string,
  certificateHash: string,
  log?: Dispatch<string>
): Promise<TransactionReceipt | undefined> => {
  try {
    const documentStore = await connect(documentStoreAddress, await getSigner());
    const transaction = await documentStore.issue(certificateHash);
    console.log(transaction);
    log ? log(`Waiting for transaction ${transaction.hash} to be processed.`) : null;
    return transaction.wait();
  } catch (e) {
    log ? log(e.message) : null;
  }
};
