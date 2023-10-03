import { Dispatch } from "react";
import { getSigner, getWalletDetails } from "./wallet";
import { ethers, BigNumber } from "ethers";

interface pendingTransactionProps {
  transactionHash: string;
  nonce: number;
  gasPrice: BigNumber;
}

export const getPendingTransaction = async (
  transactionHash: string,
  log?: Dispatch<string>
): Promise<pendingTransactionProps | undefined> => {
  try {
    const wallet = await getWalletDetails();
    if (wallet) {
      log ? log(`Retrieving Transaction Data.`) : null;
      const defaultProvider = ethers.getDefaultProvider(wallet.network);
      const { gasPrice, nonce } = await defaultProvider.getTransaction(transactionHash);
      if (gasPrice && nonce) {
        log ? log(`Transaction Data Retrieved.`) : null;
        return {
          transactionHash: transactionHash,
          nonce: nonce,
          gasPrice: gasPrice,
        };
      }
      log ? log("Error in retrieving transaction.") : null;
    } else {
      log ? log("Error in retrieving wallet network.") : null;
    }
  } catch (e) {
    if (e instanceof Error) {
      log ? log(e.message) : console.error(e.message);
    } else {
      log ? log(`Unable to get transaction ${e}`) : console.error("Unable to get transaction", e);
    }
  }

  return undefined;
};

export const cancelPendingTransaction = async (
  nonce: number,
  newGasPrice: BigNumber,
  log?: Dispatch<string>
): Promise<void> => {
  try {
    const wallet = await getWalletDetails();
    const signer = await getSigner();
    if (wallet) {
      await signer.sendTransaction({
        to: wallet.address,
        from: wallet.address,
        nonce: nonce,
        gasPrice: newGasPrice,
      });
      log ? log(`Transaction has been successfully cancelled.`) : null;
    }
  } catch (e) {
    if (e instanceof Error) {
      log ? log(e.message) : console.error(e.message);
    } else {
      log ? log("Unable to cancel transaction") : console.error("Unable to cancel transaction");
    }
  }
};
