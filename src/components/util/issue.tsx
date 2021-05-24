import { connect } from "@govtechsg/document-store";
import { getSigner } from "./wallet";
import { TransactionReceipt } from "@ethersproject/providers";

export const issueCertificateHash = async (
  documentStoreAddress: string,
  certificateHash: string,
  setIssueLogs?: Function
): Promise<TransactionReceipt | undefined> => {
  try {
    const documentStore = await connect(
      documentStoreAddress,
      await getSigner()
    );
    setIssueLogs ? setIssueLogs(`Sending transaction to pool`) : null;
    const transaction = await documentStore.issue(certificateHash);
    setIssueLogs
      ? setIssueLogs(`Waiting for transaction ${certificateHash} to be mined`)
      : null;
    return transaction.wait();
  } catch (e) {
    setIssueLogs ? setIssueLogs(e.message) : null;
  }
};
