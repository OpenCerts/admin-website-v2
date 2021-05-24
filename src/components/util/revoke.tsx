import { connect } from "@govtechsg/document-store";
import { getSigner } from "./wallet";
import { TransactionReceipt } from "@ethersproject/providers";

export const revokeCertificateHash = async (
  documentStoreAddress: string,
  certificateHash: string,
  setRevokeLogs?: Function
): Promise<TransactionReceipt | undefined> => {
  try {
    const documentStore = await connect(
      documentStoreAddress,
      await getSigner()
    );
    setRevokeLogs ? setRevokeLogs(`Sending transaction to pool`) : null;
    const transaction = await documentStore.revoke(certificateHash);
    setRevokeLogs
      ? setRevokeLogs(`Waiting for transaction ${certificateHash} to be mined`)
      : null;
    return transaction.wait();
  } catch (e) {
    setRevokeLogs ? setRevokeLogs(e.message) : null;
  }
};
