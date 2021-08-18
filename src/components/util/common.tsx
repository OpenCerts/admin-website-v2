import { connectWallet, getWalletNetwork } from "./wallet";

export const getEtherscanAddress = ({ network }: { network: string }): string =>
  `https://${network.toLowerCase() === "homestead" ? "" : `${network}.`}etherscan.io`;

export const isValidHash = (input: string): boolean => /^0x[a-fA-F0-9]{64}$/.test(input);

export const isValidContract = async (hash: string): Promise<boolean> => {
  const provider = await connectWallet();
  const contractCode = await provider.getCode(hash);

  if ((await getWalletNetwork()).toLowerCase() === "unknown") {
    return true;
  } else if (contractCode === "0x") {
    return false;
  }
  return true;
};

export interface TransactionData {
  txnHash: string;
  nonce: string;
  gasLimit: string;
  to: string;
}
