export const getEtherscanAddress = ({ network }: { network: string }): string =>
  `https://${network === "mainnet" ? "" : `${network}.`}etherscan.io`;

export const isValidCertificateHash = (input: string) =>
  /^0x[a-fA-F0-9]{64}$/.test(input);
