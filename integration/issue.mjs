import { expect } from "chai";
import { sleep, waitForAndClickElement, waitForElement } from "./utils.mjs";

export const issue = async (metamask, browser) => {
  try {
    const page = await browser.newPage();
    await page.goto("http://localhost:4173/", { waitUntil: "networkidle" });

    // START - approve application once, subsequent tests no longer need
    await metamask.approve();
    await page.bringToFront();
    // END - approve application once, subsequent tests no longer need
    await waitForAndClickElement(page, "[data-testid='connectToWallet']");

    await waitForAndClickElement(page, ".react-autosuggest__input");
    await page.type(".react-autosuggest__input", "0xC84b0719A82626417c40f3168513dFABDB6A9079");

    // Test user successfully issue the transaction
    await waitForElement(page, "[data-testid='issue-certificate']");
    await page.type(
      "[data-testid='issue-certificate']",
      "0xbabf7285760d279e6dfa9c37d97bd3f77025a0be0e74119ff24ac9ee0739c60b"
    );

    await waitForAndClickElement(page, "[data-testid='issue-certificate-btn']");

    await sleep(1500);
    await metamask.confirmTransaction();
    await page.bringToFront();
    await sleep(3000);

    await waitForElement(page, "[data-testid='issue-log']");
    const issueLog = await page.evaluate(() => {
      const el = document.querySelector("[data-testid='issue-log']");
      return el.textContent;
    });

    await expect(issueLog).to.have.string(
      "Document/Document Batch with hash 0xbabf7285760d279e6dfa9c37d97bd3f77025a0be0e74119ff24ac9ee0739c60b has been issued to 0xC84b0719A82626417c40f3168513dFABDB6A9079."
    );

    await page.close();
    console.info("✅  Issue success");
  } catch (e) {
    console.info("❌  Issue Failure");
    console.error(e);
    process.exit(1);
  }
};
