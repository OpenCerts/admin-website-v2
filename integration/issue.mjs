import expect from "expect-puppeteer";

export const issue = async (metamask, browser) => {
  try {
    const page = await browser.newPage();
    await page.goto("http://localhost:5000/");

    // START - approve application once, subsequent tests no longer need
    await metamask.approve({ allAccounts: true });
    await page.bringToFront();
    // END - approve application once, subsequent tests no longer need

    await page.waitForSelector("[aria-controls='react-autowhatever-document-store']", {
      visible: true,
    });
    await page.focus("[aria-controls='react-autowhatever-document-store']");
    await page.keyboard.type("0xC84b0719A82626417c40f3168513dFABDB6A9079");

    // Test user successfully issue the transaction
    await page.waitForSelector("[data-testid='issue-certificate']", {
      visible: true,
    });
    await page.focus("[data-testid='issue-certificate']");
    await page.keyboard.type("0xbabf7285760d279e6dfa9c37d97bd3f77025a0be0e74119ff24ac9ee0739c60b");

    await page.waitForSelector("[data-testid='issue-certificate-btn']", {
      visible: true,
    });
    await page.click("[data-testid='issue-certificate-btn']");

    await page.waitFor(1500);
    await metamask.confirmTransaction();
    await page.bringToFront();
    await page.waitFor(3000);

    await expect(page).toMatchElement("[data-testid='success-message']", {
      text: "Document/Document Batch with hash 0xbabf7285760d279e6dfa9c37d97bd3f77025a0be0e74119ff24ac9ee0739c60b has been issued to 0xC84b0719A82626417c40f3168513dFABDB6A9079",
      visible: true,
    });

    await page.close();
    console.info("✅  Issue success");
  } catch (e) {
    console.info("❌  Issue Failure");
    console.error(e);
    process.exit(1);
  }
};
