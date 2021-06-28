import expect from "expect-puppeteer";

export const revoke = async (metamask, browser) => {
  try {
    const page = await browser.newPage();
    await page.goto("http://localhost:5000/");

    await page.waitForSelector("[data-testid='document-store']", {
      visible: true,
    });
    await page.focus("[data-testid='document-store']");
    await page.keyboard.type("0xC84b0719A82626417c40f3168513dFABDB6A9079");

    await page.waitForSelector("[data-testid='show-revoke-btn']", {
      visible: true,
    });
    await page.click("[data-testid='show-revoke-btn']");

    await page.waitForSelector("[data-testid='revoke-certificate']", {
      visible: true,
    });
    await page.focus("[data-testid='revoke-certificate']");
    await page.keyboard.type("0xbabf7285760d279e6dfa9c37d97bd3f77025a0be0e74119ff24ac9ee0739c60b");

    await page.waitForSelector("[data-testid='revoke-btn']", {
      visible: true,
    });
    await page.click("[data-testid='revoke-btn']");

    await page.waitForSelector("[data-testid='confirm-revoke-btn']", {
      visible: true,
    });
    await page.click("[data-testid='confirm-revoke-btn']");
    await page.waitFor(1500);
    await metamask.confirmTransaction();
    await page.bringToFront();
    await page.waitFor(1500);

    await expect(page).toMatchElement("[data-testid='success-message']", {
      text: "Document/Document Batch with hash 0xbabf7285760d279e6dfa9c37d97bd3f77025a0be0e74119ff24ac9ee0739c60b has been revoked on 0xC84b0719A82626417c40f3168513dFABDB6A9079",
      visible: true,
    });

    await page.close();
    console.info("✅  Revoke success");
  } catch (e) {
    console.info("❌  Revoke Failure");
    console.error(e);
    process.exit(1);
  }
};
