export const waitForAndClickElement = async (page, query) => {
  await waitForElement(page, query);
  const element = await page.$(query);
  await element.click();
};

export const waitForElement = async (page, query) => {
  await page.waitForSelector(query, {
    visible: true,
  });
};

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
