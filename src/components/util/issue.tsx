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
    const documentStore = await connect(
      documentStoreAddress,
      await getSigner()
    );
    log ? log(`Sending transaction to pool`) : null;
    const transaction = await documentStore.issue(certificateHash);
    log ? log(`Waiting for transaction ${certificateHash} to be mined`) : null;
    return transaction.wait();
  } catch (e) {
    log ? log(e.message) : null;
  }
};
