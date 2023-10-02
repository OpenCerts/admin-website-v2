import { issue } from "./issue.mjs";
import { revoke } from "./revoke.mjs";
import { metamaskInit } from "./metamask-init.mjs";

const issueAndRevoke = async () => {
  const { metamask, browser } = await metamaskInit();

  try {
    await issue(metamask, browser);
    await revoke(metamask, browser);
  } catch (e) {
    console.error(e);
  } finally {
    browser.close();
    process.exit(0);
  }
};

issueAndRevoke();
