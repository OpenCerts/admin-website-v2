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
      log ? log(`Transaction Data Retrieved.`) : null;
      return {
        transactionHash: transactionHash,
        nonce: nonce,
        gasPrice: gasPrice,
      };
    } else {
      log ? log("Error in retrieving wallet network.") : null;
    }
  } catch (e) {
    log ? log(e.message) : null;
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
    log ? log(e.message) : null;
  }
};
