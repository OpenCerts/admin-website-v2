declare let window: any;
import { ethers } from "ethers";

export interface WalletDetails {
  address: string;
  balance: string;
  network: string;
}

export const connectWallet = async () => {
  await window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider;
};

export const getSigner = async () => {
    const provider = await connectWallet();
    const signer = provider.getSigner();
    return signer;
  };

export const getWalletDetails = async (): Promise<WalletDetails> => {
  const signer = await getSigner();
  
  const wallet: WalletDetails = {
    address: await signer.getAddress(),
    balance: ethers.utils.formatEther(await signer.getBalance()),
    network: (await signer.provider.getNetwork()).name,
  };
  return wallet;
};

