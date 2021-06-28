import { issue } from "./issue.mjs";
import { revoke } from "./revoke.mjs";
import { metamaskInit } from "./metamask-init.mjs";

const main = async () => {
  const { metamask, browser } = await metamaskInit();

  await issue(metamask, browser);
  await revoke(metamask, browser);

  await browser.close();
  process.exit(0);
};

main();
