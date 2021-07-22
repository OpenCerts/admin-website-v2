import { connectWallet } from "./wallet";

export const getEtherscanAddress = ({ network }: { network: string }): string =>
  `https://${network.toLowerCase() === "homestead" ? "" : `${network}.`}etherscan.io`;

export const isValidHash = (input: string): boolean => /^0x[a-fA-F0-9]{64}$/.test(input);

export const isValidContract = async (hash: string): Promise<boolean> => {
  const provider = await connectWallet();
  const contractCode = await provider.getCode(hash);
  if (contractCode !== "0x") {
    return true;
  }
  return false;
};

export interface TransactionData {
  txnHash: string;
  nonce: string;
  gasLimit: string;
  to: string;
}
