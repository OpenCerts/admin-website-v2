export const getEtherscanAddress = ({ network }: { network: string }): string =>
  `https://${network === "Homestead" ? "" : `${network}.`}etherscan.io`;

export const isValidHash = (input: string): boolean => /^0x[a-fA-F0-9]{64}$/.test(input);

export interface TransactionData {
  txnHash: string;
  nonce: string;
  gasLimit: string;
  to: string;
}
