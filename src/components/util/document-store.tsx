import { getWalletDetails } from "./wallet";

export const storeDocumentStoreInLocalStorage = async (documentStoreAddress: string): Promise<void> => {
  const walletDetails = await getWalletDetails();
  if (walletDetails) {
    const localStorageIdentifier = `${walletDetails.network.toLowerCase()}-${walletDetails.address.toLowerCase()}`;
    const storedInformation = localStorage.getItem(localStorageIdentifier);
    const documentStoreArray = storedInformation?.split(",") ?? [];
    documentStoreArray.push(documentStoreAddress);
    localStorage.setItem(localStorageIdentifier, documentStoreArray.join(","));
  }
};

export const retrieveDocumentStoreInLocalStorage = async (): Promise<Array<string>> => {
  const walletDetails = await getWalletDetails();
  if (walletDetails) {
    const localStorageIdentifier = `${walletDetails.network.toLowerCase()}-${walletDetails.address.toLowerCase()}`;
    const storedInformation = localStorage.getItem(localStorageIdentifier);
    return storedInformation?.split(",") ?? [];
  }
  return [];
};
