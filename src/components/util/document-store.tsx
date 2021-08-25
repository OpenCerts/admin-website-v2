import { getWalletDetails } from "./wallet";

export const setDocumentStoreInformation = async (documentStoreAddress: string): Promise<void> => {
  const walletDetails = await getWalletDetails();
  if (walletDetails) {
    const storedInformation = localStorage.getItem(`
    ${walletDetails.network}-${walletDetails.address.toLowerCase()}`);

    let documentStoreArray: string[] = [];
    if (storedInformation != null) {
      documentStoreArray = JSON.parse(storedInformation);
    }
    documentStoreArray.push(documentStoreAddress);
    localStorage.setItem(
      `${walletDetails.network}-${walletDetails.address.toLowerCase()}`,
      JSON.stringify(documentStoreArray)
    );
  }
};

export const retrieveDocumentStoreInformation = async (): Promise<Array<string>> => {
  const walletDetails = await getWalletDetails();
  if (walletDetails) {
    const storedInformation = localStorage.getItem(`${walletDetails.network}-${walletDetails.address.toLowerCase()}`);
    return storedInformation ? JSON.parse(storedInformation) : [];
  }
  return [];
};
