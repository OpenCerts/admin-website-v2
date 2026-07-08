import dappeteer from "@chainsafe/dappeteer";
import { addNetwork } from "./addNetwork.mjs";
import { sleep } from "./utils.mjs";

// dappeteer's setupMetaMask() waits on a browser "targetcreated" event with no timeout
// and no fallback if the extension never opens its home.html tab. Wrap it so a stuck
// extension fails fast with diagnostics instead of hanging until the CI job is killed.
const withDiagnosticTimeout = (promise, rawBrowser, ms) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      dumpDiagnostics(rawBrowser).finally(() => {
        reject(new Error(`Timed out after ${ms}ms waiting for MetaMask setup`));
      });
    }, ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });

const dumpDiagnostics = async (rawBrowser) => {
  try {
    const pages = await rawBrowser.pages();
    console.info(`Open pages at timeout (${pages.length}):`);
    for (const [i, page] of pages.entries()) {
      console.info(`  [${i}] ${page.url()}`);
    }
    const lastPage = pages[pages.length - 1];
    if (lastPage) {
      await lastPage.screenshot({ path: "integration/debug-metamask-timeout.png", fullPage: true });
      console.info("Saved screenshot to integration/debug-metamask-timeout.png");
    }
  } catch (diagError) {
    console.error("Failed to capture MetaMask timeout diagnostics:", diagError);
  }
};

const wireConsoleLogging = (page, label) => {
  page.on("console", (msg) => console.info(`[console ${label}] ${msg.text()}`));
  page.on("pageerror", (err) => console.info(`[pageerror ${label}] ${err}`));
  page.on("requestfailed", (req) => {
    console.info(`[requestfailed ${label}] ${req.url()} ${req.failure()?.errorText ?? ""}`);
  });
};

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
    const rawBrowser = browser.getSource();

    // Surface every target and its console/page errors as soon as they happen, so a
    // failed extension load is visible instead of a silent hang.
    rawBrowser.on("targetcreated", async (target) => {
      console.info(`[target created] type=${target.type()} url=${target.url()}`);
      const page = await target.page().catch(() => null);
      if (page) {
        wireConsoleLogging(page, target.url());
      }
    });
    for (const page of await rawBrowser.pages()) {
      console.info(`[existing target] url=${page.url()}`);
      wireConsoleLogging(page, page.url());
    }

    await sleep(2000);
    const pages = await browser.pages();
    for (const page of pages) {
      if (page.url().startsWith("chrome-extension")) {
        await page.reload();
      }
    }

    // Get metamask
    const metamask = await withDiagnosticTimeout(
      dappeteer.setupMetaMask(browser, {
        seed: "indicate swing place chair flight used hammer soon photo region volume shuffle",
        showTestNets: true,
      }),
      rawBrowser,
      45000
    );

    // Add network
    // https://github.com/ChainSafe/dappeteer/blob/b79ab4c74fab87747933d8f428624dcbffc3dd19/test/basic.spec.ts#L117-L119
    const dappPage = await browser.newPage();
    await dappPage.goto("https://github.com", { waitUntil: "networkidle0" });
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
