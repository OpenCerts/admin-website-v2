import { isValidHash, getEtherscanAddress } from "./common";

describe("getEtherscanAddress", () => {
  test("return etherscan when wallet is mainnet chain", () => {
    const input = { network: "Homestead" };
    expect(getEtherscanAddress(input)).toBe("https://etherscan.io");
  });

  test("return sepolia.etherscan when wallet is in sepolia chain", () => {
    const input = { network: "sepolia" };
    expect(getEtherscanAddress(input)).toBe("https://sepolia.etherscan.io");
  });
});

describe("isValidHash validator", () => {
  test("should return true for address with correct checksum", () => {
    expect(isValidHash("0x6b51db6c4e199530bfc720c4302c91c8ee899aec5a1affd0233605a4a335d27d")).toBe(true);
  });

  test("should return false for address with wrong length", () => {
    expect(isValidHash("0x6b51db6c4e199530bfc720c4302c91c8ee899aec5a1affd0233605a4a335d27")).toBe(false);
  });

  test("should return false for addresses without 0x", () => {
    expect(isValidHash("6b51db6c4e199530bfc720c4302c91c8ee899aec5a1affd0233605a4a335d27d")).toBe(false);
  });

  test("should return false for non-addresses", () => {
    expect(isValidHash("00")).toBe(false);
    expect(isValidHash("eaf9503a6555f6cfbf2feb83a6c51a38b641ff")).toBe(false);
  });
});
