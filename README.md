# Administration Website

Administration Website v2 will be removing ledger flow. For users that continue using the hardware ledger, you could link the hardware ledgers using the Metamask chrome extension plugin and perform the functionality as per normal.

See also:
* [admin-website](https://github.com/OpenCerts/admin-website)
* [document-store](https://github.com/Open-Attestation/document-store)
* [open-attestation-cli](https://github.com/Open-Attestation/open-attestation-cli)

## Development Setup
We develop primarily on a OS / Linux environment so please lodge an issue if you are using Windows and find that you cannot successfully set up a local instance of this software.

```bash
npm install
npm run dev
```

## Jest Test
Jest test validate the common utility function.

```bash
npm run test
```

## Integration Dappeteer Test

Dappeteer test perform e2e test on issue and revoke functionality using local blockchain running on ganache-cli. The test can be executed using the command below.

```bash
npm run integration:dappeteer
```

The speed of the testing can be modified using this options.
- First argument : Slowing of testing speed. (higher number = slower test)

```bash
npm run integration:dappeteer 50
```

Note that current dappeteer integration test uses mujo-code/puppeteer-headful@master that run on v12.10 node docker. v14 node version is required to remove --experimental-modules flag from integration:transfers command.

