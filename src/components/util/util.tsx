export const getEtherscanAddress = ({ network }: { network: string }): string =>
  `https://${network === "Homestead" ? "" : `${network}.`}etherscan.io`;

export const isValidCertificateHash = (input: string): boolean => /^0x[a-fA-F0-9]{64}$/.test(input);
