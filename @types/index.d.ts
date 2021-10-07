import { providers } from "ethers";

type Ethereum = providers.ExternalProvider & providers.BaseProvider;

declare global {
  interface Window {
    ethereum: Ethereum;
  }
}
