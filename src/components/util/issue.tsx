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
    const documentStore = await connect(documentStoreAddress, await getSigner());
    const transaction = await documentStore.issue(certificateHash);
    log ? log(`Waiting for transaction ${transaction.hash} to be processed.`) : null;
    return transaction.wait();
  } catch (e) {
    log ? log(e.message) : null;
  }
};
