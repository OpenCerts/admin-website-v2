import { expect } from "chai";
import { sleep, waitForAndClickElement, waitForElement } from "./utils.mjs";

export const revoke = async (metamask, browser) => {
  try {
    const page = await browser.newPage();
    await page.goto("http://localhost:5173/");

    await waitForAndClickElement(page, "[data-testid='connectToWallet']");

    await waitForAndClickElement(page, ".react-autosuggest__input");
    await page.type(".react-autosuggest__input", "0xC84b0719A82626417c40f3168513dFABDB6A9079");

    await waitForAndClickElement(page, "[data-testid='show-revoke-btn']");

    await waitForElement(page, "[data-testid='revoke-certificate']");
    await page.type(
      "[data-testid='revoke-certificate']",
      "0xbabf7285760d279e6dfa9c37d97bd3f77025a0be0e74119ff24ac9ee0739c60b"
    );

    await waitForElement(page, "[data-testid='revoke-btn']");

    await waitForAndClickElement(page, "[data-testid='revoke-btn']");

    await waitForAndClickElement(page, "[data-testid='confirm-revoke-btn']");

    await sleep(1500);
    await metamask.confirmTransaction();
    await page.bringToFront();
    await sleep(3000);

    await waitForElement(page, "[data-testid='revoke-log']");

    const revokeLog = await page.evaluate(() => {
      const el = document.querySelector("[data-testid='revoke-log']");
      return el.textContent;
    });

    await expect(revokeLog).to.have.string(
      "Document/Document Batch with hash 0xbabf7285760d279e6dfa9c37d97bd3f77025a0be0e74119ff24ac9ee0739c60b has been revoked on 0xC84b0719A82626417c40f3168513dFABDB6A9079"
    );

    await page.close();
    console.info("✅  Revoke success");
  } catch (e) {
    console.info("❌  Revoke Failure");
    console.error(e);
    process.exit(1);
  }
};
