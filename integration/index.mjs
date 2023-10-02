import { issue } from "./issue.mjs";
import { revoke } from "./revoke.mjs";
import { metamaskInit } from "./metamask-init.mjs";

const issueAndRevoke = async () => {
  const { metamask, browser } = await metamaskInit();

  await issue(metamask, browser);
  await revoke(metamask, browser);

  process.exit(0);
};

issueAndRevoke();
