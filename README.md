# Certificate Web UI

[![Build Status](https://travis-ci.org/GovTechSG/certificate-web-ui.svg?branch=master)](https://travis-ci.org/GovTechSG/certificate-web-ui)

See also:

* [document-store](https://github.com/Open-Attestation/document-store)
* [open-attestation-cli](https://github.com/Open-Attestation/open-attestation-cli)

## Development

```bash
npm install
npm run dev
npm run lint

npm run start # serves the ui
```

### Setting up web3

If your browser has injected web3 (ie. through Metamask), the application will connect to the injected web3 and will be on the network that provider is connected to. Otherwise, the application will attempt to connect to the local Ethereum node at port `9545`.

Setup 1:

- Install Metamask
- Connect Metamask
