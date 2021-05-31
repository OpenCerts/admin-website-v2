import "@testing-library/jest-dom";
import { isValidCertificateHash, getEtherscanAddress } from "./util";

describe("getEtherscanAddress", () => {
  it("return etherscan when wallet is mainnet chain", () => {
    const input = { network: "Homestead" };
    expect(getEtherscanAddress(input)).toBe("https://etherscan.io");
  });

  it("return ropsten.etherscan when wallet is in ropsten chain", () => {
    const input = { network: "ropsten" };
    expect(getEtherscanAddress(input)).toBe("https://ropsten.etherscan.io");
  });
});

describe("isValidCertificateHash validator", () => {
  it("should return true for address with correct checksum", () => {
    expect(isValidCertificateHash("0x6b51db6c4e199530bfc720c4302c91c8ee899aec5a1affd0233605a4a335d27d")).toBe(true);
  });

  it("should return false for address with wrong length", () => {
    expect(isValidCertificateHash("0x6b51db6c4e199530bfc720c4302c91c8ee899aec5a1affd0233605a4a335d27")).toBe(false);
  });

  it("should return false for addresses without 0x", () => {
    expect(isValidCertificateHash("6b51db6c4e199530bfc720c4302c91c8ee899aec5a1affd0233605a4a335d27d")).toBe(false);
  });

  it("should return false for non-addresses", () => {
    expect(isValidCertificateHash("00")).toBe(false);
    expect(isValidCertificateHash("eaf9503a6555f6cfbf2feb83a6c51a38b641ff")).toBe(false);
  });
});
