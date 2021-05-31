import puppeteer from "puppeteer";
import dappeteer from "dappeteer";
import { issue } from "./issue.mjs";
import { revoke } from "./revoke.mjs";

const main = async () => {
  const browser = await dappeteer.launch(puppeteer, {
    executablePath: process.env.PUPPETEER_EXEC_PATH,
    headless: false,
    defaultViewport: null,
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#setting-up-chrome-linux-sandbox
    slowMo: 10,
  });
  const metamask = await dappeteer.getMetamask(browser, {
    seed:"indicate swing place chair flight used hammer soon photo region volume shuffle"
  });
  await metamask.switchNetwork("localhost");
  
  await issue(metamask, browser);
  await revoke(metamask, browser);

  await browser.close();
  process.exit(0);
};

main();
