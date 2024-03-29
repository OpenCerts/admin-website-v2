import dappeteer from "@chainsafe/dappeteer";
import { addNetwork } from "./addNetwork.mjs";
import { sleep } from "./utils.mjs";

export const metamaskInit = async () => {
  try {
    const browser = await dappeteer.launch({
      metaMaskVersion: "v10.31.0",
      automation: "puppeteer",
      headless: false,
      puppeteerOptions: {
        args: ["--no-sandbox"],
        executablePath: process.env.PUPPETEER_EXEC_PATH,
        defaultViewport: null,
        slowMo: process.argv[2] || 0,
      },
    });

    await sleep(2000);
    const pages = await browser.pages();
    for (const page of pages) {
      if (page.url().startsWith("chrome-extension")) {
        await page.reload();
      }
    }

    // Get metamask
    const metamask = await dappeteer.setupMetaMask(browser, {
      seed: "indicate swing place chair flight used hammer soon photo region volume shuffle",
      showTestNets: true,
    });

    // Add network
    // https://github.com/ChainSafe/dappeteer/blob/b79ab4c74fab87747933d8f428624dcbffc3dd19/test/basic.spec.ts#L117-L119
    const dappPage = await browser.newPage();
    await dappPage.goto("https://github.com", { waitUntil: "networkidle" });
    dappPage.evaluate(addNetwork);

    try {
      await metamask.acceptAddNetwork(true);
    } catch (e) {
      // ignore error
    }

    console.info("✅ Metamask account init success");
    return { metamask, browser };
  } catch (e) {
    console.info("❌ Metamask account init fail");
    console.error(e);
    process.exit(1);
  }
};
