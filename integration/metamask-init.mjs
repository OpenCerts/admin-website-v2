import puppeteer from "puppeteer";
import dappeteer from "@chainsafe/dappeteer";

export const metamaskInit = async () => {
  try {
    const browser = await dappeteer.launch(puppeteer, {
      args: ["--no-sandbox"],
      executablePath: process.env.PUPPETEER_EXEC_PATH,
      headless: false, // must be false, so can test with metamask extension
      defaultViewport: null,
      slowMo: process.argv[2] || 0,
    });
    const metamask = await dappeteer.getMetamask(browser, {
      seed: "indicate swing place chair flight used hammer soon photo region volume shuffle",
    });
    await metamask.switchNetwork("localhost");

    console.info("✅ Metamask account init success");
    return { metamask, browser };
  } catch (e) {
    console.info("❌ Metamask account init fail");
    console.error(e);
    process.exit(1);
  }
};
