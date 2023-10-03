export const addNetwork = async () => {
  const addNetworkRequest = window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x539",
        chainName: "Localhost 8545",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["http://localhost:8545"],
      },
    ],
  });

  return new Promise((resolve) => {
    addNetworkRequest
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
};
