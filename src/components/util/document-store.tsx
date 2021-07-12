import { connectWallet, getWalletNetwork } from "./wallet";

export const getDocumentStores = async (): Promise<Array<string>> => {
  try {
    const provider = await connectWallet();
    const logInfo = {
      fromBlock: "earliest",
      toBlock: "latest",
      topics: [
        "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x000000000000000000000000c84b0719a82626417c40f3168513dfabdb6a9079",
      ],
    };
    const getLogs = await provider.getLogs(logInfo);
    if (getLogs.length > 0) {
      return getLogs.map((logInformation) => {
        return logInformation.address.toLowerCase();
      });
    }
    return [];
  } catch (e) {
    console.error(e.message);
    return [];
  }
};

export const isDocumentStore = async (documentStoreAddress: string): Promise<boolean> => {
  const documentStoreArray = await getDocumentStores();
  return (await getWalletNetwork()).toLowerCase() === "unknown"
    ? true
    : documentStoreArray.indexOf(documentStoreAddress) > -1
    ? true
    : false;
};
