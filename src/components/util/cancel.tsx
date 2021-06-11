import { getSigner, getWalletDetails } from "./wallet";
import { Dispatch } from "react";
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
      log ? log(`Retrieving Transaction Data`) : null;
      const defaultProvider = ethers.getDefaultProvider(wallet.network);
      const { gasPrice, nonce } = await defaultProvider.getTransaction(transactionHash);
      log ? log(`Transaction Data Retrieved`) : null;
      return {
        transactionHash: transactionHash,
        nonce: nonce,
        gasPrice: gasPrice,
      };
    } else {
      log ? log("Error in retrieving wallet network") : null;
    }
  } catch (e) {
    log ? log(e.message) : null;
  }

  return undefined;
};

export const cancelPendingTransaction = async (
  nonce: number,
  gasPrice: BigNumber,
  log?: Dispatch<string>
): Promise<void> => {
  try {
    const wallet = await getWalletDetails();
    const signer = await getSigner();
    const newGasPrice = gasPrice.eq(0) ? gasPrice.add(1) : gasPrice.mul(1.5);
    console.log(newGasPrice);
    if (wallet) {
      await signer.sendTransaction({
        to: wallet.address,
        from: wallet.address,
        nonce: nonce,
        gasPrice: newGasPrice.mul(1000000000),
      });
      log ? log(`Transaction has been successfully cancelled`) : null;
    }
  } catch (e) {
    log ? log(e.message) : null;
  }
};
