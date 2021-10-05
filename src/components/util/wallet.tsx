import { ethers, providers } from "ethers";

export interface WalletDetails {
  address: string;
  balance: string;
  network: string;
}

export const connectWallet = async (): Promise<providers.Web3Provider> => {
  if (window.ethereum.request) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }
  const provider = new providers.Web3Provider(window.ethereum);
  return provider;
};

export const getSigner = async (): Promise<providers.JsonRpcSigner> => {
  const provider = await connectWallet();
  const signer = provider.getSigner();
  return signer;
};

export const getWalletDetails = async (): Promise<WalletDetails | undefined> => {
  if (window.ethereum) {
    const signer = await getSigner();

    const wallet: WalletDetails = {
      address: await signer.getAddress(),
      balance: ethers.utils.formatEther(await signer.getBalance()),
      network: (await signer.provider.getNetwork()).name,
    };
    return wallet;
  } else {
    alert("Please download MetaMask extension in chrome.");
    window.open("https://metamask.io/download", "_blank");
  }
};

export const getWalletNetwork = async (): Promise<string> => {
  const signer = await getSigner();
  return (await signer.provider.getNetwork()).name;
};
