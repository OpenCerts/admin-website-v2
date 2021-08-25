import { providers } from "ethers";

interface Ethereum extends providers.ExternalProvider, providers.BaseProvider {
  request: (request: { method: string; params?: Array<any> }) => Promise<any>;
}

declare global {
  interface Window {
    ethereum: Ethereum;
  }
}
